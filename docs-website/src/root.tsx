import { useNProgress } from 'docs-website/src/lib/nprogress'
import { loader as fumadocsLoader } from 'fumadocs-core/source'

import { Banner } from 'fumadocs-ui/components/banner'

import { prisma } from 'db'
import { ReactRouterProvider } from 'fumadocs-core/framework/react-router'
import { LinkItemType } from 'fumadocs-ui/layouts/links'
import { DocsLayout, DocsLayoutProps } from 'fumadocs-ui/layouts/notebook'
import type { Option } from 'fumadocs-ui/components/layout/root-toggle'

import { RootProvider } from 'fumadocs-ui/provider/base'
import { GithubIcon, XIcon } from 'lucide-react'
import { ThemeProvider, useTheme } from 'next-themes'
import {
    startTransition,
    useEffect,
    useMemo,
    useState,
    useSyncExternalStore,
} from 'react'
import {
    data,
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    redirect,
    Scripts,
    ScrollRestoration,
    ShouldRevalidateFunction,
    useLoaderData,
} from 'react-router'
import { TrieveSDK } from 'trieve-ts-sdk'
import { useShallow } from 'zustand/react/shallow'
// @ts-ignore
import type { Route } from './+types/root'
import './app.css'
import { DocsJsonType } from './lib/docs-json'
import { DocsState, IframeRpcMessage, useDocsState } from './lib/docs-state'
import { env } from './lib/env'
import { useDocsJson } from './lib/hooks'
import { LOCALE_LABELS } from './lib/locales'
import { Markdown } from 'contesto/src/lib/markdown'
import { mdxComponents } from './components/mdx-components'
import { processMdxInServer } from './lib/mdx.server'
import { getFilesForSource } from './lib/source.server'
import { attachFile, getFumadocsSource } from './lib/source'
import { PageData, VirtualFile } from 'fumadocs-core/source'
import frontMatter from 'front-matter'
import { cn, isInsidePreviewIframe } from './lib/utils'
import { DynamicIcon } from './lib/icon'
import { PoweredBy } from './components/poweredby'
import { CustomSearchDialog } from './components/search'
import { ChatDrawer } from './components/docs-chat'
import { getTreeFromFiles } from './lib/tree'
import { getOpenapiDocument, getSourceForOpenAPI } from './lib/openapi'
import { I18nConfig } from 'fumadocs-core/i18n'
import { StructuredData } from 'fumadocs-core/mdx-plugins/remark-structure'

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
]

const openapiPath = `/api-reference`

const allowedOrigins = [env.NEXT_PUBLIC_URL!.replace(/\/$/, '')]

// Helper function to parse cookies from header
function parseCookies(cookieHeader: string | null): Record<string, string> {
    const cookies: Record<string, string> = {}
    if (!cookieHeader) return cookies

    cookieHeader.split(';').forEach((cookie) => {
        const [name, ...rest] = cookie.trim().split('=')
        if (name && rest.length > 0) {
            cookies[name] = decodeURIComponent(rest.join('='))
        }
    })
    return cookies
}

let onFirstStateMessage = () => {}
const firstStateReceived = new Promise<void>((resolve) => {
    onFirstStateMessage = resolve
})

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url)
    const domain = url.hostname.split(':')[0]

    // Handle websocketId in search params - set plain cookie and redirect
    const websocketId = url.searchParams.get('websocketId')
    if (websocketId != null) {
        // Remove websocketId from search params for redirect
        const redirectUrl = new URL(url)
        redirectUrl.searchParams.delete('websocketId')

        // Create a plain Set-Cookie header (session cookie, JS-readable)
        // Explicitly set HttpOnly=false for JavaScript access
        const isSecure = process.env.NODE_ENV === 'production'
        const cookieValue = `__websocket_preview=${encodeURIComponent(websocketId)}; Path=/; HttpOnly=false${isSecure ? '; Secure' : ''}`

        throw redirect(redirectUrl.toString(), {
            headers: {
                'Set-Cookie': cookieValue,
            },
        })
    }

    const siteBranch = await prisma.siteBranch.findFirst({
        where: {
            domains: {
                some: {
                    host: domain,
                },
            },
        },
        include: {
            domains: true,
            site: {
                include: {
                    locales: true,
                },
            },
        },
    })

    const site = siteBranch?.site

    if (!site) {
        console.log('Site not found for domain:', domain)
        throw new Response(JSON.stringify({ files: [] }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const files = await getFilesForSource({
        branchId: siteBranch.branchId,
        githubFolder: site.githubFolder || '',
    })

    const languages = site.locales.map((x) => x.locale)
    const source = getFumadocsSource({
        defaultLanguage: site.defaultLocale,
        files,
        languages: languages,
    })

    const i18n = source._i18n

    // Process banner markdown if it exists
    const docsJson: DocsJsonType = siteBranch.docsJson as any

    let bannerAst = await (async () => {
        if (docsJson?.banner?.content) {
            try {
                const { data } = await processMdxInServer({
                    extension: '.md',
                    githubPath: '',
                    markdown: docsJson.banner.content,
                })
                return data?.ast
            } catch (error) {
                console.error('Error processing banner markdown:', error)
            }
        }
        return null
    })()

    // Check for preview websocket ID in cookies
    const cookies = parseCookies(request.headers.get('Cookie'))
    const previewWebsocketId = cookies['__websocket_preview'] || null
    const trieveReadApiKey = siteBranch.trieveReadApiKey
    const trieveDatasetId = siteBranch.trieveDatasetId

    const { openapiDocument } = await getOpenapiDocument({ docsJson, url })

    return {
        openapiDocument,
        docsJson: siteBranch.docsJson as DocsJsonType,
        languages,
        files,
        i18n,
        name: site.name,
        githubFolder: site.githubFolder,
        bannerAst,
        trieveReadApiKey,
        trieveDatasetId,
        previewWebsocketId,
        cssStyles: siteBranch.cssStyles,
        githubOwner: site.githubOwner,
        githubRepo: site.githubRepo,
        githubBranch: siteBranch.githubBranch || 'main',
        branchId: siteBranch.branchId,
        site,
    }
}

async function setDocsStateForMessage(partialState: Partial<DocsState>) {
    const prevState = useDocsState.getState()
    if (
        partialState.currentSlug &&
        prevState.currentSlug !== partialState.currentSlug &&
        partialState.currentSlug !== window.location.pathname
    ) {
        // return await navigate(state.currentSlug!)
        // TODO do client side navigation instead
        window.location.pathname = partialState.currentSlug
    }
    console.log(`setting docs-state from parent message state`, partialState)
    startTransition(() => {
        useDocsState.setState({
            ...partialState,
            filesInDraft: {
                ...prevState?.filesInDraft,
                ...partialState.filesInDraft,
            },
        })
    })
}
async function iframeMessagesHandling() {
    if (!isInsidePreviewIframe()) {
        console.log(`not inside preview iframe, not connecting to postMessage`)
        return
    }
    if (globalThis.postMessageHandlingDone) return
    globalThis.postMessageHandlingDone = true
    console.log(`docs iframe starts listening on message events`)
    async function onParentPostMessage(e: MessageEvent) {
        onFirstStateMessage()
        if (!allowedOrigins.includes(e.origin)) {
            console.warn(
                `ignoring message from disallowed origin: ${e.origin}`,
                allowedOrigins,
                e.data,
            )
            return
        }
        try {
            const data = e.data as IframeRpcMessage
            const { id, state: partialState } = data || {}

            if (partialState) {
                await setDocsStateForMessage(partialState)
            }
        } finally {
            // Only reply if not the same window (i.e., not itself)
            if (e.source && e.source !== window) {
                e.source.postMessage(
                    { id: e?.data?.id } satisfies IframeRpcMessage,
                    {
                        targetOrigin: '*',
                    },
                )
            }
        }
    }
    window.addEventListener('message', onParentPostMessage)
    if (typeof window !== 'undefined') {
        if (window.parent !== window) {
            window.parent?.postMessage?.(
                { type: 'ready' },
                {
                    targetOrigin: '*',
                },
            )
        }
    }
    // Set up ping interval
    setInterval(() => {
        if (typeof window !== 'undefined') {
            if (window.parent !== window) {
                window.parent?.postMessage?.(
                    { type: 'ping' },
                    {
                        targetOrigin: '*',
                    },
                )
            }
        }
    }, 500)
}

if (typeof window !== 'undefined') {
    iframeMessagesHandling()
}

declare global {
    interface Window {
        websocketHandlingDone?: boolean
        postMessageHandlingDone?: boolean
    }
}

// Function for handling websocket connection based on session cookie
async function websocketIdHandling(websocketId: string) {
    if (isInsidePreviewIframe()) {
        console.log('inside preview iframe, skipping websocket connection')
        return
    }
    if (typeof window === 'undefined') return
    if (globalThis.websocketHandlingDone) return
    globalThis.websocketHandlingDone = true

    console.log('connecting over preview websocketId', websocketId)
    const websocketUrl = `wss://fumabase.com/_tunnel/client?id=${websocketId}`
    const ws = new WebSocket(websocketUrl)
    ws.onopen = () => {
        useDocsState.setState({
            websocketServerPreviewConnected: true,
        })
        ws.send(JSON.stringify({ type: 'ready' }))
    }
    ws.onclose = () => {
        useDocsState.setState({
            websocketServerPreviewConnected: false,
        })
    }
    ws.onmessage = async (event) => {
        let data: IframeRpcMessage
        try {
            data = JSON.parse(event.data)
        } catch {
            console.error(`websocket sent invalid json`, event.data)
            return
        }
        const { id, state: partialState } = data || {}
        if (partialState) {
            await setDocsStateForMessage(partialState)
        }
        ws.send(JSON.stringify({ id } satisfies IframeRpcMessage))
    }
    // ping interval
    setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping' }))
        }
    }, 1000)
}

if (typeof window !== 'undefined') {
    window.addEventListener(
        'startPreviewWebsocket',
        (e: any) => {
            const websocketId = e?.detail?.websocketId
            if (websocketId) {
                websocketIdHandling(websocketId)
            }
        },
        { once: true },
    )
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <Meta />

                {process.env.NODE_ENV === 'development' && (
                    <script
                        crossOrigin='anonymous'
                        src='//unpkg.com/react-scan/dist/auto.global.js'
                    />
                )}
                <Links />
            </head>
            <body>
                <ScrollRestoration />
                <Scripts />
                {children}
            </body>
        </html>
    )
}
function CSSVariables({ docsJson }: { docsJson: DocsJsonType }) {
    // Always expect { dark, light }
    const cssVariables = docsJson?.cssVariables
    if (!cssVariables) return null
    const { dark, light } = cssVariables

    // Early return if both missing
    if (!light && !dark) return null

    // Helper to build var block
    const toCssBlock = (obj: Record<string, string> | undefined) =>
        obj
            ? Object.entries(obj)
                  .map(([key, value]) => {
                      const cssVar = key.startsWith('--') ? key : `--${key}`
                      return `${cssVar}: ${value} !important;`
                  })
                  .join('\n  ')
            : ''

    // Don't render if both empty
    if (
        (!light || Object.keys(light).length === 0) &&
        (!dark || Object.keys(dark).length === 0)
    ) {
        return null
    }

    let styleStr = ''
    if (light && Object.keys(light).length > 0) {
        styleStr += `:root {\n  ${toCssBlock(light)}\n}`
    }
    if (dark && Object.keys(dark).length > 0) {
        if (styleStr) styleStr += '\n'
        styleStr += `.dark {\n  ${toCssBlock(dark)}\n}`
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: styleStr,
            }}
        />
    )
}

export default function App() {
    const loaderData = useLoaderData<typeof loader>()
    const { previewWebsocketId } = loaderData || {}
    const docsJson = useDocsJson()
    useNProgress()
    // Inline DocsProvider
    const { i18n, trieveReadApiKey, trieveDatasetId, cssStyles } =
        loaderData || {}
    const locale = i18n?.defaultLanguage

    return (
        <>
            <CSSVariables docsJson={docsJson} />
            {previewWebsocketId ? (
                <PreviewBanner websocketId={previewWebsocketId || ''} />
            ) : (
                <UserBanner docsJson={docsJson} />
            )}

            <ReactRouterProvider>
                <RootProvider
                    search={{
                        options: {},
                        SearchDialog: CustomSearchDialog,
                        // enabled: !!trieveDatasetId,
                    }}
                    i18n={{
                        locale: locale || '',
                        locales: i18n?.languages.map((locale) => {
                            return {
                                locale,
                                name: LOCALE_LABELS[locale] || '',
                            }
                        }),
                    }}
                >
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='system'
                        enableSystem
                        disableTransitionOnChange
                    >
                        {cssStyles && (
                            <style
                                dangerouslySetInnerHTML={{
                                    __html: cssStyles,
                                }}
                            />
                        )}
                        <ChatDrawer />
                        <DocsLayoutWrapper docsJson={docsJson}>
                            <Outlet />
                        </DocsLayoutWrapper>
                    </ThemeProvider>
                </RootProvider>
            </ReactRouterProvider>
        </>
    )
}

export const shouldRevalidate: ShouldRevalidateFunction = ({
    currentUrl,
    nextUrl,
    defaultShouldRevalidate,
}) => {
    // List of base paths to watch for enter/exit revalidation
    const watchedBasePaths = ['/api-reference']

    // Helper to check whether a pathname matches any watched base path
    const isInWatchedBasePath = (pathname: string) => {
        return watchedBasePaths.some((basePath) =>
            pathname.startsWith(basePath),
        )
    }

    const wasInWatched = isInWatchedBasePath(currentUrl.pathname)
    const willBeInWatched = isInWatchedBasePath(nextUrl.pathname)

    // Revalidate when entering or exiting any watched path
    if (wasInWatched !== willBeInWatched) {
        return true
    }

    return defaultShouldRevalidate
}

function DocsLayoutWrapper({
    children,
    docsJson,
}: {
    children: React.ReactNode
    docsJson: DocsJsonType
}) {
    const loaderData = useLoaderData<typeof loader>() || {}
    const { i18n, previewWebsocketId } = loaderData

    useEffect(() => {
        console.log(`remounting docs layout`)
        if (previewWebsocketId) {
            window.dispatchEvent(
                new CustomEvent('startPreviewWebsocket', {
                    detail: { websocketId: previewWebsocketId },
                }),
            )
        }
    }, [])

    // Create tree client-side using files and filesInDraft
    const filesInDraft = useDocsState((state) => state.filesInDraft)

    const tree = useMemo(() => {
        const { files, i18n, openapiDocument, githubFolder } = loaderData
        if (openapiDocument?.paths) {
            const source = getSourceForOpenAPI({
                docsJson,
                openapiDocument: openapiDocument! as any,
                filesInDraft,
            })
            const pageTree = source.pageTree
            pageTree.$id = Math.random().toString(36).slice(2)
            return pageTree
        }
        return getTreeFromFiles({
            files,
            defaultLanguage: i18n?.defaultLanguage || 'en',
            languages: i18n?.languages || [],
            githubFolder,
            filesInDraft,
        })
    }, [loaderData.files, loaderData.i18n, filesInDraft])

    // Configure layout based on docsJson
    const navMode = 'top'
    const disableThemeSwitch = false
    const navTransparentMode = 'top'
    const searchEnabled = true
    const navTabMode = 'navbar'

    // Build links from docsJson navbar configuration
    const links: LinkItemType[] = (() => {
        const navbarLinks = docsJson?.navbar?.links || []
        const primary = docsJson?.navbar?.primary

        const mainLinks: LinkItemType[] = navbarLinks.map((link: any) => ({
            text: link.label || '',
            type: 'main',
            url: link.href || '#',
            icon: <DynamicIcon name={link.icon} />,
            external: !link.href?.startsWith('/'),
        }))

        // Add primary CTA if configured
        if (primary) {
            if (primary.type === 'button') {
                mainLinks.push({
                    type: 'button',
                    text: primary.label || '',
                    url: primary.href || '#',
                    external: !primary.href?.startsWith('/'),
                })
            } else if (primary.type === 'github') {
                mainLinks.push({
                    type: 'icon',
                    icon: <GithubIcon className='w-4 h-4' />,
                    text: 'GitHub',
                    url: primary.href || '#',
                    external: true,
                })
            }
        }

        return mainLinks
    })()

    // Build tabs from docsJson if present
    const tabs: Option[] = (() => {
        if (!docsJson?.tabs) return []

        return docsJson.tabs
            .map((tab) => {
                if ('openapi' in tab) {
                    // OpenAPI tab
                    return {
                        title: tab.tab,
                        url: openapiPath,
                        description: `API Reference`,
                    }
                }
                return null
            })
            .filter(Boolean) as Option[]
    })()

    return (
        <div className='h-full flex flex-col w-full'>
            <DocsLayout
                searchToggle={{
                    enabled: searchEnabled,
                    components: {},
                }}
                nav={{
                    mode: navMode,
                    transparentMode: navTransparentMode,
                    title: <Logo docsJson={docsJson} />,
                }}
                tabMode={navTabMode}
                sidebar={{
                    defaultOpenLevel: 2,
                    collapsible: true,

                    tabs,
                    footer: (
                        <div className='flex w-full text-center grow justify-center items-start'>
                            <PoweredBy className='text-[12x]' />
                        </div>
                    ),
                }}
                i18n={i18n}
                tree={tree}
                {...{
                    disableThemeSwitch,
                    links,
                }}
            >
                {children}
            </DocsLayout>
        </div>
    )
}

const noop = (callback) => {
    return () => {}
}

function PreviewBanner({ websocketId }: { websocketId?: string }) {
    if (!websocketId) return null
    const handleDisconnect = () => {
        // Remove websocketId from search params before reloading
        const url = new URL(window.location.href)
        url.searchParams.set('websocketId', '')
        window.location.href = url.toString()
    }

    const websocketServerPreviewConnected = useDocsState(
        (state) => state.websocketServerPreviewConnected,
    )

    const shouldShow = useSyncExternalStore(
        noop,
        () => !isInsidePreviewIframe(), // client snapshot
        () => true, // server snapshot
    )
    if (!shouldShow) {
        return null
    }

    return (
        <Banner className='sticky top-0 z-50 bg-fd-muted text-fd-accent-foreground isolate px-4 py-1 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <div
                    className={cn(
                        'w-2 h-2 rounded-full animate-pulse',
                        websocketServerPreviewConnected
                            ? 'bg-green-500'
                            : 'bg-red-500',
                    )}
                ></div>
                <span className='font-medium text-sm'>
                    {websocketServerPreviewConnected
                        ? 'Connected to local preview. Added content will be highlighted green'
                        : 'Server disconnected. Please restart the preview server'}
                </span>
            </div>
            <button
                onClick={handleDisconnect}
                className='flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-sm transition-colors'
                aria-label='Disconnect from preview'
            >
                <XIcon className='w-3 h-3' />
                Disconnect
            </button>
        </Banner>
    )
}

function UserBanner({ docsJson }: { docsJson?: any }) {
    const [dismissed, setDismissed] = useState(false)
    const { bannerAst } = useLoaderData<typeof loader>() || {}
    const banner = docsJson?.banner

    if (!banner || dismissed) return null

    return (
        <div className='relative bg-fd-primary/10 border border-fd-primary/20 rounded-lg p-4 mb-4'>
            <div className='prose prose-sm text-fd-foreground'>
                <Markdown
                    markdown={banner.content}
                    ast={bannerAst}
                    isStreaming={false}
                    components={mdxComponents}
                />
            </div>
            {banner.dismissible && (
                <button
                    onClick={() => {
                        setDismissed(true)
                    }}
                    className='absolute top-2 right-2 p-1 rounded hover:bg-fd-primary/20 transition-colors'
                    aria-label='Dismiss banner'
                >
                    <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </button>
            )}
        </div>
    )
}

function Logo({ docsJson = {} as DocsJsonType }) {
    const { name } = useLoaderData<typeof loader>()
    const { theme, resolvedTheme } = useTheme()

    const currentTheme = resolvedTheme || theme || 'light'

    if (!docsJson.logo) {
        return (
            <span className='font-medium [.uwu_&]:hidden max-md:hidden'>
                {docsJson?.name || name || 'Documentation'}
            </span>
        )
    }

    const logoImageUrl = (() => {
        if (typeof docsJson.logo === 'string') {
            return docsJson.logo
        }

        if (docsJson.logo?.dark && currentTheme === 'dark') {
            return docsJson.logo.dark
        }

        return docsJson.logo?.light || ''
    })()
    const logoText = docsJson.logo?.text || ''

    return (
        <div className='flex gap-2 grow items-center'>
            <img
                alt='logo'
                src={logoImageUrl}
                suppressHydrationWarning
                className='h-8 [.uwu_&]:block'
                aria-label='logo'
            />
            {logoText && (
                <span className='font-medium max-md:hidden'>{logoText}</span>
            )}
        </div>
    )
}

// Export Route type for other components to use
export type { Route }

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    const containerClass =
        'flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center bg-background text-foreground'
    const titleClass = 'text-3xl font-semibold mb-3 text-primary'
    const messageClass = 'text-base mb-2 text-muted-foreground'
    const preClass =
        'bg-muted text-muted-foreground p-4 rounded-md text-xs text-left overflow-auto w-full border mt-2'
    if (isRouteErrorResponse(error)) {
        return (
            <div className={containerClass}>
                <h1 className={titleClass}>
                    {error.status} {error.statusText}
                </h1>
                <p className={messageClass}>{error.data}</p>
            </div>
        )
    } else if (error instanceof Error) {
        return (
            <div className={containerClass}>
                <h1 className={titleClass}>Error</h1>
                <p className={messageClass}>{error.message}</p>
                <pre className={preClass}>{error.stack}</pre>
            </div>
        )
    } else {
        return (
            <div className={containerClass}>
                <h1 className={titleClass}>Unknown Error</h1>
            </div>
        )
    }
}

import React from 'react'
import { loader as fumadocsLoader } from 'fumadocs-core/source'
import { prisma } from 'db'
import {
    data,
    isRouteErrorResponse,
    Links,
    Meta,
    redirect,
    Scripts,
    ScrollRestoration,
} from 'react-router'
// @ts-ignore
import type { Route } from './+types/root'
import { DocsJsonType, themeModules } from 'docs-website/src/lib/docs-json'
import JSONC from 'tiny-jsonc'

import { processMdxInServer } from 'docs-website/src/lib/mdx.server'
import { getFilesForSource } from 'docs-website/src/lib/source.server'
import { getFumadocsSource } from 'docs-website/src/lib/source'
import { getOpenapiDocument } from 'docs-website/src/lib/openapi.server'
import {
    ClientLayout,
    ClientApp,
} from 'docs-website/src/routes/_catchall-client'

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

export async function loader({ request }: Route.LoaderArgs) {
    const timerId = `root-loader-${Math.random().toString(36).substr(2, 9)}`
    console.time(`${timerId} - total root loader time`)

    // Check if request is aborted early
    if (request.signal.aborted) {
        throw new Error('Request aborted')
    }

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

    // Check signal before database queries
    if (request.signal.aborted) {
        throw new Error('Request aborted')
    }

    console.time(`${timerId} - find site branch from database`)
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
    console.timeEnd(`${timerId} - find site branch from database`)

    const site = siteBranch?.site

    if (!site) {
        console.log('Site not found for domain:', domain)
        throw new Response('null', {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    // Check signal before next database operation
    if (request.signal.aborted) {
        throw new Error('Request aborted')
    }

    console.time(`${timerId} - get files for source`)
    const files = await getFilesForSource({
        branchId: siteBranch.branchId,
        githubFolder: site.githubFolder || '',
    })
    console.timeEnd(`${timerId} - get files for source`)

    const languages = site.locales.map((x) => x.locale)

    console.time(`${timerId} - create fumadocs source`)
    const source = getFumadocsSource({
        defaultLanguage: site.defaultLocale,
        files,
        languages: languages,
    })
    console.timeEnd(`${timerId} - create fumadocs source`)

    const i18n = source._i18n

    // Process banner markdown if it exists
    // Check if there's a fumabase.jsonc query parameter with updated content
    const docsJsonParam = url.searchParams.get('fumabase.jsonc')
    const docsJson: DocsJsonType = (() => {
        if (docsJsonParam) {
            try {
                const decodedContent = decodeURIComponent(docsJsonParam)
                return JSONC.parse(decodedContent)
            } catch (error) {
                console.error(
                    'Error parsing fumabase.jsonc query parameter:',
                    error,
                )
                return siteBranch.docsJson as any
            }
        }
        return siteBranch.docsJson as any
    })()

    // Check signal before processing banner
    if (request.signal.aborted) {
        throw new Error('Request aborted')
    }

    console.time(`${timerId} - process banner markdown`)
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
    console.timeEnd(`${timerId} - process banner markdown`)

    // Check for preview websocket ID in cookies
    const cookies = parseCookies(request.headers.get('Cookie'))
    const previewWebsocketId = cookies['__websocket_preview'] || null
    // Trieve fields removed - now using Eyecrest with branchId

    // Check signal before openapi processing
    if (request.signal.aborted) {
        throw new Error('Request aborted')
    }

    console.time(`${timerId} - get openapi document`)
    const {
        openapiUrl,
        renderer: openapiRenderer,
        ...rest
    } = await getOpenapiDocument({
        docsJson,
        url,
    })
    console.timeEnd(`${timerId} - get openapi document`)

    // Get theme CSS if theme is specified
    const themeCSS = (() => {
        if (docsJson.theme) {
            const themePath = `../themes/${docsJson.theme}.css`
            if (themeModules[themePath]) {
                return themeModules[themePath] as string
            }
        }
        return ''
    })()

    // Check for editor preview mode query parameter
    const editorPreviewMode =
        url.searchParams.get('editorPreviewMode') === 'true'

    console.timeEnd(`${timerId} - total root loader time`)
    const trieveReadApiKey = siteBranch.trieveReadApiKey
    const trieveDatasetId = siteBranch.trieveDatasetId
    return {
        openapiUrl,
        openapiRenderer,
        ...rest,
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
        themeCSS,
        editorPreviewMode,
    }
}

export default function App() {
    return (
        <ClientLayout>
            <ClientApp />
        </ClientLayout>
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
        const { status, statusText } = error

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

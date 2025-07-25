import 'website/src/styles/globals.css'
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'react-router'

export function meta() {
    return [
        { title: 'Fumabase' },
        { name: 'description', content: 'Host Fumadocs websites without effort' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
    ]
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html
            className='h-full flex dark  flex-col grow'
            lang='en'
        >
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
            <body className='h-full flex flex-col grow dark:bg-black'>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

import { Route } from './+types/root'
import { useNProgress } from './components/nprogress'

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

export default function App() {
    useNProgress()
    return <Outlet />
}

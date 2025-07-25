'use client'
import { cva } from 'class-variance-authority'
import { cn } from 'docs-website/src/lib/cn'
import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
} from 'fumadocs-ui/components/ui/collapsible'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { type SyntheticEvent, useEffect, useState, useTransition } from 'react'
import { useLocation } from 'react-router'

const rateButtonVariants = cva(
    'inline-flex items-center gap-2 px-3 py-2 rounded-full font-medium border text-sm [&_svg]:size-4 disabled:cursor-not-allowed',
    {
        variants: {
            active: {
                true: 'bg-fd-accent text-fd-accent-foreground [&_svg]:fill-current',
                false: 'text-fd-muted-foreground',
            },
        },
    },
)

export interface Feedback {
    opinion: 'good' | 'bad'
    url?: string
    message: string
}

export interface ActionResponse {
    githubUrl: string
}

interface Result extends Feedback {
    response?: ActionResponse
}

export function Rate({
    onRateAction,
}: {
    onRateAction: (url: string, feedback: Feedback) => Promise<ActionResponse>
}) {
    const location  = useLocation()
    const url = location?.pathname || ''
    const [previous, setPrevious] = useState<Result | null>(null)
    const [opinion, setOpinion] = useState<'good' | 'bad' | null>(null)
    const [message, setMessage] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const item = localStorage.getItem(`docs-feedback-${url}`)

        if (item === null) return
        setPrevious(JSON.parse(item) as Result)
    }, [url])

    useEffect(() => {
        const key = `docs-feedback-${url}`

        if (previous) localStorage.setItem(key, JSON.stringify(previous))
        else localStorage.removeItem(key)
    }, [previous, url])

    function submit(e?: SyntheticEvent) {
        if (opinion == null) return

        startTransition(async () => {
            const feedback: Feedback = {
                opinion,
                message,
            }

            setError(null)

            try {
                const response = await onRateAction(url, feedback)
                setPrevious({
                    response,
                    ...feedback,
                })
                setMessage('')
                setOpinion(null)
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred')
            }
        })

        e?.preventDefault()
    }

    const activeOpinion = previous?.opinion ?? opinion

    return (
        <Collapsible
            open={opinion !== null || previous !== null}
            onOpenChange={(v) => {
                if (!v) setOpinion(null)
            }}
            className='border-y py-3'
        >
            <div className='flex flex-row items-center gap-2'>
                <p className='text-sm font-medium pe-2'>How is this guide?</p>
                <button
                    disabled={previous !== null}
                    className={cn(
                        rateButtonVariants({
                            active: activeOpinion === 'good',
                        }),
                    )}
                    onClick={() => {
                        setOpinion('good')
                    }}
                >
                    <ThumbsUp />
                    Good
                </button>
                <button
                    disabled={previous !== null}
                    className={cn(
                        rateButtonVariants({
                            active: activeOpinion === 'bad',
                        }),
                    )}
                    onClick={() => {
                        setOpinion('bad')
                    }}
                >
                    <ThumbsDown />
                    Bad
                </button>
            </div>
            <CollapsibleContent className='mt-3'>
                {previous ? (
                    <div className='px-3 py-6 flex flex-col items-center gap-3 bg-fd-card text-fd-muted-foreground text-sm text-center rounded-xl'>
                        <p>Thank you for your feedback!</p>
                        <div className='flex flex-row items-center gap-2'>
                            <a
                                href={previous.response?.githubUrl}
                                rel='noreferrer noopener'
                                target='_blank'
                                className={cn(
                                    buttonVariants({
                                        color: 'primary',
                                    }),
                                    'text-xs',
                                )}
                            >
                                View on GitHub
                            </a>

                        </div>
                    </div>
                ) : (
                    <form className='flex flex-col gap-3' onSubmit={submit}>
                        <textarea
                            autoFocus
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='border rounded-lg bg-fd-secondary text-fd-secondary-foreground p-3 resize-none focus-visible:outline-none placeholder:text-fd-muted-foreground'
                            placeholder='Leave your feedback...'
                            onKeyDown={(e) => {
                                if (!e.shiftKey && e.key === 'Enter') {
                                    submit(e)
                                }
                            }}
                        />
                        {error && (
                            <div className='text-red-500 text-sm bg-red-50 p-2 rounded border'>
                                {error}
                            </div>
                        )}
                        <button
                            type='submit'
                            className={cn(
                                buttonVariants({ color: 'outline' }),
                                'w-fit px-3',
                            )}
                            disabled={isPending}
                        >
                            {isPending ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                )}
            </CollapsibleContent>
        </Collapsible>
    )
}

import { useEffect, useMemo, useRef, useState } from 'react'

import { createIdGenerator, UIMessage } from 'ai'
import {
    uiStreamToUIMessages,
    ToolPartOutputAvailable,
    ToolPartInputStreaming,
    ToolPart,
    ToolPartInputAvailable,
} from 'contesto/src/lib/process-chat'
import { ScrollArea } from 'docs-website/src/components/ui/scroll-area'
import { useStickToBottom } from 'use-stick-to-bottom'

import {
    ChatAssistantMessage,
    ChatErrorMessage,
    ChatUserMessage,
} from 'contesto/src/chat/chat-message'
import {
    ChatProvider,
    ChatState,
    useChatContext,
} from 'contesto/src/chat/chat-provider'
import { ChatRecordButton } from 'contesto/src/chat/chat-record-button'
import { ChatAutocomplete, ChatTextarea } from 'contesto/src/chat/chat-textarea'
import { ChatUploadButton } from 'contesto/src/chat/chat-upload-button'
import { MarkdownRuntime as Markdown } from 'docs-website/src/lib/markdown-runtime'
import { startTransition } from 'react'
import { AnimatePresence, motion } from 'unframer'
import { Button } from '../components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../components/ui/command'
import { Sheet, SheetContent } from '../components/ui/sheet'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../components/ui/popover'

import { cn } from '../lib/cn'
import { throttle } from '../lib/utils'
import {
    docsApiClientWithDurableFetch,
    docsDurableFetchClient,
} from '../lib/docs-spiceflow-client'
import {
    useDocsState,
    usePersistentDocsState,
    generateChatId,
    saveChatMessages,
    loadChatMessages,
} from '../lib/docs-state'
import { useRouteLoaderData, useLocation } from 'react-router'
import { usePreservedNavigate } from './preserved-search-link'
import type { Route } from '../routes/_catchall'
import { env } from '../lib/env'
import { Trash2Icon, XIcon } from 'lucide-react'
import { DocsUIMessage } from '../lib/types'
import { throttleGenerator } from 'contesto/src/lib/utils'
import { EditorToolPreview } from '../components/tool-preview'
import {
    createEditExecute,
    EditToolParamSchema,
    isStrReplaceParameterComplete,
    ValidateNewContentArgs,
    GetPageContentArgs,
} from '../lib/edit-tool'
import { FileSystemEmulator } from 'website/src/lib/file-system-emulator'

export function ChatDrawer({ loaderData }: { loaderData?: unknown }) {
    const chatId = usePersistentDocsState((x) => x.chatId)
    const location = useLocation()
    const navigate = usePreservedNavigate()

    // Get files from root loader data
    const rootLoaderData = useRouteLoaderData(
        'routes/_catchall',
    ) as Route.ComponentProps['loaderData']
    const files = rootLoaderData?.files || []

    const submitMessageWithoutDelete = async ({
        messages,
        setMessages,
        abortController,
    }: Partial<ChatState>) => {
        const generateId = createIdGenerator()
        const currentSlug = location.pathname
        const currentOrigin =
            typeof window !== 'undefined' ? window.location.origin : ''

        const filesInDraft = useDocsState.getState()?.filesInDraft || {}
        console.log({ currentSlug, currentOrigin })
        try {
            const { data: generator, error } =
                await docsApiClientWithDurableFetch.fumabaseInternalAPI.generateMessage.post(
                    {
                        messages: messages as DocsUIMessage[],
                        currentSlug: currentSlug,
                        currentOrigin: currentOrigin,
                        chatId: chatId,
                        locale: 'en',
                        filesInDraft: filesInDraft,
                    },
                    {
                        query: {
                            lastMessageId: messages![messages!.length - 1]!.id,
                        },
                        fetch: { signal: abortController?.signal },
                    },
                )
            if (error) throw error

            async function getPageContent(githubPath: string) {
                if (typeof window === 'undefined') return ''
                let path = githubPath.startsWith('/')
                    ? githubPath
                    : '/' + githubPath
                const url = new URL(path, window.location.origin).toString()
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error(
                        `Failed to fetch page content for ${path}: ${res.statusText}`,
                    )
                }
                const text = await res.text()
                return text
            }



            const onToolOutput = async (
                toolPart: ToolPartOutputAvailable<DocsUIMessage>,
            ) => {
                // Handle selectText tool output
                if (toolPart.type === 'tool-selectText') {
                    if (toolPart.output?.error) {
                        console.error(
                            'selectText error:',
                            toolPart.output.error,
                        )
                        return
                    }

                    const targetSlug = toolPart.output?.slug
                    if (
                        targetSlug &&
                        typeof targetSlug === 'string' &&
                        targetSlug !== location.pathname
                    ) {
                        await navigate(targetSlug)
                    }
                    usePersistentDocsState.setState({
                        drawerState: 'minimized',
                    })
                    await new Promise((res) => setTimeout(res, 10))
                    console.log('Highlighting lines:', toolPart.input)
                    useDocsState.setState({
                        highlightedLines: toolPart.input,
                    })
                }

                // Handle goToPage tool output
                if (toolPart.type === 'tool-goToPage') {
                    if (toolPart.output?.error) {
                        console.error('goToPage error:', toolPart.output.error)
                        return
                    }

                    const targetSlug = toolPart.output?.slug
                    if (
                        typeof targetSlug === 'string' &&
                        targetSlug !== location.pathname
                    ) {
                        await navigate(targetSlug)
                    }
                }
            }

            // Use throttle instead of debounce to ensure the function executes at regular intervals
            // and doesn't delay beyond the throttle period, which could cause it to override
            // the output-available call that comes later
            const onToolInputStreaming = throttle(
                50,
                async (
                    toolPart:
                        | ToolPartInputStreaming<DocsUIMessage>
                        | ToolPartInputAvailable<DocsUIMessage>,
                ) => {
                    if (toolPart.type === 'tool-strReplaceEditor') {
                        const args: Partial<EditToolParamSchema> =
                            toolPart.input as any
                        if (
                            args?.command === 'view' ||
                            args?.command === 'undo_edit'
                        ) {
                            return
                        }
                        if (!isStrReplaceParameterComplete(args)) {
                            return
                        }

                        usePersistentDocsState.setState({
                            drawerState: 'minimized',
                        })

                        // Create a temporary FileSystemEmulator for preview
                        let updatedPagesCopy = { ...filesInDraft }
                        const previewFileSystem = new FileSystemEmulator({
                            filesInDraft: updatedPagesCopy,
                            getPageContent,
                            // No onFilesDraftChange callback for preview
                        })
                        const execute = createEditExecute({
                            fileSystem: previewFileSystem,
                        })

                        await execute(args as any)
                        console.log(
                            'applying the setState update to the docs site',
                            toolPart,
                        )

                        // Update docs state with new filesInDraft from the preview file system
                        useDocsState.setState({
                            filesInDraft: { ...previewFileSystem.getFilesInDraft() },
                        })
                    }
                },
            )

            let finalMessages = messages
            for await (const newMessages of uiStreamToUIMessages<DocsUIMessage>(
                {
                    uiStream: generator,
                    messages: messages as DocsUIMessage[],
                    generateId,
                    onToolOutput,
                    onToolInput: onToolInputStreaming,
                    onToolInputStreaming,
                },
            )) {
                finalMessages = newMessages
                startTransition(() => {
                    setMessages?.(newMessages)
                })
            }

            if (finalMessages && finalMessages.length > 0) {
                saveChatMessages(chatId, finalMessages)
            }
        } finally {
        }
    }

    const initialChatState = useMemo<Partial<ChatState>>(
        () => ({
            messages: loadChatMessages(chatId),
            abortController: new AbortController(),
            isGenerating: false,
        }),
        [loaderData, chatId],
    )
    const drawerState = usePersistentDocsState((x) => x.drawerState)

    const drawerContentStyle = (() => {
        if (drawerState === 'minimized') {
            return { transform: 'translateX(400px)' }
        }
        return {}
    })()

    const handleDrawerClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (drawerState === 'minimized') {
            usePersistentDocsState.setState({ drawerState: 'open' })
            const textarea = document.querySelector(
                '.chat-textarea',
            ) as HTMLElement
            if (textarea) {
                textarea.focus()
            }
        }
    }

    return (
        <ChatProvider
            initialValue={initialChatState}
            generateMessages={submitMessageWithoutDelete}
        >
            <AnimatePresence>
                {drawerState !== 'minimized' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className='fixed inset-0 bg-black/50 z-40'
                        onClick={() => {
                            usePersistentDocsState.setState({
                                drawerState: 'closed',
                            })
                        }}
                        aria-hidden='true'
                    />
                )}
            </AnimatePresence>
            <Sheet
                onOpenChange={(open) => {
                    console.log('Drawer open state changed:', open)
                    if (drawerState === 'minimized') {
                        return
                    }
                    usePersistentDocsState.setState({
                        drawerState: open ? 'open' : 'closed',
                    })
                }}
                open={drawerState !== 'closed'}
                modal={false}
            >
                <SheetContent
                    className='bg-background lg:min-w-[600px] min-w-full'
                    style={drawerContentStyle}
                >
                    <ChatTopBar />
                    <div
                        onClick={handleDrawerClick}
                        className='p-4 flex flex-col min-h-0 grow pb-0'
                    >
                        <Chat />
                    </div>
                </SheetContent>
            </Sheet>
        </ChatProvider>
    )
}

function ChatTopBar() {
    const { setMessages, stop } = useChatContext()
    const clearChat = (e) => {
        stop()
        const newChatId = generateChatId()
        usePersistentDocsState.setState({ chatId: newChatId })
        setMessages([])
        const textarea = document.querySelector('.chat-textarea') as HTMLElement
        if (textarea) {
            textarea.focus()
        }
    }

    const closeDrawer = () => {
        usePersistentDocsState.setState({ drawerState: 'closed' })
    }

    return (
        <div className='flex items-center justify-between p-4 border-b'>
            <div className='font-semibold'>Chat</div>
            <div className='flex items-center gap-2'>
                <Button
                    variant='ghost'
                    size='sm'
                    onClick={clearChat}
                    className='h-8 w-8 p-0'
                >
                    <Trash2Icon className='h-4 w-4' />
                </Button>
                <Button
                    variant='ghost'
                    size='sm'
                    onClick={closeDrawer}
                    className='h-8 w-8 p-0'
                >
                    <XIcon className='h-4 w-4' />
                </Button>
            </div>
        </div>
    )
}

function Chat({}) {
    return (
        <ScrollArea className='[&>div>div]:grow -mr-4 [scrollbar-gutter:stable_both-edges] pr-4 relative items-stretch rounded max-h-full flex flex-col grow justify-center '>
            <div className='flex flex-col gap-4 relative h-full justify-center'>
                <Messages />
                <WelcomeMessage />
                <Footer />
            </div>
        </ScrollArea>
    )
}

function WelcomeMessage() {
    const { messages } = useChatContext()
    if (messages?.length) return null
    return (
        <Markdown
            markdown={
                'Hi, I am fumabase, I can help you search and explain the docs\n'
            }
            className='text-2xl select-none text-center text-balance font-semibold'
            isStreaming={false}
        />
    )
}

function Messages({ ref }: { ref?: React.Ref<HTMLDivElement> }) {
    const { messages } = useChatContext()

    if (!messages.length) return null
    return (
        <div ref={ref} className={cn('w-full flex flex-col grow gap-6')}>
            {messages.map((message) => {
                return (
                    <MessageRenderer
                        key={message.id}
                        message={message as DocsUIMessage}
                    />
                )
            })}
            <ChatErrorMessage />
        </div>
    )
}

function MessageRenderer({ message }: { message: DocsUIMessage }) {
    const { isGenerating: isChatGenerating } = useChatContext()

    if (message.role === 'user') {
        return (
            <ChatUserMessage message={message}>
                {message.parts.map((part, index) => {
                    if (part.type === 'text') {
                        return (
                            <Markdown
                                key={index}
                                className='[&_p]:m-0'
                                isStreaming={isChatGenerating}
                                markdown={part.text}
                            />
                        )
                    }
                    return null
                })}
            </ChatUserMessage>
        )
    }

    return (
        <ChatAssistantMessage message={message}>
            {message.parts.map((part, index) => {
                if (part.type === 'text') {
                    return (
                        <Markdown
                            isStreaming={isChatGenerating}
                            key={index}
                            markdown={part.text}
                        />
                    )
                }

                if (part.type === 'reasoning') {
                    return (
                        <Markdown
                            key={index}
                            isStreaming={isChatGenerating}
                            markdown={'thinking: ' + part.text}
                        />
                    )
                }

                if (part.type === 'tool-searchDocs') {
                    return (
                        <div
                            key={index}
                            className='text-sm text-muted-foreground'
                        >
                            <Markdown
                                isStreaming={isChatGenerating}
                                markdown={`🔍 Searching docs: ${part.input?.terms?.join(', ') || 'unknown'}`}
                            />
                        </div>
                    )
                }

                if (part.type === 'tool-goToPage') {
                    return (
                        <div
                            key={index}
                            className='text-sm text-muted-foreground'
                        >
                            <Markdown
                                isStreaming={isChatGenerating}
                                markdown={`📄 Navigating to: ${part.input?.slug || 'unknown'}`}
                            />
                        </div>
                    )
                }

                if (part.type === 'tool-getCurrentPage') {
                    return (
                        <div
                            key={index}
                            className='text-sm text-muted-foreground'
                        >
                            <Markdown
                                isStreaming={isChatGenerating}
                                markdown={`📍 Getting current page`}
                            />
                        </div>
                    )
                }

                if (part.type === 'tool-fetchUrl') {
                    return (
                        <div
                            key={index}
                            className='text-sm text-muted-foreground'
                        >
                            <Markdown
                                isStreaming={isChatGenerating}
                                markdown={`🌐 Fetching: ${part.input?.url || 'unknown'}`}
                            />
                        </div>
                    )
                }
                if (part.type === 'tool-strReplaceEditor') {
                    return <EditorToolPreview key={index} {...part} />
                }

                if (part.type === 'tool-selectText') {
                    if (!part.input) return null
                    return (
                        <div
                            key={index}
                            className='text-sm text-muted-foreground'
                        >
                            <Markdown
                                isStreaming={isChatGenerating}
                                markdown={`🔎 Selecting lines  ${part.input?.slug}:${part.input?.startLine || 0}:${part.input?.endLine || ''}`}
                            />
                        </div>
                    )
                }

                if (
                    part.type.startsWith('tool-') &&
                    process.env.NODE_ENV === 'development'
                ) {
                    return (
                        <pre key={index} className='text-xs p-2 rounded'>
                            {JSON.stringify(part, null, 2)}
                        </pre>
                    )
                }

                return null
            })}
        </ChatAssistantMessage>
    )
}

// Static autocomplete suggestions for first message
const AUTOCOMPLETE_SUGGESTIONS = [
    'Explain this page',
    'Summarize the current section',
    'What are the key concepts here?',
    'Show me usage examples',
    'How do I configure this?',
    'Troubleshoot related issues',
    'Compare with similar features',
    'Best practices for setup',
    'Show integration tips',
    'How can I optimize performance?',
]

function ContextButton({ contextOptions }) {
    const [open, setOpen] = useState(false)
    const { draftText, setDraftText } = useChatContext()

    const handleContextSelect = (selectedValue) => {
        if (!selectedValue) return

        const currentText = draftText || ''
        const newText = currentText + (currentText ? ' ' : '') + selectedValue
        setDraftText(newText)
        setOpen(false)
    }

    return (
        <div className='ml-2 my-2 self-start'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant='ghost' className='border'>
                        @ Add context
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='p-0 max-w-full' align='start'>
                    <Command>
                        <CommandInput
                            placeholder='Search context...'
                            className='h-9'
                        />
                        <CommandList>
                            <CommandEmpty>No context found.</CommandEmpty>
                            <CommandGroup>
                                {contextOptions.map((option) => (
                                    <CommandItem
                                        key={option}
                                        value={option}
                                        onSelect={() => {
                                            handleContextSelect(option)
                                        }}
                                        className='max-w-full'
                                    >
                                        <span className='truncate'>
                                            {option.replace(/^@\//, '')}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

function Footer() {
    const { isGenerating, draftText, submit, stop } = useChatContext()
    const chatId = usePersistentDocsState((x) => x.chatId)

    const rootLoaderData = useRouteLoaderData(
        'routes/_catchall',
    ) as Route.ComponentProps['loaderData']
    const files = rootLoaderData?.files || []

    const transcribeAudio = async (audioFile: File): Promise<string> => {
        try {
            const formData = new FormData()
            formData.append('audio', audioFile)

            const response = await fetch(
                new URL('/api/transcribeAudio', env.PUBLIC_URL).toString(),
                {
                    method: 'POST',
                    body: formData,
                },
            )

            if (!response.ok) {
                throw new Error('Transcription failed')
            }

            const { text } = await response.json()
            return text || ''
        } catch (error) {
            console.error('Transcription error:', error)
            return ''
        }
    }

    const { messages } = useChatContext()
    useEffect(() => {
        const lastMessageId = messages[messages.length - 1]?.id || ''
        if (!lastMessageId) return
        const durableUrl = `/api/generateMessage?lastMessageId=${lastMessageId}`
        docsDurableFetchClient.isInProgress(durableUrl).then((res) => {
            console.log('isInProgress response:', res)
            if (res.inProgress) {
                submit()
            }
        })
    }, [chatId])

    // Generate context options from actual files
    const contextOptions = files
        .filter((file) => file.type === 'page')
        .map((file) => `@${file.path.replace(/\.mdx\?$/, '')}`)

    return (
        <AnimatePresence custom={false} onExitComplete={() => {}}>
            <div className=' sticky bottom-4 z-50 w-full mt-4'>
                <motion.div
                    layoutId='textarea'
                    className={cn(
                        ' w-full mt-4 rounded-[10px] border bg-background flex flex-col max-w-3xl mx-auto space-y-3',
                    )}
                >
                    <ContextButton contextOptions={contextOptions} />
                    <ChatTextarea
                        disabled={false}
                        placeholder='Ask me anything...'
                        className={cn('chat-textarea')}
                        autoFocus
                        mentionOptions={contextOptions}
                    />

                    <div className='flex items-center justify-between gap-2 p-3 py-2'>
                        {/* <ChatUploadButton
                            accept='image/*,text/*,.pdf,.docx,.doc'
                            onFilesChange={(files) => {
                                // TODO: Wire uploaded files to messages
                                console.log('Files uploaded:', files)
                            }}
                        /> */}
                        <ChatRecordButton transcribeAudio={transcribeAudio} />
                        <div className='grow'></div>
                        {isGenerating ? (
                            <Button
                                className='rounded-md h-8'
                                onClick={stop}
                                variant='outline'
                            >
                                Stop
                            </Button>
                        ) : (
                            <Button
                                className='rounded-md h-8'
                                onClick={submit}
                                disabled={!draftText?.trim()}
                            >
                                Generate
                            </Button>
                        )}
                    </div>
                </motion.div>
                <ChatAutocomplete
                    autocompleteSuggestions={AUTOCOMPLETE_SUGGESTIONS}
                />
            </div>
        </AnimatePresence>
    )
}

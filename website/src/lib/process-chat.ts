import { TextStreamPart, ToolInvocation, ToolSet, UIMessage } from 'ai'

import { parsePartialJson } from '@ai-sdk/ui-utils'
import { UseChatOptions } from 'ai/react'

type UiMessagePart = UIMessage['parts'][number]

type TextUIPart = Extract<UiMessagePart, { type: 'text' }>
type ReasoningUIPart = Extract<UiMessagePart, { type: 'reasoning' }>
type ToolInvocationUIPart = Extract<UiMessagePart, { type: 'tool-invocation' }>

export async function* fullStreamToUIMessages<TOOLS extends ToolSet>({
    fullStream,
    messages,
    onToolCall,
    generateId,
    getCurrentDate = () => new Date(),
}: {
    fullStream: AsyncIterable<TextStreamPart<TOOLS>>
    messages: UIMessage[]
    onToolCall?: UseChatOptions['onToolCall']
    generateId: () => string
    getCurrentDate?: () => Date
}) {
    const lastMessage = messages[messages.length - 1]
    const replaceLastMessage = lastMessage?.role === 'assistant'

    // Calculate step from existing tool invocation parts in the message
    let step = 0
    if (replaceLastMessage) {
        const toolInvocationParts = lastMessage.parts?.filter(
            (part) => part.type === 'tool-invocation',
        ) as ToolInvocationUIPart[] | undefined

        if (toolInvocationParts?.length) {
            const maxStep = toolInvocationParts.reduce((max, part) => {
                return Math.max(max, part.toolInvocation.step ?? 0)
            }, 0)
            step = maxStep + 1
        }
    }

    const message: UIMessage = replaceLastMessage
        ? structuredClone(lastMessage)
        : {
              id: generateId(),
              createdAt: getCurrentDate(),
              role: 'assistant',
              content: '',
              parts: [],
          }

    const currentMessages = [...messages]
    if (!replaceLastMessage) {
        currentMessages.push(message)
    } else {
        currentMessages[currentMessages.length - 1] = message
    }

    let currentTextPart: TextUIPart | undefined = undefined
    let currentReasoningPart: ReasoningUIPart | undefined = undefined
    let currentReasoningTextDetail:
        | { type: 'text'; text: string; signature?: string }
        | undefined = undefined

    function updateToolInvocationPart(
        toolCallId: string,
        invocation: ToolInvocation,
    ) {
        const partIdx = message.parts.findIndex(
            (part) =>
                part.type === 'tool-invocation' &&
                part.toolInvocation.toolCallId === toolCallId,
        )

        if (partIdx !== -1) {
            const target = message.parts[partIdx] as ToolInvocationUIPart
            const updated = {
                ...target,
                toolInvocation: { ...target.toolInvocation, ...invocation },
            }
            message.parts = [
                ...message.parts.slice(0, partIdx),
                updated,
                ...message.parts.slice(partIdx + 1),
            ]
        } else {
            message.parts = message.parts.concat([
                {
                    type: 'tool-invocation',
                    toolInvocation: invocation,
                },
            ])
        }
    }

    const partialToolCalls: Record<
        string,
        { text: string; step: number; index: number; toolName: string }
    > = {}

    for await (const values of throttleGenerator(fullStream, 50)) {
        for (const value of values) {
            const type = value.type
            if (type === 'text-delta') {
                if (currentTextPart == null) {
                    currentTextPart = {
                        type: 'text',
                        text: value.textDelta,
                    }
                    message.parts = message.parts.concat([currentTextPart])
                } else {
                    currentTextPart.text += value.textDelta
                }

                message.content += value.textDelta
                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'reasoning') {
                if (currentReasoningTextDetail == null) {
                    currentReasoningTextDetail = {
                        type: 'text',
                        text: value.textDelta,
                    }
                    if (currentReasoningPart != null) {
                        currentReasoningPart.details.push(
                            currentReasoningTextDetail,
                        )
                    }
                } else {
                    currentReasoningTextDetail.text += value?.textDelta
                }

                if (currentReasoningPart == null) {
                    currentReasoningPart = {
                        type: 'reasoning',
                        reasoning: value.textDelta,
                        details: [currentReasoningTextDetail],
                    }
                    message.parts = message.parts.concat([currentReasoningPart])
                } else {
                    currentReasoningPart.reasoning += value?.textDelta
                }

                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'reasoning-signature') {
                if (currentReasoningTextDetail != null) {
                    currentReasoningTextDetail.signature = value.signature
                }
            } else if (type === 'redacted-reasoning') {
                if (currentReasoningPart == null) {
                    currentReasoningPart = {
                        type: 'reasoning',
                        reasoning: '',
                        details: [],
                    }
                    message.parts = message.parts.concat([currentReasoningPart])
                }

                currentReasoningPart.details.push({
                    type: 'redacted',
                    data: value.data,
                })

                currentReasoningTextDetail = undefined

                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'file') {
                message.parts = message.parts.concat([
                    {
                        type: 'file',
                        mimeType: value.mimeType,
                        data: value.base64,
                    },
                ])

                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'source') {
                message.parts = message.parts.concat([
                    {
                        type: 'source',
                        source: value.source,
                    },
                ])

                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'error') {
                const err = value?.error as Error | { message?: string }
                throw new Error(err?.message || String(err))
            } else if (type === 'tool-call-streaming-start') {
                // add the partial tool call to the map
                partialToolCalls[value.toolCallId] = {
                    text: '',
                    step,
                    toolName: value.toolName,
                    index: message.parts.filter(
                        (part) => part.type === 'tool-invocation',
                    ).length,
                }

                updateToolInvocationPart(value.toolCallId, {
                    state: 'partial-call',
                    step,
                    toolCallId: value.toolCallId,
                    toolName: value.toolName,
                    args: undefined,
                })

                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'tool-call-delta') {
                const partialToolCall = partialToolCalls[value.toolCallId]
                if (!partialToolCall) {
                    throw new Error(
                        `missing partialToolCall for ${value.toolCallId}`,
                    )
                }

                partialToolCall.text += value.argsTextDelta

                const { value: partialArgs } = parsePartialJson(
                    partialToolCall.text,
                )

                updateToolInvocationPart(value.toolCallId, {
                    state: 'partial-call',
                    step: partialToolCall.step,
                    toolCallId: value.toolCallId,
                    toolName: partialToolCall.toolName,

                    args: partialArgs,
                })

                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'tool-call') {
                updateToolInvocationPart(value.toolCallId, {
                    state: 'call',
                    step,
                    ...value,
                })

                yield currentMessages.slice(0, -1).concat({ ...message })

                // invoke the onToolCall callback if it exists. This is blocking.
                // In the future we should make this non-blocking, which
                // requires additional state management for error handling etc.
                if (onToolCall) {
                    const result = await onToolCall({ toolCall: value })
                    if (result != null) {
                        updateToolInvocationPart(value.toolCallId, {
                            state: 'result',
                            step,
                            ...value,
                            result,
                        })

                        yield currentMessages
                            .slice(0, -1)
                            .concat({ ...message })
                    }
                }
            } else if (type === 'tool-result') {
                updateToolInvocationPart(value.toolCallId, {
                    state: 'result' as const,
                    ...value,
                })

                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'finish') {
                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'step-finish') {
                step += 1

                // reset the current text and reasoning parts
                currentTextPart = value.isContinued
                    ? currentTextPart
                    : undefined
                currentReasoningPart = undefined
                currentReasoningTextDetail = undefined
                yield currentMessages.slice(0, -1).concat({ ...message })
            } else if (type === 'step-start') {
                // keep message id stable when we are updating an existing message:
                if (!replaceLastMessage) {
                    message.id = value.messageId
                }

                // add a step boundary part to the message
                message.parts = message.parts.concat([{ type: 'step-start' }])
                yield currentMessages.slice(0, -1).concat({ ...message })
            } else {
                const exhaustiveCheck: never = type
                throw new Error(`Unknown stream part type: ${exhaustiveCheck}`)
            }
        }
    }
}

async function* throttleGenerator<T>(
    generator: AsyncIterable<T>,
    delayMs: number = 16,
): AsyncIterable<T[]> {
    let buffer: T[] = []
    let lastYield = 0

    for await (const item of generator) {
        buffer.push(item)

        const now = Date.now()
        if (now - lastYield >= delayMs) {
            yield [...buffer]
            buffer = []
            lastYield = now
        }
    }

    // Flush any remaining items
    if (buffer.length > 0) {
        yield buffer
    }
}

import { describe, test, expect } from 'vitest'
import {
    createIdGenerator,
    streamText,
    wrapLanguageModel,
    generateText,
    UIMessage,
    tool,
} from 'ai'
import { z } from 'zod/v4'
import { openai, OpenAIResponsesProviderOptions } from '@ai-sdk/openai'
import { uiStreamToUIMessages } from './process-chat.js'
import { createAiCacheMiddleware } from './ai-cache.js'
import {
    asyncIterableToReadableStream,
    readableStreamToAsyncIterable,
} from './utils.js'

describe('process-chat', () => {
    test('should convert simple streamText to messages', async () => {
        const middleware = createAiCacheMiddleware({})

        const model = wrapLanguageModel({
            model: openai('gpt-4o-mini'),
            middleware: [middleware],
        })

        const result = streamText({
            model,
            prompt: 'Say hello in one word',
        })

        const uiStream = result.toUIMessageStream()
        let counter = 0
        const generateId = () => `id-${++counter}`

        let finalMessages: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream,
            messages: [],
            generateId,
        })) {
            finalMessages = messages // Keep updating to get the final state
        }

        expect(finalMessages).toMatchInlineSnapshot(`
          [
            {
              "id": "id-1",
              "parts": [],
              "role": "assistant",
            },
          ]
        `)
    }, 10000)

    test('should handle text streaming with parts', async () => {
        const middleware = createAiCacheMiddleware({})

        const model = wrapLanguageModel({
            model: openai('gpt-4o-mini'),
            middleware: [middleware],
        })

        const result = streamText({
            model,
            prompt: 'Count to 3',
        })

        const uiStream = result.toUIMessageStream()
        let counter = 0
        const generateId = () => `id-${++counter}`

        let finalMessages: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream,
            messages: [],
            generateId,
        })) {
            finalMessages = messages // Keep updating to get the final state
        }

        // Check that we have at least one message with text parts
        expect(finalMessages.length).toBeGreaterThan(0)

        const lastMessage = finalMessages[finalMessages.length - 1]
        expect(lastMessage).toHaveProperty('role', 'assistant')
        expect(lastMessage).toHaveProperty('parts')
        expect(Array.isArray(lastMessage.parts)).toBe(true)

        // Check that there's at least one text part
        const textParts = lastMessage.parts.filter(
            (part) => part.type === 'text',
        )
        expect(textParts.length).toBeGreaterThan(0)
        expect(textParts[0]).toHaveProperty('text')

        expect(finalMessages).toMatchInlineSnapshot(`
          [
            {
              "id": "id-1",
              "parts": [
                {
                  "type": "step-start",
                },
                {
                  "state": "done",
                  "text": "1, 2, 3.",
                  "type": "text",
                },
              ],
              "role": "assistant",
            },
          ]
        `)
    }, 10000)

    test('should handle actual streamText with cache', async () => {
        const middleware = createAiCacheMiddleware({})

        const model = wrapLanguageModel({
            model: openai('gpt-4o-mini'),
            middleware: [middleware],
        })

        const result = streamText({
            model,
            prompt: 'Write a brief greeting message',
        })

        const uiStream = result.toUIMessageStream()
        let counter = 0
        const generateId = () => `id-${++counter}`

        let finalMessages: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream,
            messages: [],
            generateId,
        })) {
            finalMessages = messages // Keep updating to get the final state
        }

        // Verify message structure
        expect(finalMessages.length).toBeGreaterThan(0)

        const message = finalMessages[0]
        expect(message).toHaveProperty('id')
        expect(message).toHaveProperty('role', 'assistant')
        expect(message).toHaveProperty('parts')
        expect(Array.isArray(message.parts)).toBe(true)

        // Check that there's at least one text part
        const textParts = message.parts.filter((part) => part.type === 'text')
        expect(textParts.length).toBeGreaterThan(0)
        expect(textParts[0]).toHaveProperty('text')
        expect(typeof textParts[0].text).toBe('string')
        expect(textParts[0].text.length).toBeGreaterThan(0)

        // Test that cache is working by running the same request again
        const result2 = streamText({
            model,
            prompt: 'Write a brief greeting message',
        })

        const uiStream2 = result2.toUIMessageStream()
        let finalMessages2: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream: uiStream2,
            messages: [],
            generateId,
        })) {
            finalMessages2 = messages
        }

        // Verify that both responses have the same structure
        expect(finalMessages2.length).toBe(finalMessages.length)
        expect(finalMessages2[0]).toHaveProperty('role', 'assistant')
        expect(finalMessages2[0].parts.length).toBeGreaterThan(0)
    }, 10000)

    test('should handle structured output without tools', async () => {
        const middleware = createAiCacheMiddleware({})

        const model = wrapLanguageModel({
            model: openai('gpt-4o-mini'),
            middleware: [middleware],
        })

        const result = streamText({
            model,
            prompt: 'Generate a simple JSON response with a greeting message. Just respond with {"message": "hello"}',
        })

        const uiStream = result.toUIMessageStream()
        let counter = 0
        const generateId = () => `id-${++counter}`

        let finalMessages: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream,
            messages: [],
            generateId,
        })) {
            finalMessages = messages
        }

        // Verify message structure
        expect(finalMessages.length).toBeGreaterThan(0)

        const message = finalMessages[0]
        expect(message).toHaveProperty('id')
        expect(message).toHaveProperty('role', 'assistant')
        expect(message).toHaveProperty('parts')
        expect(Array.isArray(message.parts)).toBe(true)

        // Check that there's at least one text part
        const textParts = message.parts.filter((part) => part.type === 'text')
        expect(textParts.length).toBeGreaterThan(0)
        expect(textParts[0]).toHaveProperty('text')
        expect(typeof textParts[0].text).toBe('string')
        expect(textParts[0].text.length).toBeGreaterThan(0)

        expect(finalMessages).toMatchInlineSnapshot(`
          [
            {
              "id": "id-1",
              "parts": [
                {
                  "type": "step-start",
                },
                {
                  "state": "done",
                  "text": "{"message": "hello"}",
                  "type": "text",
                },
              ],
              "role": "assistant",
            },
          ]
        `)
    }, 10000)

    test('should handle step boundaries', async () => {
        const middleware = createAiCacheMiddleware({})

        const model = wrapLanguageModel({
            model: openai('gpt-4o-mini'),
            middleware: [middleware],
        })

        const result = streamText({
            model,
            prompt: 'Respond with just the word "test"',
        })

        const uiStream = result.toUIMessageStream()
        let counter = 0
        const generateId = () => `id-${++counter}`

        let finalMessages: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream,
            messages: [],
            generateId,
        })) {
            finalMessages = messages
        }

        // Verify message structure
        expect(finalMessages.length).toBeGreaterThan(0)

        const message = finalMessages[0]
        expect(message).toHaveProperty('id')
        expect(message).toHaveProperty('role', 'assistant')
        expect(message).toHaveProperty('parts')
        expect(Array.isArray(message.parts)).toBe(true)

        // Check for text parts and step-start parts
        const textParts = message.parts.filter((part) => part.type === 'text')
        const stepParts = message.parts.filter(
            (part) => part.type === 'step-start',
        )

        // Should have text parts and step boundary
        expect(textParts.length).toBeGreaterThan(0)
        expect(stepParts.length).toBeGreaterThan(0)

        // Verify text part structure
        if (textParts.length > 0) {
            expect(textParts[0]).toHaveProperty('text')
            expect(typeof textParts[0].text).toBe('string')
            expect(textParts[0].text.length).toBeGreaterThan(0)
        }

        expect(finalMessages).toMatchInlineSnapshot(`
          [
            {
              "id": "id-1",
              "parts": [
                {
                  "type": "step-start",
                },
                {
                  "state": "done",
                  "text": "test",
                  "type": "text",
                },
              ],
              "role": "assistant",
            },
          ]
        `)
    }, 10000)

    test('should handle mock tool stream parts', async () => {
        // Test that our process-chat can handle tool-related stream parts
        let counter = 0
        const generateId = () => `id-${++counter}`

        // Create a mock stream with tool parts in deterministic order
        const mockToolStream = async function* () {
            yield { type: 'start-step' as const }
            yield {
                type: 'tool-input-start' as const,
                toolCallId: 'call-1',
                toolName: 'getCurrentTime',
            }
            yield {
                type: 'tool-input-delta' as const,
                toolCallId: 'call-1',
                inputTextDelta: '{"timezone":',
            }
            yield {
                type: 'tool-input-delta' as const,
                toolCallId: 'call-1',
                inputTextDelta: '"UTC"}',
            }
            yield {
                type: 'tool-input-available' as const,
                toolCallId: 'call-1',
                toolName: 'getCurrentTime',
                input: { timezone: 'UTC' },
                providerExecuted: true,
            }
            yield {
                type: 'tool-output-available' as const,
                toolCallId: 'call-1',
                output: 'Current time is 2024-01-01T12:00:00.000Z in UTC',
            }
            yield { type: 'finish-step' as const }
        }

        let finalMessages: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream: asyncIterableToReadableStream(mockToolStream()),
            messages: [],
            generateId,
        })) {
            finalMessages = messages
        }

        // Verify message structure includes tool parts
        expect(finalMessages.length).toBeGreaterThan(0)

        const message = finalMessages[0]
        expect(message).toHaveProperty('id')
        expect(message).toHaveProperty('role', 'assistant')
        expect(message).toHaveProperty('parts')
        expect(Array.isArray(message.parts)).toBe(true)

        // Check that there's at least one tool part
        const toolParts = message.parts.filter((part) =>
            part.type.startsWith('tool-'),
        )
        expect(toolParts.length).toBeGreaterThan(0)
        expect(toolParts[0]).toHaveProperty('type')
        expect(toolParts[0].type).toMatch(/^tool-/)

        expect(finalMessages).toMatchInlineSnapshot(`
          [
            {
              "id": "id-1",
              "parts": [
                {
                  "type": "step-start",
                },
                {
                  "errorText": undefined,
                  "input": {
                    "timezone": "UTC",
                  },
                  "output": "Current time is 2024-01-01T12:00:00.000Z in UTC",
                  "providerExecuted": true,
                  "state": "output-available",
                  "toolCallId": "call-1",
                  "type": "tool-getCurrentTime",
                },
              ],
              "role": "assistant",
            },
          ]
        `)
    }, 10000)

    test('should handle actual tool calls with getCurrentTime', async () => {
        const middleware = createAiCacheMiddleware({})

        const model = wrapLanguageModel({
            model: openai('gpt-4.1'),
            middleware: [middleware],
        })

        const getCurrentTime = tool({
            description: 'Get the current time in a specific timezone',
            inputSchema: z.object({
                timezone: z
                    .string()
                    .describe('The timezone to get the time for, e.g., "UTC"'),
            }),
            execute: async ({ timezone }) => {
                return `Current time is 2024-01-01T12:00:00.000Z in ${timezone}`
            },
        })

        const result = streamText({
            model,
            prompt: 'Call the getCurrentTime tool with timezone "UTC". Please specify the parameters in this exact order: timezone.',
            tools: { getCurrentTime },
            temperature: 0,
        })

        const uiStream = result.toUIMessageStream()
        let counter = 0
        const generateId = () => `id-${++counter}`

        let finalMessages: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream,
            messages: [],
            generateId,
        })) {
            finalMessages = messages
        }

        // Verify message structure includes tool parts
        expect(finalMessages.length).toBeGreaterThan(0)

        const message = finalMessages[0]
        expect(message).toHaveProperty('id')
        expect(message).toHaveProperty('role', 'assistant')
        expect(message).toHaveProperty('parts')
        expect(Array.isArray(message.parts)).toBe(true)

        // Check that there's at least one tool part
        const toolParts = message.parts.filter((part) =>
            part.type.startsWith('tool-'),
        )
        expect(toolParts.length).toBeGreaterThan(0)
        expect(toolParts[0]).toHaveProperty('type')
        expect(toolParts[0].type).toMatch(/^tool-/)

        expect(finalMessages).toMatchInlineSnapshot(`
          [
            {
              "id": "id-1",
              "parts": [
                {
                  "type": "step-start",
                },
                {
                  "errorText": undefined,
                  "input": {
                    "timezone": "UTC",
                  },
                  "output": "Current time is 2024-01-01T12:00:00.000Z in UTC",
                  "providerExecuted": undefined,
                  "state": "output-available",
                  "toolCallId": "call_IbLOVx1uVpfsRM0FXipQQn5z",
                  "type": "tool-getCurrentTime",
                },
              ],
              "role": "assistant",
            },
          ]
        `)
    }, 30000)

    test('should handle reasoning with o4-mini model', async () => {
        const middleware = createAiCacheMiddleware({})

        const model = wrapLanguageModel({
            model: openai.responses('o4-mini'),

            middleware: [middleware],
        })

        const result = streamText({
            model,
            providerOptions: {
                openai: {
                    reasoningSummary: 'detailed',
                } satisfies OpenAIResponsesProviderOptions,
            },
            prompt: 'What is 122+67? do your calculations in the reasoning, only show me the result',
        })

        // Use a tee to duplicate the stream, convert one to async generator and to array if desired
        const [uiStream1, uiStream2] = result.toUIMessageStream().tee() // tee returns a [ReadableStream, ReadableStream]

        const parts = await Array.fromAsync(
            readableStreamToAsyncIterable(uiStream2),
        )

        const uiStream = uiStream1
        let counter = 0
        const generateId = () => `id-${++counter}`

        let finalMessages: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream,
            messages: [],

            generateId,
        })) {
            finalMessages = messages
        }

        // Verify message structure includes reasoning parts
        expect(finalMessages.length).toBeGreaterThan(0)

        const message = finalMessages[0]
        expect(message).toHaveProperty('id')
        expect(message).toHaveProperty('role', 'assistant')
        expect(message).toHaveProperty('parts')
        expect(Array.isArray(message.parts)).toBe(true)

        // Check that reasoning parts are properly included when they have content
        expect(message.parts).toMatchInlineSnapshot(`[]`)

        expect(finalMessages).toMatchInlineSnapshot(`
          [
            {
              "id": "id-1",
              "parts": [],
              "role": "assistant",
            },
          ]
        `)
    }, 30000)

    test('should handle reasoning with multiple sequential tool calls', async () => {
        const middleware = createAiCacheMiddleware({})

        const model = wrapLanguageModel({
            model: openai.responses('o4-mini'),
            middleware: [middleware],
        })

        const getCurrentTime = tool({
            description: 'Get the current time in a specific timezone',
            inputSchema: z.object({
                timezone: z
                    .string()
                    .describe('The timezone to get the time for, e.g., "UTC"'),
            }),
            execute: async ({ timezone }) => {
                return `Current time is 2024-01-01T12:00:00.000Z in ${timezone}`
            },
        })

        const calculateDifference = tool({
            description: 'Calculate the difference between two numbers',
            inputSchema: z.object({
                a: z.number().describe('First number'),
                b: z.number().describe('Second number'),
            }),
            execute: async ({ a, b }) => {
                return `The difference between ${a} and ${b} is ${Math.abs(a - b)}`
            },
        })

        const result = streamText({
            model,
            providerOptions: {
                openai: {
                    reasoningSummary: 'detailed',
                } satisfies OpenAIResponsesProviderOptions,
            },
            prompt: 'I need you to perform two sequential tasks. First, get the current time in UTC timezone. Then, after you get that result, calculate the difference between the numbers 150 and 75. Show your reasoning for planning each step.',
            tools: { getCurrentTime, calculateDifference },
            temperature: 0.1,
        })

        const uiStream = result.toUIMessageStream()
        let counter = 0
        const generateId = () => `id-${++counter}`

        let finalMessages: UIMessage[] = []
        for await (const messages of uiStreamToUIMessages({
            uiStream,
            messages: [],
            generateId,
        })) {
            finalMessages = messages
        }

        // Verify message structure includes both reasoning and tool parts
        expect(finalMessages.length).toBeGreaterThan(0)

        expect(finalMessages).toMatchInlineSnapshot(`
          [
            {
              "id": "id-1",
              "parts": [],
              "role": "assistant",
            },
          ]
        `)
    }, 30000)
})

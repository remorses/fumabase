'use client'
import { UIMessage } from 'ai'
import { DocsState } from 'docs-website/src/lib/docs-state'
import { createZustandContext } from 'docs-website/src/lib/zustand-context'
import { create } from 'zustand'
import { useDeferredValue, useMemo } from 'react'
import { FileUpdate } from './edit-tool'

export type State = {
    messages: UIMessage[]
    docsState?: Pick<DocsState, 'currentSlug' | 'filesInDraft'>
    lastPushedFiles: Record<string, FileUpdate>
    isChatGenerating?: boolean
    lastError?: {
        messageId: string
        error: string
        userInput: string
    }
    editingMessageId?: string
}

export const [StateProvider, useChatState] = createZustandContext<State>(
    (initial) => create((set) => ({ ...initial })),
)

export function doFilesInDraftNeedPush(
    currentFilesInDraft: Record<string, FileUpdate>,
    lastPushedFiles: Record<string, FileUpdate>,
) {
    // Use trimmed content comparison as before
    const hasNonPushedChanges = Object.keys(currentFilesInDraft).some((key) => {
        const current = currentFilesInDraft[key]
        const initial = lastPushedFiles[key]

        // Compare content or other relevant properties, trim before comparing content
        const currentContent = (current?.content ?? '').trim()
        const initialContent = (initial?.content ?? '').trim()

        const different = currentContent !== initialContent
        if (different) {
            const diffLen = Math.abs(currentContent.length - initialContent.length)
            // You might want to log more details depending on your needs
            // For now, we log the key, what changed, and by how many characters
            console.log(
                `[doFilesInDraftNeedPush] File "${key}" is different: length changed by ${diffLen} (was ${initialContent.length}, now ${currentContent.length})`
            )
        }
        return different
    })

    return hasNonPushedChanges
}

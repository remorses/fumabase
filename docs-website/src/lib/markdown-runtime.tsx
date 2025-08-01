'use client'

import { Markdown } from 'contesto/src/lib/markdown'
import { diffWordsWithSpace } from 'diff'
import { useMemo } from 'react'
import { mdxComponents } from '../components/mdx-components'
import { markAddedNodes } from './diff'
import { renderNode } from './mdx-code-block'
import { getProcessor } from './mdx-heavy'

export function MarkdownRuntime({
    extension = 'mdx',
    isStreaming = true,
    markdown,
    showDiff = false,
    previousMarkdown = '',
    className = '',

}) {
    const onAst = (ast) => {
        if (showDiff && previousMarkdown) {
            const diffs = diffWordsWithSpace(previousMarkdown, markdown)
            markAddedNodes(diffs, ast)
        }
    }

    const processor = useMemo(() => getProcessor({ extension }), [extension])

    return (
        <Markdown
            isStreaming={isStreaming}
            renderNode={renderNode}
            onAst={onAst}
            markdown={markdown}
            processor={processor}
            components={mdxComponents}

            className={className}
        />
    )
}

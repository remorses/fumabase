import memoize from 'micro-memoize'
import remarkFrontmatter from 'remark-frontmatter'

import YAML from 'js-yaml'
import { remarkMarkAndUnravel } from 'safe-mdx'

import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
} from '@shikijs/transformers'
import remarkGfm from 'remark-gfm'
import { remarkAdmonition } from 'fumadocs-core/mdx-plugins/remark-admonition'
import { remarkCodeTab } from 'fumadocs-core/mdx-plugins/remark-code-tab'
import { remarkHeading } from 'fumadocs-core/mdx-plugins/remark-heading'
import { remarkSteps } from 'fumadocs-core/mdx-plugins/remark-steps'
import {
    remarkStructure,
    StructuredData,
} from 'fumadocs-core/mdx-plugins/remark-structure'
import {} from 'js-yaml'
import { Heading, Root } from 'mdast'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import {
    createHighlighter,
    createHighlighterCore,
    createJavaScriptRegexEngine,
    Highlighter,
    HighlighterCore,
    loadWasm,
} from 'shiki'
import { bundledLanguages } from 'shiki/langs' // every grammar object

import { visit } from 'unist-util-visit'
import { remarkGitHubBlockquotes } from './github-blockquotes'

import { DocumentRecord } from 'fumadocs-core/search/algolia'

export type { DocumentRecord, StructuredData }

export type OnMissingLanguage = (h: Highlighter, lang: string) => any

const remarkCodeToHtml =
    ({
        highlighter,
        onMissingLanguage,
    }: {
        highlighter: Highlighter
        onMissingLanguage: OnMissingLanguage
    }) =>
    () => {
        return (tree: Root) => {
            visit(tree, 'code', (node) => {
                const language = node.lang || 'text'

                if (!trySync(() => highlighter.getLanguage(language))?.data) {
                    onMissingLanguage(highlighter, language)
                }

                let html = '\n'
                try {
                    html = highlighter.codeToHtml(node.value, {
                        lang: language,
                        // theme: 'github-dark',

                        themes: {
                            light: 'github-light',
                            dark: 'github-dark',
                        },

                        // experimentalJSEngine: false,
                        defaultColor: false,
                        transformers: [
                            transformerNotationHighlight({
                                matchAlgorithm: 'v3',
                            }),
                            transformerNotationWordHighlight({
                                matchAlgorithm: 'v3',
                            }),
                            transformerNotationDiff({
                                matchAlgorithm: 'v3',
                            }),
                            // transformerNotationFocus({
                            //     matchAlgorithm: 'v3',
                            // }),
                        ],
                    })
                } catch (e: any) {
                    if (
                        e.messages?.includes(
                            `not found, you may need to load it first`,
                        )
                    ) {
                        onMissingLanguage(highlighter, language)
                    }
                    throw e
                }

                node.data ||= {}
                node.data.html = html
            })

            return tree
        }
    }

declare module 'mdast' {
    interface CodeData {
        html?: string
    }
}

const remarkExtractFirstHeading = () => {
    return (tree: Root, file: any) => {
        if (!file.data) {
            file.data = {}
        }

        // Find the first h1 heading
        const nodes = tree.children
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]
            if (node.type === 'heading' && (node as Heading).depth === 1) {
                // Extract title from the heading
                let title = ''
                visit(node, 'text', (textNode) => {
                    title += textNode.value
                })

                // Store the title in file data
                file.data.title = title.trim()

                // Remove the heading from the tree
                nodes.splice(i, 1)
                break
            }
        }

        return tree
    }
}

import { trySync } from './utils'

export const getProcessor = function getProcessor({
    extension,
    onMissingLanguage,
    highlighter,
}: {
    extension: string | undefined
    highlighter: Highlighter
    onMissingLanguage: OnMissingLanguage
}) {
    if (typeof extension === 'string' && extension.endsWith('mdx')) {
        return (
            remark()
                .use(remarkMdx)
                .use(remarkFrontmatter, ['yaml'])
                .use(remarkGfm)
                .use(remarkGitHubBlockquotes)
                .use(remarkAdmonition)
                .use(remarkCodeTab)
                .use(remarkHeading)
                // .use(mdxPluginsFumadocs.remarkImage)
                .use(remarkSteps)
                .use(remarkStructure)
                .use(remarkMarkAndUnravel)
                .use(remarkCodeToHtml({ highlighter, onMissingLanguage }))
                .use(remarkExtractFirstHeading)
                .use(() => {
                    return (tree, file) => {
                        file.data.ast = tree
                    }
                })
        )
    } else {
        return (
            remark()
                // .use(remarkMdx)
                .use(remarkFrontmatter, ['yaml'])
                .use(remarkGfm)
                // .use(remarkGitHubBlockquotes) // TODO remarkGitHubBlockquotes cannot be stringified later because the mdx ast nodes are not valid md
                .use(remarkAdmonition)
                .use(remarkCodeTab)
                .use(remarkHeading)
                // .use(mdxPluginsFumadocs.remarkImage)
                .use(remarkSteps)
                .use(remarkStructure)
                // .use(remarkMarkAndUnravel)
                .use(remarkCodeToHtml({ highlighter, onMissingLanguage }))
                .use(remarkExtractFirstHeading)
                .use(() => {
                    return (tree, file) => {
                        file.data.ast = tree
                    }
                })
        )
    }
}
export type ProcessorData = {
    title?: string
    description?: string
    ast: Root
    frontmatter: Record<string, any>
    frontmatterYaml?: string
    structuredData: StructuredData
}

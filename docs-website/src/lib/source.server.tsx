import { prisma } from 'db'
import { loader, MetaData, PageData, VirtualFile } from 'fumadocs-core/source'
import { getIconJsx } from './icons.server'
import { I18nConfig } from 'fumadocs-core/i18n'
import { StructuredData } from './mdx-heavy'
import { deduplicateBy } from './utils'
import { FilesInDraft } from './docs-state'

export async function getFilesForSource({
    branchId,
    githubFolder,
    filesInDraft,
}: {
    branchId: string
    githubFolder: string
    filesInDraft: FilesInDraft
}) {
    const [allPages, metaFiles] = await Promise.all([
        prisma.markdownPage.findMany({
            where: {
                branchId,
            },
        }),
        prisma.metaFile.findMany({
            where: {
                branchId,
            },
            omit: {},
        }),
    ])

    const files = allPages
        .map((x) => {
            let githubPath = x.githubPath
            if (githubPath.startsWith(githubFolder)) {
                githubPath = githubPath.slice(githubFolder.length)
            }
            githubPath = removeFrontSlash(githubPath)
            const res: VirtualFile = {
                data: { ...(x.frontmatter as any) },
                path: githubPath,
                type: 'page',

                // slugs
            }
            return res
        })
        .concat(
            metaFiles.map((x) => {
                let githubPath = x.githubPath
                if (githubPath.startsWith(githubFolder)) {
                    githubPath = githubPath.slice(githubFolder.length)
                }
                githubPath = removeFrontSlash(githubPath)
                const res: VirtualFile = {
                    data: x.jsonData,
                    path: githubPath,
                    type: 'meta',
                }
                return res
            }),
        )

    const allFiles = [...files]
    if (Object.keys(filesInDraft).length > 0) {
        for (const [githubPath, draft] of Object.entries(filesInDraft)) {
            if (draft?.content == null) continue

            const normalizedPath = removeGithubFolder(githubPath, githubFolder)
            // Check if this file already exists in the files array
            const existingFileIndex = allFiles.findIndex(
                (f) => f.path === normalizedPath,
            )

            if (existingFileIndex >= 0) {
                // Update existing file with draft content
                allFiles[existingFileIndex] = {
                    ...allFiles[existingFileIndex],
                    // Note: we don't override the data here as it's used for meta information
                }
            } else {
                // Add new draft file
                allFiles.push({
                    path: normalizedPath,
                    data: {},
                    type: 'page',
                })
            }
        }
    }
    return deduplicateBy(files, (file) => file.path)
}

/**
 * Removes the leading slash from a given path, if present.
 * @param path - The input path string.
 * @returns The path without a leading slash.
 */
export function removeFrontSlash(path: string): string {
    if (path.startsWith('/')) {
        return path.slice(1)
    }
    return path
}

export function removeGithubFolder(path: string, githubFolder: string): string {
    if (githubFolder && path.startsWith(githubFolder)) {
        return path.slice(githubFolder.length + 1)
    }
    return path
}

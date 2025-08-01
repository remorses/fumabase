import cuid from '@bugsnag/cuid'
import { prisma } from 'db'
import { DocsJsonType } from 'docs-website/src/lib/docs-json'
import {
    defaultDocsJsonComments,
    defaultStartingFumabaseJson,
} from 'docs-website/src/lib/docs-json-examples'
import { href, redirect } from 'react-router'
import { getSession } from '../lib/better-auth'
import { env } from '../lib/env'
import { assetsFromFilesList, syncSite } from '../lib/sync'
import { slugKebabCaseKeepExtension } from '../lib/utils'
import type { Route } from './+types/org.$orgId.onboarding'

export async function loader({ request, params }: Route.LoaderArgs) {
    const sessionData = await getSession({ request })
    if (sessionData.redirectTo) {
        throw redirect(sessionData.redirectTo)
    }
    const userId = sessionData.userId
    const url = new URL(request.url)
    const siteId = cuid()
    const branchId = cuid()
    const userName = slugKebabCaseKeepExtension(
        sessionData.user?.name || 'fumabase',
    )
    const orgId = params.orgId
    let name = `fumabase-starter`
    const randomHash = Math.random().toString(36).substring(2, 10)

    const internalHost = `${userName}-${randomHash}.${env.APPS_DOMAIN}`
    const domains =
        process.env.NODE_ENV === 'development'
            ? [`${userName}-${randomHash}.localhost`, internalHost]
            : [internalHost]
    const docsJson: DocsJsonType = {
        ...defaultStartingFumabaseJson,
        siteId,
        name,
        domains,
    }
    // Then create the site with the repository ID
    const site = await prisma.site.create({
        data: {
            name,
            siteId,
            orgId: orgId,

            branches: {
                create: {
                    branchId,
                    title: 'Main',
                    // domain will be created based on fumabase.jsonc by syncSite
                },
            },
        },
    })

    console.log(`created site ${siteId}`)
    const files = assetsFromFilesList({
        files: [],
        githubFolder: '',
        docsJson,
        docsJsonComments: {
            ...defaultDocsJsonComments,
        },
    })
    await syncSite({
        files,
        githubFolder: site.githubFolder,
        branchId,
        siteId,
        name: `${userName} docs`,
        docsJson,
    })

    // Create a chat for the branch
    const chat = await prisma.chat.create({
        data: {
            userId,
            branchId,
        },
    })
    const chatId = chat.chatId
    throw redirect(
        href('/org/:orgId/site/:siteId/chat/:chatId', {
            orgId,
            siteId,
            chatId,
        }),
    )
}

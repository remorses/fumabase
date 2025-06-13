'use client'

import { type ReactNode, useState } from 'react'
import {
    SearchDialog,
    SearchDialogList,
    SharedProps,
    TagsList,
} from 'fumadocs-ui/components/dialog/search'
import { TrieveSDK } from 'trieve-ts-sdk'
import { useTrieveSearch } from './search/client'
import React from 'react'
import { useOnChange } from 'fumadocs-core/utils/use-on-change'
import { RootProvider } from 'fumadocs-ui/provider/base'
import { TagItem } from 'fumadocs-ui/contexts/search'

export interface TrieveSearchDialogProps extends SharedProps {
    trieveClient: TrieveSDK
    footer?: ReactNode

    defaultTag?: string
    tags?: TagItem[]

    /**
     * Add the "Powered by Trieve" label
     *
     * @defaultValue true
     */
    showTrieve?: boolean

    /**
     * Allow to clear tag filters
     *
     * @defaultValue false
     */
    allowClear?: boolean
}

export function TrieveSearchDialog({
    trieveClient,
    tags,
    defaultTag,
    showTrieve = true,
    allowClear = false,
    ...props
}: TrieveSearchDialogProps): React.ReactElement {
    const [tag, setTag] = useState(defaultTag)
    const { search, setSearch, query } = useTrieveSearch(
        trieveClient,
        undefined,
        tag,
    )

    useOnChange(defaultTag, (v) => {
        setTag(v)
    })

    return (
        <RootProvider>
            <SearchDialog
                search={search}
                onSearchChange={setSearch}
                isLoading={query.isLoading}
                {...props}
            >
                <SearchDialogList
                    items={query.data !== 'empty' ? query.data : null}
                />
            </SearchDialog>
        </RootProvider>
    )
}

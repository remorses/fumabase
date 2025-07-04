import { describe, test, expect } from 'vitest'
import { searchDocsWithTrieve } from './trieve-search'

describe('searchDocsWithTrieve', () => {
    test('returns empty array when no trieveDatasetId provided', async () => {
        const result = await searchDocsWithTrieve({
            query: 'markdown',
            trieveDatasetId: '8edeb160-d7ee-4fda-bc6e-f55eb0ec3554',
        })

        expect(result).toMatchInlineSnapshot(`
          [
            {
              "content": "Images and Embeds",
              "id": "pageb4115c51-fea0-4cb1-9910-e08ca70ab42d",
              "type": "page",
              "url": "/essentials/images",
            },
            {
              "chunk_html": "Fumabase supports HTML tags in <mark><b>Markdown</b></mark>. This is helpful if you prefer HTML tags to <mark><b>Markdown</b></mark> syntax, and lets you create documentation with infinite flexibility.",
              "content": "Fumabase supports HTML tags in <mark><b>Markdown</b></mark>. This is helpful if you prefer HTML tags to <mark><b>Markdown</b></mark> syntax, and lets you create documentation with infinite flexibility.",
              "created_at": "2025-07-01T15:58:36.908644",
              "dataset_id": "8edeb160-d7ee-4fda-bc6e-f55eb0ec3554",
              "id": "/essentials/images-embeds-and-html-elements-content",
              "image_urls": null,
              "link": "/essentials/images",
              "location": null,
              "metadata": {
                "page_id": "/essentials/images",
                "page_title": "Images and Embeds",
                "section": "Embeds and HTML elements",
                "section_id": "embeds-and-html-elements",
              },
              "num_value": null,
              "tag_set": [],
              "time_stamp": null,
              "tracking_id": "/essentials/images-embeds-and-html-elements-content",
              "type": "text",
              "updated_at": "2025-07-01T15:58:36.908644",
              "url": "/essentials/images#embeds-and-html-elements",
              "weight": 0,
            },
            {
              "chunk_html": "Using <mark><b>Markdown</b></mark>",
              "content": "Using <mark><b>Markdown</b></mark>",
              "created_at": "2025-07-01T15:58:36.908649",
              "dataset_id": "8edeb160-d7ee-4fda-bc6e-f55eb0ec3554",
              "id": "/essentials/images-using-markdown-heading",
              "image_urls": null,
              "link": "/essentials/images",
              "location": null,
              "metadata": {
                "page_id": "/essentials/images",
                "page_title": "Images and Embeds",
                "section": "Using Markdown",
                "section_id": "using-markdown",
              },
              "num_value": null,
              "tag_set": [],
              "time_stamp": null,
              "tracking_id": "/essentials/images-using-markdown-heading",
              "type": "text",
              "updated_at": "2025-07-01T15:58:36.908649",
              "url": "/essentials/images#using-markdown",
              "weight": 0,
            },
            {
              "content": "/essentials/images",
              "id": "page97ff4c0b-b92f-4ad6-b83e-d34fcfa45bd6",
              "type": "page",
              "url": "/essentials/images",
            },
            {
              "chunk_html": "Fumabase supports HTML tags in <mark><b>Markdown</b></mark>. This is helpful if you prefer HTML tags to <mark><b>Markdown</b></mark> syntax, and lets you create documentation with infinite flexibility.",
              "content": "Fumabase supports HTML tags in <mark><b>Markdown</b></mark>. This is helpful if you prefer HTML tags to <mark><b>Markdown</b></mark> syntax, and lets you create documentation with infinite flexibility.",
              "created_at": "2025-07-01T15:58:36.908644",
              "dataset_id": "8edeb160-d7ee-4fda-bc6e-f55eb0ec3554",
              "id": "/essentials/images-embeds-and-html-elements-content",
              "image_urls": null,
              "link": "/essentials/images",
              "location": null,
              "metadata": {
                "page_id": "/essentials/images",
                "page_title": "Images and Embeds",
                "section": "Embeds and HTML elements",
                "section_id": "embeds-and-html-elements",
              },
              "num_value": null,
              "tag_set": [],
              "time_stamp": null,
              "tracking_id": "/essentials/images-embeds-and-html-elements-content",
              "type": "text",
              "updated_at": "2025-07-01T15:58:36.908644",
              "url": "/essentials/images#embeds-and-html-elements",
              "weight": 0,
            },
            {
              "chunk_html": "Using <mark><b>Markdown</b></mark>",
              "content": "Using <mark><b>Markdown</b></mark>",
              "created_at": "2025-07-01T15:58:36.908649",
              "dataset_id": "8edeb160-d7ee-4fda-bc6e-f55eb0ec3554",
              "id": "/essentials/images-using-markdown-heading",
              "image_urls": null,
              "link": "/essentials/images",
              "location": null,
              "metadata": {
                "page_id": "/essentials/images",
                "page_title": "Images and Embeds",
                "section": "Using Markdown",
                "section_id": "using-markdown",
              },
              "num_value": null,
              "tag_set": [],
              "time_stamp": null,
              "tracking_id": "/essentials/images-using-markdown-heading",
              "type": "text",
              "updated_at": "2025-07-01T15:58:36.908649",
              "url": "/essentials/images#using-markdown",
              "weight": 0,
            },
          ]
        `)
    })
})

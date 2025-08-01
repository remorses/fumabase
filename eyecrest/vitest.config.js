import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config'

export default defineWorkersConfig({
    test: {
        poolOptions: {
            workers: {
                wrangler: { configPath: './wrangler.jsonc' },
            },
        },
        deps: {
            optimizer: {
                ssr: {
                    enabled: true,
                    include: ['ajv'],
                },
            },
        },
    },
})

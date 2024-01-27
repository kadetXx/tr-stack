import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

/**
 * provides type safe env variables
 * @see https://env.t3.gg/docs/introduction
 */
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    BASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_GITHUB_URL: z.string().url(),
  },

  experimental__runtimeEnv: {
    /**
     * all client side env variables should
     * be added here.
     *
     * server variables are automatically picked up
     */
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
  },
})

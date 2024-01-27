import { env } from '@/env.mjs'

/**
 * use for making request from
 * trpc server to next api routes
 */
export async function fetchApi(...input: Parameters<typeof fetch>) {
  const [path, ...rest] = input

  const res = await fetch(`${env.BASE_URL}${path}`, ...rest)
  return await res.json()
}

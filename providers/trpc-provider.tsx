'use client'

import superjson from 'superjson'
import { useState } from 'react'
import { api } from '@/services/trpc-client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, getFetch, loggerLink } from '@trpc/client'

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30000,
            refetchOnWindowFocus: true,
            /** add more global react-query config here */
          },
        },
      }),
  )

  const url =
    typeof window !== 'undefined'
      ? '/api/trpc'
      : process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc/`
        : 'http://localhost:3000/api/trpc/'

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          /** change to disabled if you don't
           * want your server to log all events
           * (eg prisma event)
           * */
          enabled: () => true,
        }),
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch()
            return fetch(input, {
              ...init,
              credentials: 'include',
            })
          },
        }),
      ],
      transformer: superjson,
    }),
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  )
}

import { prisma } from '@/server/db'
import { appRouter } from '@/server/routers/root'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { getServersideSession } from '@/server/utils'
import { NextRequest } from 'next/server'

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: '/api/trpc',
    createContext: async () => {
      const session = await getServersideSession()

      return {
        req,
        session,
        prisma,
        nextReq: null,
      }
    },
  })
}

export { handler as GET, handler as POST }

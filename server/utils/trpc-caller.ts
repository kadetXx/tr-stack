import { appRouter } from '../routers/root'
import { prisma } from '../db'
import { NextRequest } from 'next/server'
import { Cookies } from '@/constants/enums'

/**
 * use when making requests
 * to trpc server from next api routes
 */
export const trpcCaller = async (nextReq: NextRequest) => {
  const access_token = nextReq.cookies.get(Cookies.ACCESS_TOKEN_KEY)
  const refresh_token = nextReq.cookies.get(Cookies.REFRESH_TOKEN_KEY)

  return appRouter.createCaller({
    /**
     * request object from next's api route (nextReq) can now
     * be read from trpc context for procedures invoked using
     * this caller
     *
     * may be useful for passing cookies or data from
     * a next api route to trpc
     * */
    nextReq,
    prisma,
    session: {
      access_token: access_token?.value ?? '',
      refresh_token: refresh_token?.value ?? '',
    },
  })
}

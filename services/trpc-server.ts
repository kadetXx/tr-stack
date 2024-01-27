import superjson from 'superjson'
import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'
import { prisma } from '@/server/db'
import { unauthorisedError } from '@/constants/errors'
import { CreateTrpcContext, CreateTrpcInnerContext } from '@/types/trpc'

/**
 * trpc default context functions
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 * */
export const createInnerTRPCContext: CreateTrpcInnerContext = async () => {
  return {
    prisma,
    session: null,
    nextReq: null,
  }
}

/**
 * initialises trpc
 * @see https://trpc.io/docs/router
 * */
const t = initTRPC.context<CreateTrpcContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/** use for creating new routers */
export const createTRPCRouter = t.router

/** use for publicly available procedures in a router */
export const publicProcedure = t.procedure

/** use for procedures in a router that require a valid session */
export const authenticatedProcedure = t.procedure.use(async function isAuthed({
  ctx,
  next,
}) {
  if (ctx.session) {
    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    })
  }

  throw unauthorisedError('Unauthorised Access')
})

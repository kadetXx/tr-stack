import { createTRPCRouter } from '@/services/trpc-server'
import { userRouter } from './users'

export const appRouter = createTRPCRouter({
  users: userRouter,
})

export type AppRouter = typeof appRouter

import { type AppRouter } from '@/server/routers/root'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()

/** use when making requests
 * to trpc from client side
 * */
export const api = trpc

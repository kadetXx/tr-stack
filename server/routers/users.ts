import { z } from 'zod'
import {
  createTRPCRouter,
  publicProcedure,
  authenticatedProcedure,
} from '@/services/trpc-server'

export const userRouter = createTRPCRouter({
  /** publicly accessible */
  createUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name, email } = input

      return await ctx.prisma.user.create({
        data: {
          id,
          name,
          email,
        },
      })
    }),

  /** only authenticated users can access */
  getUser: authenticatedProcedure.mutation(async () => {
    return {
      id: 'uuid',
      name: 'John Doe',
      emai: 'johndoe@gmail.com',
    }
  }),
})

import { env } from '@/env.mjs'
import { PrismaClient } from '@prisma/client'
/**
 * initialises prisma ORM.
 * don't forget to create/update your .env file
 * with your db connection strings
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['error'] : ['error'],
  })

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

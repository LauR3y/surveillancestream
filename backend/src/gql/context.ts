import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({
  // debug: true,
  // log: ['INFO'],
})

export type Context = {
  prismaClient: PrismaClient
}

export const createContext = (): Context => ({
  prismaClient,
})

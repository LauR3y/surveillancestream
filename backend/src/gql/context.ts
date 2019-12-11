import { Photon } from '@prisma/photon'

const photon = new Photon({
  // debug: true,
  // log: ['INFO'],
})

export type Context = {
  photon: Photon
}

export const createContext = (): Context => ({
  photon,
})

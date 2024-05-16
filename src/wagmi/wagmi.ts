import { http, createConfig } from '@wagmi/core'
import { polygon } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http()
  },
})
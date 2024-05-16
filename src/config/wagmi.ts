import { http } from 'wagmi'
import { polygon } from 'wagmi/chains'
  import { getDefaultConfig } from '@rainbow-me/rainbowkit'


export const config = getDefaultConfig({
  appName: 'BabyLoong',
  projectId: 'YOUR_PROJECT_ID',
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
})

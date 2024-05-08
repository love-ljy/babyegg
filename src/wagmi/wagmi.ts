import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygonAmoy,polygon,bscTestnet } from 'viem/chains';


export const config = getDefaultConfig({
  appName: 'BabyLong',
  projectId: '339296f0d3af3f76bce150594097de48',
  chains: [
    // mainnet,
    // polygonAmoy,
    polygon
    // bscTestnet,
    // optimism,
    // arbitrum,
    // base,
    // zora,
    // sepolia
  ],
  ssr: true,
});
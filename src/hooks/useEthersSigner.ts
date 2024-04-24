import React from 'react'
import { useWalletClient } from 'wagmi'
import ethers from 'ethers'
import type { Account, Chain, Client, Transport } from 'viem'
// import { config } from '../wagmi/wagmi'

const bscTestnetRpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  // const network = {
  //   chainId: chain.id,
  //   name: chain.name,
  //   ensAddress: chain.contracts?.ensRegistry?.address,
  // }
  const provider = new ethers.providers.JsonRpcProvider(bscTestnetRpcUrl, {
    name: 'bsc-testnet',
    chainId: 97,
  })
  const signer = provider.getSigner(account.address)
  return signer
}

export function useEthersSigner({ chainId = 97 }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId })
  return React.useMemo(
    () => (walletClient ? clientToSigner(walletClient) : undefined),
    [walletClient]
  )
}

import { bsc } from 'wagmi/chains'
import { MainContractAddr } from '@config/contants'

interface Address {
  [chainID: number]: string
}
export const getAddress = (address: Address, chainId?: number): string => {
  const _chainId = chainId ?? bsc.id
  return address[_chainId]
}

export const getEggAddress = (chainId?: number): string => {
  return getAddress(MainContractAddr, chainId)
}

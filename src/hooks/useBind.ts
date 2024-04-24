import { useCallback, useState } from 'react'
import { useEthersSigner } from './useEthersSigner'
import { EggAbi__factory } from '../types'
import { useChainId } from 'wagmi'
import { getEggAddress } from '@utils/addressHelpers'

const useBind = () => {
  const [loading, setLoading] = useState(false)
  const signer = useEthersSigner()
  const chainId = useChainId()

  const handleBindParent = useCallback(
    async (address: string) => {
      if (chainId && signer) {
        try {
          const mintPoolAddress = getEggAddress(chainId)
          const contract = EggAbi__factory.connect(mintPoolAddress, signer)
          setLoading(true)
          const tx = await contract.bind(address)
          const receipt = await tx.wait()
          setLoading(false)
          return receipt.status
        } catch (error) {
          setLoading(false)
        }
      }
    },
    [chainId, signer]
  )

  return {
    loading,
    handleBindParent,
  }
}

export default useBind

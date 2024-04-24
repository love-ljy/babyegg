import { useCallback, useState } from 'react'
import { useEthersSigner } from './useEthersSigner'
import { EggAbi__factory } from '../types'
import eggAbi from '../config/abi/eggAbi.json'
import { useChainId } from 'wagmi'
import { getEggAddress } from '@utils/addressHelpers'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { providers } from 'ethers'

const useBind = () => {

  const [loading, setLoading] = useState(false)
  const [referAddress, setReferAddress] = useState('')
  const signer = useEthersSigner()
  console.log('signer', signer);
  
  const chainId = useChainId()
  const { data: hash, isPending, error, writeContract } = useWriteContract()

  const checkParent = useCallback(
    async (address: string) => {
      console.log('check')
      try {
        const contract = EggAbi__factory.connect('0x51703D3FA039A01Ff778E994a24AA69C9Ec398f7', signer as providers.JsonRpcSigner)
        const referAddress = await contract.referrers('0x7B041b7376f6C97d6ee27C02762907C333e1f4be')
        console.log('referAddress', referAddress)

        setReferAddress(referAddress)
      } catch (error) {
        console.log('error', error);
        
        setLoading(false)
      }
    },
    [chainId]
  )

  const handleBindParent = useCallback(
    async (address: string) => {
      // if (chainId && signer) {
      // try {
      //   const mintPoolAddress = getEggAddress(chainId)
      //   const contract = EggAbi__factory.connect(mintPoolAddress, signer)
      //   setLoading(true)
      //   const tx = await contract.bind(address)
      //   const receipt = await tx.wait()
      //   setLoading(false)
      //   return receipt.status
      // } catch (error) {
      //   setLoading(false)
      // }
      // }
    },
    [chainId]
  )

  return {
    loading,
    referAddress,
    handleBindParent,
    checkParent,
  }
}

export default useBind

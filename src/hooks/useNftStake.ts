import { erc721Abi, maxUint256 } from 'viem'
import { useState } from 'react'
import { useAccount, useReadContracts } from 'wagmi'
import useSubmitTransaction from './useSubmitTransaction'
import { NULL_ADDRESS } from '@config/contants'
import useGetBalance from '@hooks/useGetBalance'
import { toast } from 'react-toastify'
import NFTStakeABI from '@config/abi/nftStake.json'
import nftABI from '@config/abi/nft.json'
import { readContracts,simulateContract, writeContract } from '@wagmi/core'
import {ContractInterface} from 'ethers'
import {config} from '@config/wagmi'
import {NFT_STAKE_1,NFT_STAKE_2,NFT_ADDR} from '@config/contants'
import { useEffect } from 'react'

interface Options {
  
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useNftStake = () => {
  const { address } = useAccount()
  const [ApprovalForAll,setApprovalForAll] = useState<boolean[]>()
  const { userBalance } = useGetBalance()
  const enabled = Boolean(address)
 
  const callConfig = [
    {
        address: NFT_ADDR as `0x${string}`,
        abi: erc721Abi,
        functionName: 'isApprovedForAll',
        args: [address as `0x${string}`,NFT_STAKE_1] 
    },
    {
      address: NFT_ADDR as `0x${string}`,
        abi: erc721Abi,
        functionName: 'isApprovedForAll',
        args: [address as `0x${string}`,NFT_STAKE_2] 
     },
     {
      address: NFT_ADDR as `0x${string}`,
        abi:erc721Abi,
        functionName: 'balanceOf',
        args: [address as `0x${string}`, Number(BigInt(1).toString()) ] 
     }
  ]
  const fetchUserAllowance = async () => {
    const data:any = await readContracts(config,{contracts:callConfig})
    console.info(data)
    if(data){

    }
    // setApprovalForAll(allowance)
  }
  
  useEffect(() => {
    fetchUserAllowance()
  }, [])

  return {
   
  }
}

export default useNftStake

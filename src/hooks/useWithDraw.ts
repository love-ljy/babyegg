import { erc721Abi, maxUint256 } from 'viem'
import { useState } from 'react'
import { useAccount, useReadContracts } from 'wagmi'
import useSubmitTransaction from './useSubmitTransaction'
import { NULL_ADDRESS } from '@config/contants'
import useGetBalance from '@hooks/useGetBalance'
import { toast } from 'react-toastify'
import NFTStakeABI from '@config/abi/nftStake.json'
import withDrawABI from '@config/abi/withdraw.json'
import { readContracts,simulateContract, writeContract } from '@wagmi/core'
import {ContractInterface} from 'ethers'
import {config} from '@config/wagmi'
import {withDrawAddr} from '@config/contants'
import { useEffect } from 'react'

interface Options {
  
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useWithDrawBabyLong = () => {
  const { address } = useAccount()
  const [ApprovalForAll,setApprovalForAll] = useState<boolean[]>()
  const { userBalance } = useGetBalance()
  const enabled = Boolean(address)
 
  const withDrawBabyLong = async(args:any)=>{
    if(address&&args){
        // @ts-ignore
        const tx = await writeContract({
            address:withDrawAddr as `0x${string}`,
            abi:withDrawABI,
            functionName:'withdraw',
            args:[...args],
            value:BigInt(1000000)
        })
    }
    
  }
  
 

  return {
    withDrawBabyLong
  }
}

export default useWithDrawBabyLong

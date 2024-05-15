import { erc721Abi, maxUint256 } from 'viem'
import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { toast } from 'react-toastify'
import NFTStakeABI from '@config/abi/nftStake.json'
import nftABI from '@config/abi/nft.json'
import { readContracts,waitForTransactionReceipt, writeContract,sendTransaction } from '@wagmi/core'
import {ContractInterface} from 'ethers'
import {config} from '@config/wagmi'
import {NFT_STAKE_1,NFT_STAKE_2,NFT_ADDR} from '@config/contants'
import { useEffect } from 'react'

interface Options {
  
  onSuccess: () => void
  onError: (error, rawError) => void
}

type UserNft = {
  id:number
  num:number
}



const useNftStake = () => {
  const { address, isConnected } = useAccount()
  const nftUserNum = [{id:0,num:0},{id:1,num:0},{id:2,num:0},{id:3,num:0},{id:4,num:0},{id:5,num:0}]
  const [ApprovalForAll,setApprovalForAll] = useState<boolean>()
  const [ApprovalForWl,setApprovalForWl] = useState<boolean>()
  const [nftBalance,setNftBalance] = useState<UserNft[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const enabled = Boolean(address)
  const ids = [0,1,2,3,4,5]
  const accounts = ids.map(e=>`${address as `0x${string}`}`)
  const tokenids = ids.map(e=> e.toString())
  const callConfig = [
    {
        address: NFT_ADDR as `0x${string}`,
        abi: nftABI,
        functionName: 'isApprovedForAll',
        args: [address as `0x${string}`,NFT_STAKE_1] 
    },
    {
      address: NFT_ADDR as `0x${string}`,
        abi: nftABI,
        functionName: 'isApprovedForAll',
        args: [address as `0x${string}`,NFT_STAKE_2] 
     },
     {
      address: NFT_ADDR as `0x${string}`,
        abi:nftABI,
        functionName: 'balanceOfBatch',
        args: [accounts,tokenids] 
     },
     {
      // 查询用户质押0的收益
      address: NFT_STAKE_1 as `0x${string}`,
        abi:nftABI,
        functionName: 'earned',
        args: [address as `0x${string}`] 
     },
     {
      address: NFT_STAKE_2 as `0x${string}`,
        abi:nftABI,
        functionName: 'earned',
        args: [address as `0x${string}`] 
     }
  ]
  const fetchUserAllowance = async () => {
    // @ts-ignore
    const data:any = await readContracts(config,{contracts:callConfig})
    if(data){
      setApprovalForAll(data[1].result)
      setApprovalForWl(data[0].result)
      const list = data[2].result?.map((e:any,i:number)=>{return {id:i,num:Number(e?.toString())}})
      setNftBalance(list)
    }
  }
  const ApproveUserNft = async(type:number) => {
    try {
      setIsLoading(true)
      console.info(isConnected)
      const nftAddr = type===0?NFT_STAKE_1:NFT_STAKE_2
      const tx = await writeContract(config,{
        address: NFT_ADDR as `0x${string}`,
        abi: nftABI,
        functionName: 'setApprovalForAll',
        args: [nftAddr as `0x${string}`,true],
      })
       const receipt = await waitForTransactionReceipt(config,{hash:tx});
      if(receipt){
        toast.success('Approve success')
        fetchUserAllowance()
        setIsLoading(false)
        return true
      }
    } catch (error) {
      console.info(error)
    }
    
    
  }
  const StakeUserNft = async(type:number,ids:number[],nums:number[]) => {
   try {
    setIsLoading(true)
    const tx = await writeContract(config,{
      address: type===0?NFT_STAKE_1:NFT_STAKE_2 as `0x${string}`,
      abi: NFTStakeABI,
      functionName: 'stake',
      args: [ids,nums],
    })
     const receipt = await waitForTransactionReceipt(config,{hash:tx});
     if(receipt){
      toast.success('Stake success');
      fetchUserAllowance()
      setIsLoading(false)
      return true
    }
   } catch (error) {
    console.info(error)
   }
  }

  const UnStakeUserNft = async(type:number,ids:number[],nums:number[]) => {
    try {
     setIsLoading(true)
     const tx = await writeContract(config,{
       address: type===0?NFT_STAKE_1:NFT_STAKE_2 as `0x${string}`,
       abi: NFTStakeABI,
       functionName: 'unstake',
       args: [ids,nums],
     })
      const receipt = await waitForTransactionReceipt(config,{hash:tx});
      if(receipt){
       toast.success('Stake success');
       fetchUserAllowance()
       setIsLoading(false)
       return true
     }
    } catch (error) {
      console.info(error)
    }
   }
  
  useEffect(() => {
    if(address){
      fetchUserAllowance()
    }
  }, [address])

  return {
    ApprovalForAll,ApprovalForWl,nftBalance,
    StakeUserNft,
    ApproveUserNft,
    UnStakeUserNft,
    isLoading
  }
}

export default useNftStake

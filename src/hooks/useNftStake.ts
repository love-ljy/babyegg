import { erc721Abi, maxUint256 } from 'viem'
import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { toast } from 'react-toastify'
import NFTStakeABI from '@config/abi/nftStake.json'
import nftABI from '@config/abi/nft.json'
import { readContracts,waitForTransactionReceipt, writeContract,sendTransaction } from '@wagmi/core'
import goldendragon from '@imgs/goldendragon.png'
import Woodendragon from '@imgs/Woodendragon.png'
import hose from '@imgs/hose.png'
import tclong from '@imgs/tclong.jpg'
import hotdragon from '@imgs/hotdragon.png'
import earthridge from '@imgs/earthridge.png'
import {config} from '@config/wagmi'
import BigNumber from 'bignumber.js'
import {getFullDisplayBalance,getBalanceNumber} from '@utils/formatterBalance'
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
const stakeinfoList = [
  { name: 'Five Dragon', imgSrc: tclong,id:0,num:0 },
  { name: 'Golden Dragon', imgSrc: goldendragon,id:1,num:0 },
  {
    name: 'Wood Dragon',
    imgSrc: Woodendragon,
    id:2,num:0
  },
  { name: 'Water Dragon', imgSrc: hose,id:3,num:0 },
  { name: 'Fire Dragon', imgSrc: hotdragon,id:4,num:0 },
  { name: 'Earth Dragon', imgSrc: earthridge,id:5,num:0 },
]


const useNftStake = () => {
  const { address, isConnected } = useAccount()
  const nftUserNum = [{id:0,num:0},{id:1,num:0},{id:2,num:0},{id:3,num:0},{id:4,num:0},{id:5,num:0}]
  const [ApprovalForAll,setApprovalForAll] = useState<boolean>()
  const [ApprovalForWl,setApprovalForWl] = useState<boolean>()
  const [nftBalance,setNftBalance] = useState<UserNft[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [stakeList,setStakeList] = useState<any>(stakeinfoList)
  const [nftEarnedAll,setNftEarnedAll] = useState(0)
  const [nftEarnedWl,setNftEarnedWl] = useState(0)
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
      address: NFT_STAKE_1 as `0x${string}`,
        abi:NFTStakeABI,
        functionName: "earned",
        args: [address as `0x${string}`] 
     },
     {
      address: NFT_STAKE_2 as `0x${string}`,
        abi:NFTStakeABI,
        functionName: "earned",
        args: [address as `0x${string}`] 
     },
     {
      address: NFT_STAKE_1 as `0x${string}`,
        abi:NFTStakeABI,
        functionName: "nftCounts",
        args: [address as `0x${string}`,0] 
     },
     {
      address: NFT_STAKE_2 as `0x${string}`,
        abi:NFTStakeABI,
        functionName: "nftCounts",
        args: [address as `0x${string}`,1] 
     },
     {
      address: NFT_STAKE_2 as `0x${string}`,
        abi:NFTStakeABI,
        functionName: "nftCounts",
        args: [address as `0x${string}`,2] 
     },
     {
      address: NFT_STAKE_2 as `0x${string}`,
        abi:NFTStakeABI,
        functionName: "nftCounts",
        args: [address as `0x${string}`,3] 
     },
     {
      address: NFT_STAKE_2 as `0x${string}`,
        abi:NFTStakeABI,
        functionName: "nftCounts",
        args: [address as `0x${string}`,4] 
     },
     {
      address: NFT_STAKE_2 as `0x${string}`,
        abi:NFTStakeABI,
        functionName: "nftCounts",
        args: [address as `0x${string}`,5] 
     }
  ]
  const fetchUserAllowance = async () => {
   
    // @ts-ignore
    const data:any = await readContracts(config,{contracts:callConfig})
    if(data){
      setApprovalForAll(data[1].result)
      setApprovalForWl(data[0].result)
      const list = data[2].result?.map((e:any,i:number)=>{return {id:i,num:Number(e?.toString())}})
      const stakeList = data.slice(5).map((e,i)=>{
        return {
          ...stakeinfoList[i],
          num:Number(e?.result?.toString())
        }
      })
      console.info(stakeList,'stakeList')
      setStakeList(stakeList.filter(e=>e.num>0))
       // @ts-ignore
      setNftEarnedWl(getFullDisplayBalance(new BigNumber(data[3].result.toString()),18))
       // @ts-ignore
      setNftEarnedAll(getFullDisplayBalance(new BigNumber(data[4].result.toString()),18))
      setNftBalance(list)
    }
  }
  const ApproveUserNft = async(type:number) => {
    try {
      setIsLoading(true)
      console.info(isConnected)
      const nftAddr = type===0?NFT_STAKE_1:NFT_STAKE_2
       // @ts-ignore
      const tx = await writeContract(config,{
        address: NFT_ADDR as `0x${string}`,
        abi: nftABI,
        functionName: 'setApprovalForAll',
        args: [nftAddr as `0x${string}`,true],
      })
       // @ts-ignore
       const receipt = await waitForTransactionReceipt(config,{hash:tx});
      if(receipt){
        toast.success('Approve success')
        fetchUserAllowance()
        setIsLoading(false)
        return true
      }
    } catch (error) {
      console.info(error)
      toast.warn('Gas error');
      setIsLoading(false)
    }
    
    
  }
  const StakeUserNft = async(type:number,ids:number[],nums:number[]) => {
   try {
    setIsLoading(true)
     // @ts-ignore
    const tx = await writeContract(config,{
      address: type===0?NFT_STAKE_1:NFT_STAKE_2 as `0x${string}`,
      abi: NFTStakeABI,
      functionName: 'stake',
      args: [ids,nums],
    })
    console.info(tx)
     // @ts-ignore
     const receipt = await waitForTransactionReceipt(config,{hash:tx});
    console.info(receipt)
     if(receipt){
      toast.success('Stake success');
      fetchUserAllowance()
      setIsLoading(false)
      return true
    }
   } catch (error) {
    console.info(error)
    toast.warn('Gas error');
    setIsLoading(false)
   }
  }

  const HandleGetUserReward = async(type:number)=>{
    try {
      setIsLoading(true)
      const addr = type===0?NFT_STAKE_1:NFT_STAKE_2
      // @ts-ignore
      
      const tx = await writeContract(config,{
        address: addr as `0x${string}`,
        abi: NFTStakeABI,
        functionName: 'getReward',
        args: [],
      })
      // @ts-ignore
      const receipt = await waitForTransactionReceipt(config,{hash:tx});
      console.info(receipt)
      if(receipt){
        toast.success('WithDraw success');
        fetchUserAllowance()
        setIsLoading(false)
      }
    } catch (error) {
      console.info(error)}
      toast.warn('Gas error');
      setIsLoading(false)
  }

  const UnStakeUserNft = async(type:number,ids:number[],nums:number[]) => {
    try {
     setIsLoading(true)
      // @ts-ignore
     const tx = await writeContract(config,{
       address: type===0?NFT_STAKE_1:NFT_STAKE_2 as `0x${string}`,
       abi: NFTStakeABI,
       functionName: 'unstake',
       args: [ids,nums],
     })
     // @ts-ignore
      const receipt = await waitForTransactionReceipt(config,{hash:tx});
      if(receipt){
       toast.success('UnStake success');
       fetchUserAllowance()
       setIsLoading(false)
     }
    } catch (error) {
      console.info(error)
      toast.warn('Gas error');
      setIsLoading(false)
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
    isLoading,
    stakeList,
    nftEarnedWl,
    nftEarnedAll,
    HandleGetUserReward
  }
}

export default useNftStake

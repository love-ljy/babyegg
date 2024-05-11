import { erc721Abi, maxUint256 } from 'viem'
import { useAccount, useReadContracts } from 'wagmi'
import useSubmitTransaction from './useSubmitTransaction'
import { NULL_ADDRESS } from '@config/contants'
import useGetBalance from '@hooks/useGetBalance'
import { toast } from 'react-toastify'
import NFTStakeABI from '@config/abi/NFTStake.json'
import nftABI from '@config/abi/nft.json'

import {ethers} from 'ethers'

import {NFT_STAKE_1,NFT_STAKE_2,NFT_ADDR} from '@config/contants'

interface Options {
  
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useNftStake = (type:number, options?: Options) => {
  const { address } = useAccount()
  const { userBalance } = useGetBalance()
  const contractInterface = new ethers.utils.Interface(nftABI);
  const enabled = Boolean(address)
 console.info(contractInterface)
  const config = [
    {
        addressOrName: NFT_ADDR as `0x${string}`,
        contractInterface: contractInterface,
        functionName: 'isApprovedForAll',
        args: [address as `0x${string}`,NFT_STAKE_1] 
    },
    {
        addressOrName: NFT_ADDR as `0x${string}`,
        contractInterface: contractInterface,
        functionName: 'isApprovedForAll',
        args: [address as `0x${string}`,NFT_STAKE_2] 
     }
  ]
  const {
    data: isApprovedForAll,
    isLoading: isAllowanceLoading,
    error: allowanceError,
    refetch,
  } = useReadContracts({
    allowFailure: true,
    contracts: enabled ? config : [],
  })
  console.log(allowanceError,'allowanceError',isApprovedForAll)
  const {
    isLoading: isAllowing,
    estimatedGas,
    onSubmitTransaction: allowStakeNft,
  } = useSubmitTransaction(
    {
      abi: erc721Abi,
      address: NFT_ADDR,
      functionName: 'setApprovalForAll',
      args: [type===1?NFT_STAKE_1:NFT_STAKE_2, true],
      query: {
        enabled: true,
      },
    },
    {
      onSuccess() {
        toast.success('授权成功')
        userBalance.refetch()
        refetch()
      },
      onError(error, rawError) {
        console.log('stake error', rawError)
        toast.warn('授权失败')
      },
      ...options
    }
  )
  const isApprovedForAllList = isApprovedForAll as any[]
  

  return {
    isAllowanceLoading,
    isAllowing,
    isApprovedForAllList,
    allowanceError,
    refetch,
    allowStakeNft,
    approveEstimatedGas: estimatedGas,
  }
}

export default useNftStake

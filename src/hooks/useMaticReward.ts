import { useEffect, useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import useSubmitTransaction from './useSubmitTransaction'
import { NULL_ADDRESS } from '@config/contants'
import eggAbi from '@config/abi/eggAbi.json'
import { MainContractAddr, withDrawAddr } from '@config/contants'
import withdrawAbi from '@config/abi/withdraw.json'

interface Props {
  args: any[]
  gamingId: string
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useMaticReward = ({ gamingId, onError, onSuccess, args }: Props) => {
  const { address } = useAccount()
  const [maticParam, setMaticParam] = useState<any>([])

  const enabled = !!address && address !== NULL_ADDRESS && !!gamingId
  const {
    data: maticContractReward,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'userRewards',
    args: [+gamingId, address],
    query: {
      enabled,
    },
  })
  
  const contractCallParams = {
    abi: withdrawAbi,
    address: withDrawAddr,
    functionName: 'withdraw',
    args: maticParam,
    query: {
      enabled,
    },
  } as const

  const {
    isLoading: isMaticLoading,
    estimatedGas: maticDrawEstimatedGas,
    onSubmitTransaction: maticWithDraw,
  } = useSubmitTransaction(contractCallParams, {
    onError,
    onSuccess,
  })

  useEffect(() => {
    if (maticParam.length) {
      maticWithDraw()
    }
  }, [maticParam])

  return {
    isMaticLoading,
    maticContractReward,
    refetch,
    maticWithDraw,
    maticDrawEstimatedGas,
    setMaticParam,
  }
}

export default useMaticReward

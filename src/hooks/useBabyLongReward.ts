import { useEffect, useState } from 'react'
import useSubmitTransaction from './useSubmitTransaction'
import withdrawAbi from '@config/abi/withdraw.json'
import { withDrawAddr } from '@config/contants'

interface Props {
  onSuccess: () => void
  onError: (error, rawError) => void
  args?: any[]
}

const useBabyLongReward = ({ onError, onSuccess }: Props) => {
  const [babyLongParam, setBabyLongParam] = useState<any>([])

  const contractCallParams = {
    abi: withdrawAbi,
    address: withDrawAddr,
    functionName: 'withdraw',
    args: babyLongParam,
    query: {
      enable: !!babyLongParam.length,
    },
  } as const

  const {
    isLoading: isBabyLongLoading,
    estimatedGas: babyLongDrawEstimatedGas,
    onSubmitTransaction: babyLongWithdraw,
  } = useSubmitTransaction(contractCallParams, {
    onError,
    onSuccess,
  })

  useEffect(() => {
    if (babyLongParam.length) {
      babyLongWithdraw()
    }
  }, [babyLongParam])

  return {
    isBabyLongLoading,
    babyLongWithdraw,
    babyLongDrawEstimatedGas,
    babyLongParam,
    setBabyLongParam,
  }
}

export default useBabyLongReward

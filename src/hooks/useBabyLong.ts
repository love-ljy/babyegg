import useSubmitTransaction from './useSubmitTransaction'
import burnTokenAbi from '../config/abi/burnToken.json'
import { BurnContractAddr } from '../config/contants'

interface Props {
  value?: bigint
  args?: any[]
  onSuccess: () => void
  onError: (error, rawError) => void
  actualMoney?: number
}

const useBabyLong = ({ args = [], onSuccess, onError, actualMoney = 0 }: Props) => {
  const contractCallParams = {
    abi: burnTokenAbi,
    address: BurnContractAddr,
    functionName: 'deposit',
    args,
    query: {
      enabled: !!args?.length,
    },
  } as const

  const { error, isPreparing, isLoading, estimatedGas, onSubmitTransaction } = useSubmitTransaction(
    contractCallParams,
    actualMoney,
    {
      onError,
      onSuccess,
    },
  )

  return {
    isPreparing,
    error,
    estimatedGas,
    orderBabyLong: onSubmitTransaction,
    isLoading,
  }
}

export default useBabyLong

import useSubmitTransaction from './useSubmitTransaction'
import eggAbi from '../config/abi/eggAbi.json'
import { MainContractAddr } from '../config/contants'

interface Props {
  value: bigint
  args: any[]
  onSuccess: () => void
  onError: (error, rawError) => void
  actualMoney?: number
}

const useBalanceInvest = ({ value, args, onSuccess, onError, actualMoney = 0 }: Props) => {
  const contractCallParams = {
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'bind',
    args: [...args],
    value
  } as const

  const { error, isPreparing, isLoading, estimatedGas, onSubmitTransaction } = useSubmitTransaction(
    contractCallParams,
    actualMoney,
    {
      onError,
      onSuccess,
    }
  )

  return {
    isPreparing,
    error,
    estimatedGas,
    orderCreate: onSubmitTransaction,
    isLoading,
  }
}

export default useBalanceInvest

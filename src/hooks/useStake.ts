import useSubmitTransaction from './useSubmitTransaction'
import eggAbi from '../config/abi/eggAbi.json'
import { MainContractAddr } from '../config/contants'

interface Props {
  value: bigint
  onSuccess: () => void
  onError: (error, rawError) => void
  actualMoney: number
}

const useStake = ({ value, onSuccess, onError, actualMoney }: Props) => {
  const contractCallParams = {
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'stake',
    args: [],
    value,
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
    handleStake: onSubmitTransaction,
    isLoading,
  }
}

export default useStake

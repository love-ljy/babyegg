import useSubmitTransaction from './useSubmitTransaction'
import eggAbi from '../config/abi/eggAbi.json'
import { MainContractAddr } from '../config/contants'

interface Props {
  args?: any[]
  value: bigint
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useStake = ({value, onSuccess, onError }: Props) => {
  
  const contractCallParams = {
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'stake',
    args: [],
    value,
  } as const

  const { error, isPreparing, isLoading, estimatedGas, onSubmitTransaction } = useSubmitTransaction(
    contractCallParams,
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

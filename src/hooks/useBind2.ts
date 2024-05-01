import useSubmitTransaction from './useSubmitTransaction'
import eggAbi from '../config/abi/eggAbi.json'
import { MainContractAddr } from '../config/contants'

interface Props {
  args: any[]
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useBind2 = ({ args, onSuccess, onError }: Props) => {
  const contractCallParams = {
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'bind',
    args: [...args],
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
    bindParent: onSubmitTransaction,
    isLoading,
  }
}

export default useBind2

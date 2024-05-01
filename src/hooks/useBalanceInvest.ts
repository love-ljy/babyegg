import useSubmitTransaction from './useSubmitTransaction'
import burnTokenAbi from '../config/abi/burnToken.json'
import { BurnContractAddr } from '../config/contants'

interface Props {
  args?: any[]
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useBalanceInvest = ({ args = [], onSuccess, onError }: Props) => {
  const contractCallParams = {
    abi: burnTokenAbi,
    address: BurnContractAddr,
    functionName: 'deposit',
    args,
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
    orderCreate: onSubmitTransaction,
    isLoading,
  }
}

export default useBalanceInvest

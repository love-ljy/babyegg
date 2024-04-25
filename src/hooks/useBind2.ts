import useSubmitTransaction from './useSubmitTransaction'
import eggAbi from '../config/abi/eggAbi.json'
import { MainContractAddr } from '../config/contants'

const useBind2 = (bindAddress: string) => {
  const contractCallParams = {
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'bind',
    args: [bindAddress],
  } as const

  const { error, isPreparing, isLoading, estimatedGas, onSubmitTransaction } = useSubmitTransaction(
    contractCallParams,
    {
      customErrorsMap: {
        VaultDoesNotExist: "Vault doesn't exist",
        TransferFailed: 'Transfer failed',
        AlreadyPaid: "You've already paid to this vault",
      },
      onError: (errorMessage, rawError) => {},
      onSuccess: () => {},
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

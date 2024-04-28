import useSubmitTransaction from './useSubmitTransaction'
import eggAbi from '../config/abi/eggAbi.json'
import { MainContractAddr } from '../config/contants'

const useStake = () => {
  const contractCallParams = {
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'stake',
    args: [],
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
      onSuccess: (error) => {console.log('stake error', error);
      },
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

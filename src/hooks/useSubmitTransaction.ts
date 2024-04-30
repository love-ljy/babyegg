import { useEffect } from 'react'
import processViemContractError from './processViemContractError'
import {
  Abi,
  ContractFunctionArgs,
  ContractFunctionName,
  DecodeEventLogReturnType,
  TransactionReceipt,
  decodeEventLog,
  formatUnits,
} from 'viem'
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import useEstimateGas from './useEstimateGas'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectWalletInfo } from '@store/user'

const getEvents = (
  contractCallConfig: any,
  transactionReceipt: TransactionReceipt | Record<string, any>
) =>
  transactionReceipt.logs
    .map((log: any) => {
      try {
        return decodeEventLog({
          abi: contractCallConfig.abi as Abi,
          data: log.data,
          topics: (log as any).topics,
        })
      } catch {
        return null
      }
    })
    .filter(Boolean)

const useSubmitTransaction = (
  contractCallConfig: any,
  actualMoney,
  options?: {
    setContext?: boolean
    customErrorsMap?: Record<string, string>
    onSuccess?: (transactionReceipt: TransactionReceipt, events: DecodeEventLogReturnType[]) => void
    onError?: (errorMessage: string, rawError: any) => void
  }
) => {
  const { error: simulateContractError, isLoading: isSimulateContractLoading } =
    useSimulateContract({
      query: { enabled: contractCallConfig.query?.enabled ?? true },
      ...contractCallConfig,
    })
  const walletInfo = useSelector(selectWalletInfo)

  const {
    estimatedGas,
    gasEstimationError,
    isLoading: isGasEstimationLoading,
  } = useEstimateGas({
    abi: contractCallConfig.abi as Abi,
    address: contractCallConfig.address as `0x${string}`,
    functionName: contractCallConfig.functionName as ContractFunctionName,
    args: contractCallConfig.args as ContractFunctionArgs,
    value: contractCallConfig.value as bigint,
    shouldFetch: contractCallConfig.query?.enabled ?? true,
  })
  
  const {
    writeContract,
    data: hash,
    error: contractWriteError,
    isError: isContractWriteError,
    isPending: isContractWriteLoading,
    reset,
  } = useWriteContract()

  const {
    data: transactionReceipt,
    error: waitForTransactionError,
    isSuccess,
    isError: isWaitForTransactionError,
    isLoading: isWaitForTransactionLoading,
  } = useWaitForTransactionReceipt({ hash })

  const rawError =
    waitForTransactionError || contractWriteError || simulateContractError || gasEstimationError
  const error = processViemContractError(rawError, (errorName: any) => {
    if (!options?.customErrorsMap || !(errorName in options.customErrorsMap))
      return `Contract error: ${errorName}`
    return options.customErrorsMap[errorName]
  })

  const isError = isContractWriteError || isWaitForTransactionError
  const { onSuccess, onError } = options ?? {}

  useEffect(() => {
    if (!transactionReceipt && !isSuccess && !isError) return

    if (transactionReceipt && isSuccess) {
      if (typeof onSuccess === 'function') {
        const events = getEvents(contractCallConfig, transactionReceipt)

        onSuccess(
          transactionReceipt as TransactionReceipt,
          events as unknown as DecodeEventLogReturnType[]
        )
      }
    }

    if (error) {
      onError?.(error, rawError)
      reset()
    }
  }, [transactionReceipt, isSuccess, isError])

  return {
    onSubmitTransaction: async (args:any = []) => {
      console.log('args', args);
      
      if (!writeContract && error) {
        onError?.(error, rawError)
        return
      }
      console.log('estimatedGas', estimatedGas);
      
      const estimatedGasInFloat = estimatedGas
        ? parseFloat(formatUnits(estimatedGas, walletInfo?.decimals))
        : null
        console.log('contractCallConfig', contractCallConfig);
      if (!estimatedGasInFloat) {
        toast.warn("Couldn't estimate gas")
        onError?.(error, rawError)
        return
      }
      if (actualMoney + estimatedGasInFloat > walletInfo?.balance) {
        toast.warn('Insufficient balance for gas')
        onError?.(error, rawError)
        return
      }

      writeContract({
        ...contractCallConfig,
        args
      })
    },
    isPreparing: isSimulateContractLoading || isGasEstimationLoading,
    isLoading: isWaitForTransactionLoading || isContractWriteLoading,
    estimatedGas,
    error,
  }
}

export default useSubmitTransaction

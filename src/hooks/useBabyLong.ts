import useSubmitTransaction from './useSubmitTransaction'
import burnTokenAbi from '../config/abi/burnToken.json'
import { BurnContractAddr } from '../config/contants'
import { useEffect, useState, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { NULL_ADDRESS } from '@config/contants'
import { formatUnits } from 'viem'
import { useSelector } from 'react-redux'
import { selectWalletInfo } from '@store/user'
import { toast } from 'react-toastify'

interface Props {
  onSuccess: () => void
  onError: (error, rawError) => void
  mutationError: (error?) => void
}

const useBabyLong = ({ onSuccess, onError, mutationError }: Props) => {
  const [babyArgs, setBabyArgs] = useState<any>([])
  const { address } = useAccount()
  const walletInfo: any = useSelector(selectWalletInfo)
  const enabled = !!address && address !== NULL_ADDRESS && !!babyArgs.length

  const contractCallParams = {
    abi: burnTokenAbi,
    address: BurnContractAddr,
    functionName: 'deposit',
    args: babyArgs,
    query: {
      enabled: enabled,
    },
  } as const

  const { error, isPreparing, isLoading, estimatedGas, onSubmitTransaction } = useSubmitTransaction(
    contractCallParams,
    {
      onError,
      onSuccess,
      mutationError,
    }
  )

  const doContract = useCallback(() => {
    if (babyArgs.length && estimatedGas) {
      const estimatedGasInFloat = estimatedGas
        ? parseFloat(formatUnits(estimatedGas, walletInfo?.decimals))
        : null
      if (!estimatedGasInFloat) {
        toast.warn("Couldn't estimate gas")
        mutationError()
        return
      }
      if (estimatedGasInFloat > walletInfo?.balance) {
        toast.warn('Insufficient balance for gas')
        mutationError()
        return
      }
      onSubmitTransaction()
    }
  }, [babyArgs, estimatedGas])

  useEffect(() => {
    doContract()
  }, [doContract])

  return {
    isPreparing,
    error,
    estimatedGas,
    orderBabyLong: onSubmitTransaction,
    isLoading,
    setBabyArgs,
  }
}

export default useBabyLong

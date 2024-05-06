import { useEffect, useState, useCallback } from 'react'
import useSubmitTransaction from './useSubmitTransaction'
import withdrawAbi from '@config/abi/withdraw.json'
import { withDrawAddr } from '@config/contants'
import { toast } from 'react-toastify'
import { formatUnits } from 'viem'
import { useSelector } from 'react-redux'
import { selectWalletInfo } from '@store/user'
import { useAccount } from 'wagmi'
import { NULL_ADDRESS } from '@config/contants'

interface Props {
  onSuccess: () => void
  onError: (error, rawError) => void
  args?: any[]
  mutationError: (error?) => void
}

const useBabyLongReward = ({ mutationError, onError, onSuccess }: Props) => {
  const { address } = useAccount()
  const [babyLongParam, setBabyLongParam] = useState<any>([])
  const walletInfo: any = useSelector(selectWalletInfo)

  const enabled = !!address && address !== NULL_ADDRESS && !!babyLongParam.length

  const contractCallParams = {
    abi: withdrawAbi,
    address: withDrawAddr,
    functionName: 'withdraw',
    args: babyLongParam,
    query: {
      enabled,
    },
  } as const

  const {
    isLoading: isBabyLongLoading,
    estimatedGas,
    onSubmitTransaction,
  } = useSubmitTransaction(contractCallParams, {
    onError,
    onSuccess,
    mutationError,
  })

  const doContract = useCallback(() => {
    if (babyLongParam.length && estimatedGas) {
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
  }, [babyLongParam, estimatedGas])

  useEffect(() => {
    doContract()
  }, [doContract])

  return {
    isBabyLongLoading,
    babyLongParam,
    setBabyLongParam,
  }
}

export default useBabyLongReward

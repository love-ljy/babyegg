import { useEffect, useState, useCallback } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import useSubmitTransaction from './useSubmitTransaction'
import { NULL_ADDRESS } from '@config/contants'
import eggAbi from '@config/abi/eggAbi.json'
import { MainContractAddr, withDrawAddr } from '@config/contants'
import withdrawAbi from '@config/abi/withdraw.json'
import { toast } from 'react-toastify'
import { formatUnits } from 'viem'
import { useSelector } from 'react-redux'
import { selectWalletInfo } from '@store/user'
interface Props {
  args: any[]
  onSuccess: () => void
  onError: (error, rawError) => void
  mutationError: (error?) => void
}

const useMaticReward = ({ mutationError, onError, onSuccess, args }: Props) => {
  const { address } = useAccount()
  const [maticParam, setMaticParam] = useState<any>([])
  const walletInfo: any = useSelector(selectWalletInfo)

  const enabled = !!address && address !== NULL_ADDRESS && !!args.length
  const withDrawEnabled = !!address && address !== NULL_ADDRESS && !!maticParam.length
  const {
    data: maticContractReward,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'userRewards',
    args: [...args, address],
    query: {
      enabled,
    },
  })

  const contractCallParams = {
    abi: withdrawAbi,
    address: withDrawAddr,
    functionName: 'withdraw',
    args: maticParam,
    query: {
      enabled: withDrawEnabled,
    },
  } as const

  const {
    isLoading: isMaticLoading,
    estimatedGas,
    onSubmitTransaction,
  } = useSubmitTransaction(contractCallParams, {
    onError,
    onSuccess,
    mutationError
  })

  const doContract = useCallback(() => {
    if (maticParam.length && estimatedGas) {
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
  }, [maticParam, estimatedGas])

  useEffect(() => {
    doContract()
  }, [doContract])

  return {
    isMaticLoading,
    maticContractReward,
    refetch,
    setMaticParam,
  }
}

export default useMaticReward

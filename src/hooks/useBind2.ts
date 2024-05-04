import { useBalance, useAccount, useReadContract } from 'wagmi'
import useSubmitTransaction from './useSubmitTransaction'
import eggAbi from '../config/abi/eggAbi.json'
import { MainContractAddr } from '../config/contants'
import { NULL_ADDRESS } from '@config/contants'

interface Props {
  args: any[]
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useBind2 = ({ args, onSuccess, onError }: Props) => {
  const { address } = useAccount()
  const enabled = !!address && address !== NULL_ADDRESS && !!args[0]
  const contractCallParams = {
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'bind',
    args: [...args],
    query: {
      enabled,
    },
  } as const

  const { refetch } = useReadContract({
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'referrers',
    args: [address as `0x${string}`],
    query: {
      enabled: false,
    },
  })
  
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
    refetch
  }
}

export default useBind2

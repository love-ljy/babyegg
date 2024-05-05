import { erc20Abi, maxUint256 } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import useSubmitTransaction from './useSubmitTransaction'
import { NULL_ADDRESS } from '@config/contants'
import useGetBalance from '@hooks/useGetBalance'
import { toast } from 'react-toastify'

interface Options {
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useAllowance = (tokenAddress: `0x${string}`, contract: `0x${string}`, options?: Options) => {
  const { address } = useAccount()
  const { userBalance } = useGetBalance()

  const enabled = Boolean(tokenAddress && tokenAddress !== NULL_ADDRESS && contract)
  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    error: allowanceError,
    refetch,
  } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'allowance',
    args: [address as `0x${string}`, contract],
    query: {
      enabled: enabled,
    },
  })
  const {
    isLoading: isAllowing,
    estimatedGas,
    onSubmitTransaction: allowSpendingTokens,
  } = useSubmitTransaction(
    {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'approve',
      args: [contract, maxUint256],
      query: {
        enabled: true,
      },
    },
    {
      onSuccess() {
        toast.success('授权成功')
        userBalance.refetch()
        refetch()
      },
      onError(error, rawError) {
        console.log('stake error', rawError)
        toast.warn('授权失败')
      },
      ...options
    }
  )

  return {
    isAllowanceLoading,
    isAllowing,
    allowance,
    allowanceError,
    refetch,
    allowSpendingTokens,
    approveEstimatedGas: estimatedGas,
  }
}

export default useAllowance

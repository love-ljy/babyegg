import { erc20Abi, maxUint256 } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import useSubmitTransaction from './useSubmitTransaction'
import { NULL_ADDRESS } from '@config/contants'

const useAllowance = (tokenAddress: `0x${string}`, contract: `0x${string}`, flag?: boolean) => {
  const { address, chainId } = useAccount()
  
  const enabled = Boolean(tokenAddress && tokenAddress !== NULL_ADDRESS)
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
      enabled,
    },
  })



  const { isLoading: isAllowing, onSubmitTransaction: allowSpendingTokens } = useSubmitTransaction(
    {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'approve',
      args: [contract, maxUint256],
      query: {
        enabled: Boolean(tokenAddress && tokenAddress !== NULL_ADDRESS && flag),
      },
    },
    {
      setContext: false,
      onError: (error: any) => {},
      onSuccess: () => refetch(),
    }
  )

  return {
    isAllowanceLoading,
    isAllowing,
    allowance,
    allowanceError,
    refetch,
    allowSpendingTokens,
  }
}

export default useAllowance

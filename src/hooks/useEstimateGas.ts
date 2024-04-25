import useSWR from 'swr'
import { EstimateContractGasParameters, formatUnits } from 'viem'
import { useChainId, useGasPrice, usePublicClient, useWalletClient } from 'wagmi'

const useEstimateGas = (config: EstimateContractGasParameters & { shouldFetch?: boolean }) => {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const chainId = useChainId()

  const { data: gasPrice, isLoading: isGasPriceLoading, error: gasPriceError } = useGasPrice()

  const estimateGas = () =>
    publicClient?.estimateContractGas({
      ...config,
      account: walletClient?.account,
    })

  const {
    data: estimatedGas,
    error: estimateGasError,
    isLoading: isEstimateGasLoading,
    mutate,
  } = useSWR(
    !!walletClient?.account && !!config?.shouldFetch
      ? ['estimateGas', config.address, config.functionName, config.args?.toString(), chainId]
      : null,
    estimateGas
  )

  return {
    estimatedGas:
      typeof estimatedGas === 'bigint' && typeof gasPrice === 'bigint'
        ? estimatedGas * gasPrice
        : undefined,
    gasEstimationError: estimateGasError ?? gasPriceError,
    isLoading: isGasPriceLoading || isEstimateGasLoading,
    mutate,
  }
}

export default useEstimateGas

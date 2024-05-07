import { useAccount } from 'wagmi'
import useSubmitTransaction from './useSubmitTransaction'
import { NULL_ADDRESS } from '@config/contants'
import eggAbi from '@config/abi/eggAbi.json'
import { MainContractAddr } from '@config/contants'

interface Props {
  args: any[]
  onSuccess: () => void
  onError: (error, rawError) => void
}

const useMaticWithdraw = ({ onError, onSuccess, args }: Props) => {
  const { address } = useAccount()
  const enabled = !!address && address !== NULL_ADDRESS

  const contractCallParams = {
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'withdrawReward',
    args,
    query: {
      enabled,
    },
  } as const

  const {
    isLoading: isMaticWithdrawLoading,
    estimatedGas: maticEstimateGas,
    onSubmitTransaction: maticWithdraw,
  } = useSubmitTransaction(contractCallParams, {
    onError,
    onSuccess,
  })

  return {
    isMaticWithdrawLoading,
    maticWithdraw,
    maticEstimateGas,
  }
}

export default useMaticWithdraw

import { useEffect } from 'react'
import { useBalance, useAccount,useReadContract } from 'wagmi'
import { dispatch } from '@store/index'
import { setWalletInfo } from '@store/user'
import eggAbi from '@config/abi/eggAbi.json'
import {MainContractAddr} from '@config/contants'


const useGetBalance = () => {
  const account = useAccount()
  const userBalance = useBalance({
    address: account.address,
    query: {
      enabled: !!account.address,
    },
  })
  const {
    data: parentAddr,
    isLoading: isAllowanceLoading,
    error: allowanceError,
    refetch,
  } = useReadContract({
    abi: eggAbi,
    address: MainContractAddr,
    functionName: 'referrers',
    args: [account.address as `0x${string}`],
    query: {
      enabled:!!account.address
    },
  })

  useEffect(() => {
    if (userBalance && userBalance.data?.formatted) {
      dispatch(
        setWalletInfo({
          balance: +userBalance.data.formatted,
          decimals: userBalance.data?.decimals,
          symbol: userBalance.data?.symbol,
        })
      )
    }
  }, [userBalance?.data?.formatted])

  return {
    userBalance,
    parentAddr
  }
}

export default useGetBalance

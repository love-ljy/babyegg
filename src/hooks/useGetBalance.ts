import { useEffect } from 'react'
import { useBalance, useAccount } from 'wagmi'
import { dispatch } from '@store/index'
import { setWalletInfo } from '@store/user'

const useGetBalance = () => {
  const account = useAccount()
  const userBalance = useBalance({
    address: account.address,
    query: {
      enabled: !!account.address,
    },
  })

  useEffect(() => {
    if (userBalance && userBalance.data?.formatted) {
      dispatch(
        setWalletInfo({
          balance: (+userBalance.data.formatted),
          decimals: userBalance.data?.decimals,
          symbol: userBalance.data?.symbol,
        })
      )
    }
  }, [userBalance?.data?.formatted])

  return {
    userBalance,
  }
}

export default useGetBalance

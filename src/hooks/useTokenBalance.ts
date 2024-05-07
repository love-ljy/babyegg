import { useEffect, useState } from 'react'
import { erc20Abi } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import { NULL_ADDRESS } from '@config/contants'
import { getBalanceNumber } from '@utils/formatterBalance'
import BigNumber from 'bignumber.js'

const useTokenBalance = (tokenAddress: `0x${string}`) => {
  const { address } = useAccount()
  const [tokenBalance, setTokenBalance] = useState(0)
  const enabled = Boolean(tokenAddress && tokenAddress !== NULL_ADDRESS && address)
  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: enabled,
    },
  })


  useEffect(() => {
    if (balance) {
      const formattedBalance = getBalanceNumber(new BigNumber(balance.toString()), 18)
      setTokenBalance(formattedBalance)
    } else {
      setTokenBalance(0)
    }
  }, [balance])

  return {
    balance,
    formatBalance: tokenBalance,
  }
}

export default useTokenBalance

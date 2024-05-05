import { useEffect,useState } from 'react'
import { erc20Abi, maxUint256 } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import { NULL_ADDRESS } from '@config/contants'
import {getFullDisplayBalance} from '@utils/formatterBalance'
import BigNumber from 'bignumber.js'
import { dispatch } from '@store/index'
import { setWalletInfo } from '@store/user'

const useTokenBalance = (tokenAddress: `0x${string}`) => {
  const { address } = useAccount()
  const [tokenBalance,setTokenBalance] = useState('')  
  const enabled = Boolean(tokenAddress && tokenAddress !== NULL_ADDRESS &&address)
  const {
    data: balance,
  } = useReadContract({
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
        const formattedBalance = getFullDisplayBalance(new BigNumber(balance.toString()), 18, 2);
        setTokenBalance(formattedBalance)
    }
  }, [balance])

  return {
    balance,
    formatBalance:tokenBalance
  }
}

export default useTokenBalance

import { useEffect, useState } from 'react'
import { erc20Abi } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import { NULL_ADDRESS } from '@config/contants'
import { getBalanceNumber } from '@utils/formatterBalance'
import BigNumber from 'bignumber.js'
import {config} from '@config/wagmi'
import { readContract,simulateContract, writeContract } from '@wagmi/core'

const useTokenBalance = (tokenAddress: `0x${string}`) => {
  const { address } = useAccount()
  const [tokenBalance, setTokenBalance] = useState(0)
  const enabled = Boolean(tokenAddress && tokenAddress !== NULL_ADDRESS && address)


  const fetchTokenBalance = async()=>{
    try {
        // @ts-ignore
      const balance = await readContract(config,{
        abi: erc20Abi,
        address: tokenAddress,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      })

      if (balance) {
  
        const formattedBalance = getBalanceNumber(new BigNumber(balance.toString()), 18)
        setTokenBalance(formattedBalance)
      } else {
        setTokenBalance(0)
      }
    } catch (error) {
      setTokenBalance(0)
    }
   
  }

  useEffect(() => {
   if(address){
    fetchTokenBalance()
   }
  }, [address])

  return {
    tokenBalance,
    formatBalance: tokenBalance,
  }
}

export default useTokenBalance

import { useEffect,useState } from 'react'
import { useBalance, useAccount } from 'wagmi'
import { dispatch } from '@store/index'
import { setWalletInfo } from '@store/user'
import { readContract } from '@wagmi/core'
import {config} from '@config/wagmi'
import eggAbi from '@config/abi/eggAbi.json'
import { MainContractAddr } from '@config/contants'
import {getFullDisplayBalanceString} from '@utils/formatterBalance'

const useGetBalance = (ids?:number[]) => {
  const account = useAccount()
  const [userReward,setUserReward] = useState(0)
  const userBalance = useBalance({
    address: account.address,
    query: {
      enabled: !!account.address,
    },
  })

  const fetchUserRewards = async(ids:any)=>{
    if(!ids.length) return
    // @ts-ignore
    const res = await readContract(config,{
      address:MainContractAddr,
      abi: eggAbi,
      functionName: 'getUserRewards',
      args: [account.address,ids]
    })
    const rewards = res as bigint[]
  const totalSum = rewards?.reduce((acc, current) => acc + current, BigInt(0));
  setUserReward(Number(totalSum))
  }

  useEffect(() => {
    if (userBalance && userBalance.data?.formatted) {
      dispatch(
        setWalletInfo({
          balance: +userBalance.data.formatted,
          decimals: userBalance.data?.decimals,
          symbol: userBalance.data?.symbol,
        })
      )
      if(ids){
        console.info(ids,'--')
        fetchUserRewards(ids)
      }
    }
  }, [userBalance?.data?.formatted])

  return {
    userBalance,
    userMaticReward:getFullDisplayBalanceString(String(userReward),18),
  }
}

export default useGetBalance

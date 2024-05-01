import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { getUserHadParent,submitUserLogin } from '@utils/api'
import { useConnect, useAccount } from 'wagmi'
import md5 from 'md5'
import { toast } from 'react-toastify'
import {  setUserInfo } from '@store/user'
import { dispatch } from '@store/index'
import { setAuthToken } from '@utils/request'

const GetInvateContext = React.createContext({ userParent: '', changeToken: (value: string) => { } })

interface Props {
    children: React.ReactNode
}

const GetInvateContextProvider: React.FC<Props> = ({ children }) => {
    const [invite, setInvite] = useState<any>()
    const [userParent, setUserParent] = useState('')
    const router = useRouter();
    const {invite:queryParam} = router.query;
    const { isConnected, address } = useAccount();
    const inviteCode = queryParam?.[0] || 'BABYLONG';
    const fetchUserParent = async () => {
        try {
            if (inviteCode) {
                try {
                  const res:any = await getUserHadParent({username:address,invite:inviteCode})
                  if (res.code === 0) {
                    setUserParent(res.data.username)
                  }else{
                    window.localStorage.setItem("invite", '');
                  }
                } catch (error) {
                  window.localStorage.setItem("invite", '');
                }

            } else {
                setUserParent('')
            }
        } catch (error) {
            console.info(error)
            window.localStorage.setItem("invite", '');
        }
    }
    const userLogin = async (invite: string) => {
        try {
          const res: any = await submitUserLogin({
            password: md5(md5(address + 'babyloong') + 'babyloong'),
            username: address||'',
            invite,
          })
          if (res.code === 0) {
            setAuthToken(res.data.Token)
            localStorage.setItem('token', res.data.Token)
            dispatch(setUserInfo({ token: res.data.Token }))
          } else {
            toast.warn('网络错误')
          }
        } catch (e) {
          console.log('e', e)
          toast.warn('网络错误')
        }
      }

    const changeToken = (value: string) => {
       
    }
      useEffect(()=>{
        console.info(isConnected)
        if(address){
            userLogin(inviteCode)
            fetchUserParent()
        }else{
            toast.warn('请链接钱包')
        }

      },[inviteCode,isConnected])

    return <GetInvateContext.Provider value={{ userParent, changeToken }}>{children}</GetInvateContext.Provider>
}

export { GetInvateContext, GetInvateContextProvider }

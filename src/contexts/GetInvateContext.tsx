import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { getUserHadParent } from '@utils/api'
import { useBalance, useAccount } from 'wagmi'

const GetInvateContext = React.createContext({ userParent: '', changeToken: (value: string) => { } })

interface Props {
    children: React.ReactNode
}

const GetInvateContextProvider: React.FC<Props> = ({ children }) => {
    const [invite, setInvite] = useState<any>()
    const [userParent, setUserParent] = useState('')
    const router = useRouter();
    const queryParam = router.query;
    const account = useAccount()
    const inviteCode = queryParam?.[0] || 'BABYLONG';
    const fetchUserParent = async () => {
        try {
            if (inviteCode) {
                try {
                  const res:any = await getUserHadParent({username:account.address,invite:inviteCode})
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


    const changeToken = (value: string) => {
       
    }
      useEffect(()=>{
        if(account.address){
            fetchUserParent()
        }

      },[inviteCode,account.address])

    return <GetInvateContext.Provider value={{ userParent, changeToken }}>{children}</GetInvateContext.Provider>
}

export { GetInvateContext, GetInvateContextProvider }

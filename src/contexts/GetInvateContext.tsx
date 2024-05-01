import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Router, { useRouter } from 'next/router'
import { getUserHadParent,submitUserLogin,getUserInfo } from '@utils/api'
import { useConnect, useAccount } from 'wagmi'
import md5 from 'md5'
import { toast } from 'react-toastify'
import {  setUserInfo } from '@store/user'
import { dispatch } from '@store/index'

let globalToken: string | null = null;  // 添加一个全局变量来存储 token

export const getToken = () => {
  return globalToken;  // 提供一个函数来获取当前 token
};
type AuthContextType = {
    token: string | null;
    userParent: string;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
  };
const GetInvateContext = React.createContext<AuthContextType>({token:'' ,userParent: '', setToken: () => { },isAuthenticated:false })


interface Props {
    children: React.ReactNode
}

const GetInvateContextProvider: React.FC<Props> = ({ children }) => {
    const [inviteCode, setInviteCode] = useState<any>('BABYLONG')
    const [token, setToken] = useState<string | null>(globalToken);
    const [userParent, setUserParent] = useState('')
    const router = useRouter();
    const {invite:queryParam} = router.query;
    const { isConnected, address } = useAccount();
    
    const fetchUserParent = async () => {
        try {
            const res:any = await getUserHadParent({username:address,invite:inviteCode})
            if (res.code === 0) {
              setUserParent(res.data.username)
            }else{
              window.localStorage.setItem("invite", '');
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
            setToken(res.data.Token)
            globalToken = res.data.Token; 
            localStorage.setItem('token', res.data.Token || '');
            dispatch(setUserInfo({ token: res.data.Token, }))
          } else {
            toast.warn('网络错误')
          }
        } catch (e) {
          console.log('e', e)
          toast.warn('网络错误')
        }
      }
      useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);

      const isAuthenticated = token !== null;

     const fetchLoginUserInfo = async()=>{
        const res:any = await getUserInfo()
        if(res.code===0){
            dispatch(setUserInfo(res.data))
        }
     } 
    const changeToken = (value: string) => {
       
    }
      useEffect(()=>{
        if(queryParam){
            setInviteCode(queryParam)
        }
        if(queryParam||address){
            userLogin(inviteCode)
            fetchLoginUserInfo()
            fetchUserParent()
        }
        

      },[inviteCode,address,isConnected,queryParam])

    return <GetInvateContext.Provider value={{token, userParent,setToken, isAuthenticated }}>{children}</GetInvateContext.Provider>
}

export { GetInvateContext, GetInvateContextProvider }


export const useAuth = () => {
    const context = useContext(GetInvateContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
import React, {  useContext, useState, useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router'
import { getUserHadParent,submitUserLogin,getUserInfo } from '@utils/api'
import {  useAccount } from 'wagmi'
import md5 from 'md5'
import { toast } from 'react-toastify'
import {  setUserInfo,setAuthToken,selectAuthToken,setInviteCode,selectInviteCode } from '@store/user'
import { useSelector } from 'react-redux'
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
const GetInvateContext = React.createContext<AuthContextType>({token:'' ,userParent: '', setToken: (token) => { globalToken=token},isAuthenticated:false })


interface Props {
    children: React.ReactNode
}

const GetInvateContextProvider: React.FC<Props> = ({ children }) => {
    const inviteCode = useSelector(selectInviteCode)
    const authToken = useSelector(selectAuthToken)
    const [token, setToken] = useState<string | null>(globalToken);
    const [userParent, setUserParent] = useState('')
    const router = useRouter();
    
    const {invite} = router.query;
    console.info(router.query,'router.query')
    const {  address } = useAccount();
    const fetchUserParent = useCallback(async () => {
        try {
          
            const res:any = await getUserHadParent({username:address,invite:router.query.invite})
            if (res.code === 0&&res.data.had_parent===0) {
              setUserParent(res.data.username)
            }else{
              window.localStorage.setItem("invite", '');
            }
        } catch (error) {
            console.info(error)
            window.localStorage.setItem("invite", '');
        }
    },[address,token,invite])
       

    
    const userLogin = useCallback(async (invite: string) => {
        try {
          const res: any = await submitUserLogin({
            password: md5(md5(address + 'babyloong') + 'babyloong'),
            username: address||'',
            invite,
          })
          if (res.code === 0) {
            
            setToken(res.data.Token)
            globalToken = res.data.Token; 
            dispatch(setAuthToken(res.data.Token))
            window.localStorage.setItem('token', res.data.Token || '');
            dispatch(setUserInfo({ token: res.data.Token, }))
            await  fetchLoginUserInfo()
          } else {
            toast.warn('网络错误')
          }
        } catch (e) {
          console.log('e', e)
          toast.warn('网络错误')
        }
      }, [address,token])
      useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(authToken?authToken:storedToken);
          globalToken = storedToken;
      }, [token,authToken]);

      const isAuthenticated = token !== null;

     const fetchLoginUserInfo = async()=>{
        const res:any = await getUserInfo()
        if(res.code===0){
            dispatch(setUserInfo(res.data))
        }
     } 
      useEffect(()=>{
        if(router.isReady){
          if(invite){
            dispatch(setInviteCode(invite||'BABYLONG'))
            setInviteCode(invite)
        }
        if(address){
          
            userLogin(inviteCode)
            fetchUserParent()
        }
        }
       
      },[address,router.isReady])

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
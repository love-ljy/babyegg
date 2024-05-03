import React, {  useContext, useState, useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router'
import { getUserHadParent,submitUserLogin,getUserInfo } from '@utils/api'
import {  useAccount } from 'wagmi'
import md5 from 'md5'
import { toast } from 'react-toastify'
import {  setUserInfo,setAuthToken,selectAuthToken,selectIsBindParent,setIsBindParent,setInviteCode,selectInviteCode } from '@store/user'
import { useSelector } from 'react-redux'
import { dispatch } from '@store/index'


/**
 * 1.先调用后端api（hadparent）的判断上级邀请码  是否展示上级信息，1就不展示，0就展示弹窗并确认。
2.再调用登陆接口 
3.获取登陆用户信息
4.根据用户信息里的上级地址，查询合约接口上级地址   看看是否与用户信息的上级地址一致
5.不一致就调用合约绑定上级
 * 
 */

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
    const isBindParent = useSelector(selectIsBindParent)
    const {invite} = router.query;
    console.info(router.query,'router.query')
    const {  address } = useAccount();
    const fetchUserParent = useCallback(async () => {
        try {
          
            const res:any = await getUserHadParent({username:address,invite:router.query.invite})
            if (res.code === 0&&res.data.had_parent===0) {
              setUserParent(res.data.username)
              dispatch(setIsBindParent(false))
            }else{
              dispatch(setIsBindParent(true))
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
      // useEffect(()=>{
      //   if(router.isReady){
      //     if(invite){
      //       dispatch(setInviteCode(invite||'BABYLONG'))
      //       setInviteCode(invite)
      //   }
      //   if(address){
      //       fetchUserParent()
      //       if(isBindParent){
      //           userLogin(inviteCode)
      //       }
      //     }
      //   }
       
      // },[address,router.isReady,isBindParent])

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
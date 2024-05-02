import Home from './home'
import {useEffect} from 'react'
import {useAccount} from 'wagmi'
import  {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from '../../next-i18next.config.js'
export default function Index() {
  const {address} = useAccount()
  useEffect(()=>{
    if(address){
      (window as any).location.reload()
    }
  },[address])
  return <Home />
}


export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['common'],
      nextI18NextConfig
    )),
  },
})
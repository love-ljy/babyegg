import React, { useContext,useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import themes from '../themes/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Buffer } from 'buffer'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../createEmotionCache'
import { config } from '../wagmi/wagmi'
import { useRouter } from 'next/router';
import { polygonAmoy, polygon, bscTestnet } from 'viem/chains'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import Layout from '../components/Layout'
import {GetInvateContextProvider,GetInvateContext}from '../contexts/GetInvateContext'
import { ToastContainer } from 'react-toastify'
import store from '@store/index'
import {  setUserInfo,setAuthToken,selectAuthToken,setInviteCode,selectInviteCode } from '@store/user'
import 'react-toastify/dist/ReactToastify.css'
import '@rainbow-me/rainbowkit/styles.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/globals.css'

globalThis.Buffer = Buffer

const queryClient = new QueryClient()
// 客户端的 Emotion 缓存实例


const clientSideEmotionCache = createEmotionCache()
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { token } = useContext(GetInvateContext)
  const router = useRouter();
  useEffect(() => { 
    const handleRouteChange = () => {
      // 清空 store 的逻辑
      // 这里你可以调用你的 store 清空状态的 action
    // store.dispatch(setAuthToken(''));
      console.log('路由变化，清空 store');
    };

    // 监听路由变化
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      // 移除监听
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
       
        <WagmiProvider config={config}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#3ae27d',
              accentColorForeground: '#0C0E0E',
              borderRadius: 'small',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            initialChain={bscTestnet}
          >
            <GetInvateContextProvider>
            <CacheProvider value={clientSideEmotionCache}> 
              <ThemeProvider theme={themes}>
                <ToastContainer theme="dark" />
                <CssBaseline />
                <Layout>
                  <div>
                    <Component {...pageProps} />
                  </div>
                </Layout>
              </ThemeProvider>
            </CacheProvider>
            </GetInvateContextProvider>
          </RainbowKitProvider>
        </WagmiProvider>
       
      </QueryClientProvider>
    </Provider>
  )
}

export default appWithTranslation(MyApp,nextI18NextConfig) ;

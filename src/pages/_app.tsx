import React, { Suspense } from 'react';
import { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import themes from '../themes/index';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";
import { config } from "../wagmi/wagmi";
import Layout from "../components/Layout";
import "@rainbow-me/rainbowkit/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/globals.css';

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();
// 客户端的 Emotion 缓存实例
const clientSideEmotionCache = createEmotionCache();
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>

      <WagmiProvider config={config}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#3ae27d",
            accentColorForeground: "#0C0E0E",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <CacheProvider value={clientSideEmotionCache}>
              <ThemeProvider theme={themes}>
                <CssBaseline />
                <Layout>
                  <div>
                    <Component {...pageProps} />
                  </div>
                </Layout>
              </ThemeProvider>
          </CacheProvider>
        </RainbowKitProvider>
      </WagmiProvider>

    </QueryClientProvider>
  );
}

export default MyApp;

import React, { Suspense } from 'react';
import { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import themes from './themes';
import 'themes/styles.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { config } from "./wagmi/wagmi";
import Layout from "./components/Layout";
import "@rainbow-me/rainbowkit/styles.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();
// 客户端的 Emotion 缓存实例
const clientSideEmotionCache = createEmotionCache();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themes}>
        <CssBaseline />
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
              <Suspense>
                <Layout>
                  <div>
                    <Component {...pageProps} />
                  </div>
                </Layout>
              </Suspense>
            </CacheProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

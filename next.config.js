const { i18n } = require('./next-i18next.config')

const isDev = process.env.NODE_ENV === 'development'
/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: false,
  i18n,
  swcMinify: true, // 开启 SWC 编译器来提升构建性能
  generateEtags: false,
  experimental: {
    // 开启 React 18 特性支持
    // reactRoot: true,
    // concurrentFeatures: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '',
  env: {
    BASE_PATH: '',
    IS_PROD: process.env.IS_PROD,
    RPC_URL: process.env.RPC_URL,
    EXPLORER_HOST: process.env.EXPLORER_HOST,
    SERVER_HOST: process.env.SERVER_HOST,
  },
  distDir: 'out',
  webpack(config) {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/,
        resourceQuery: { not: /url/ },
        issuer: { not: /\.(css|scss|sass)$/ },
        use: [{ loader: '@svgr/webpack', options: { ref: true } }],
      }
    )
    return config
  },
  async rewrites() {
    if (isDev) {
      return [
        {
          source: '/api/:path*',
          destination: `https://test.babyloong.mpiswap.cn/api/:path*`,
        },
      ]
    }
    return [
      {
        source: '/api/:path*',
        destination: `https://test.babyloong.mpiswap.cn/api/:path*`,
      },
    ]
  },
}

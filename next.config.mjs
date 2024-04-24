/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
// const basePath = process.env.BASE_PATH || "";
// console.log("env", process.env.NODE_ENV);

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // 开启 SWC 编译器来提升构建性能
  experimental: {
    // 开启 React 18 特性支持
    reactRoot: true,
    concurrentFeatures: true,
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
    SERVER_HOST: process.env.SERVER_HOST
  },
  webpack(config) {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
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
        use: [{ loader: "@svgr/webpack", options: { ref: true } }],
      }
    );
    return config;
  },
};
if (isDev) {
  nextConfig.rewrites = async () => {
    return [
      {
        source: "/api/:path*",
        destination: `http://13.112.138.221:9999/api/:path*`,
      },
    ];
  };
} else {
  nextConfig.output = "export";
}

export default nextConfig;

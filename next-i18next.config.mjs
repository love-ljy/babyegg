// next-i18next.config.mjs
import path from 'path';

const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
    localePath: path.resolve('./public/locales')
  },
  fallbackLng: {
    default: ['zh'],
  },
};

export default nextI18NextConfig;

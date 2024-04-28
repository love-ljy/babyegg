// next-i18next.config.mjs
import path from 'path';

const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localePath: path.resolve('./public/locales')
  },
};

export default nextI18NextConfig;

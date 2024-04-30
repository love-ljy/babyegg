// next-i18next.config.mjs
import path from 'path';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export default {
  use: [initReactI18next, LanguageDetector],
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
  },
  localePath: path.resolve('./public/locales')
};

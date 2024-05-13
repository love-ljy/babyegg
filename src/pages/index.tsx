import { useCallback, useEffect } from 'react'
import Home from './home'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../../next-i18next.config.js'


export default function Index() {



  return <Home />
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
})

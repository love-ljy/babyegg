import { useCallback, useEffect } from 'react'
import Home from './home'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../../next-i18next.config.js'
import { infoByAddress } from '@utils/api'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { setIsWhitelistedUser } from '@store/user'
import { dispatch } from '@store/index'

export default function Index() {
  const { address } = useAccount()

  const fetchInfoByAddress = useCallback(async () => {
    if (address) {
      try {
        const res: any = await infoByAddress({
          address
        })
        if (res.code === 0) {
          dispatch(setIsWhitelistedUser(res.data.is_whitelisted_user))
        } else {
          toast.warn(res.msg)
          dispatch(setIsWhitelistedUser(false))
        }
      } catch (e) {
        console.log('fetchInfoByAddress error', e)
        toast.warn('网络错误')
        dispatch(setIsWhitelistedUser(false))
      }
    }
  }, [address])

  useEffect(() => {
    fetchInfoByAddress()
  }, [fetchInfoByAddress])

  return <Home />
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
})

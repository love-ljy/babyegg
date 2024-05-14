import React, { useState, useEffect, useCallback } from 'react'
import styles from './bazaar.module.css'
import Image from 'next/image'
import babyloong from '@imgs/babyloong.png'
import { whitelistedUserList, incomeReceive } from '@utils/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { toast } from 'react-toastify'
import chehui from '@imgs/chehui.png'
import { useTranslation } from 'next-i18next'
import nextI18NextConfig from '../../../next-i18next.config.js'
import { useSelector } from 'react-redux'
import { selectAuthToken } from '@store/user'
import { BabyToken } from '@config/contants'
import useBabyLongReward from '@hooks/useBabyLongReward'
import useGetBalance from '@hooks/useGetBalance'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

const NftBazaar: React.FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter();
  const [state, setState] = useState<any>({})
  const [btnThirtyLoading, setBtnThirtyLoading] = useState(false)
  const [btnSevenTyLoading, setBtnSevenTyLoading] = useState(false)
  const [cardList, setCardList] = useState<any[]>([
    {
      type: 'none',
      title: 'you have $BabyLoong awaiting collection',
      number: 0,
    },
    {
      type: '30',
      title: '30% Available amount',
      number: 0,
    },
    {
      type: '70',
      title: '70% Only receive it after activation',
      number: 0,
    },
  ])

  const token = useSelector(selectAuthToken)
  const { userBalance } = useGetBalance()
  const { address } = useAccount()
  const { isBabyLongLoading, setBabyLongParam } = useBabyLongReward({
    onSuccess() {
      toast.success('提取成功')
      userBalance.refetch()
      setBabyLongParam([])
      fetchUserInfo()
      setBtnThirtyLoading(false)
      setBtnSevenTyLoading(false)
    },
    onError(error, rawError) {
      console.log('thirty babyLongWithdraw rawError', rawError)
      toast.warn('提取失败')
      setBabyLongParam([])
      fetchUserInfo()
      setBtnThirtyLoading(false)
      setBtnSevenTyLoading(false)
    },
    mutationError() {
      setBabyLongParam([])
      setBtnThirtyLoading(false)
      setBtnSevenTyLoading(false)
    },
  })

  const goToEgg = () => {
    router.push('egg');
  }

  const handleClick = (item) => {
    if(!token){
      toast.warn('请先登录')
    }
    if (item.type === '30') {
      handleThirty(item)
    } else {
      handleSeventy(item)
    }
  }

  const handleThirty = async (item) => {
    if (!address) {
      toast.warn('请链接钱包')
      return
    }
    if (item.number === 0) {
      toast.warn('提现额度为0')
      return
    }
    try {
      setBtnThirtyLoading(true)
      const res: any = await incomeReceive({
        type: 10,
        coin_type: 1,
      })
      if (res.code === 0) {
        const { oid, token_amount, _deadline, _fee, v, r, s } = res.data
        setBabyLongParam([BabyToken, token_amount, +_deadline, +oid, _fee, +v, r, s])
      } else {
        toast.warn(res.msg)
        setBtnThirtyLoading(false)
      }
    } catch (e) {
      console.log('baby withdraw error', e)
      toast.warn('网络错误')
      setBtnThirtyLoading(false)
    }
  }

  const handleSeventy = async (item) => {
    if (!address) {
      toast.warn('请链接钱包')
      return
    }
    if (!state.is_it_activated) {
      toast.warn('请先激活')
      return
    }
    if (item.number === 0) {
      toast.warn('提现额度为0')
      return
    }
    try {
      setBtnSevenTyLoading(true)
      const res: any = await incomeReceive({
        type: 11,
        coin_type: 1,
      })
      if (res.code === 0) {
        const { oid, token_amount, _deadline, _fee, v, r, s } = res.data
        setBabyLongParam([BabyToken, token_amount, +_deadline, +oid, _fee, +v, r, s])
      } else {
        toast.warn(res.msg)
        setBtnSevenTyLoading(false)
      }
    } catch (e) {
      console.log('baby withdraw error', e)
      toast.warn('网络错误')
      setBtnSevenTyLoading(false)
    }
  }

  const fetchUserInfo = useCallback(async () => {
    console.log('prod');
    
    if (token || address) {
      try {
        const res: any = await whitelistedUserList({
          address
        })
        if (res.code === 0) {
          setState(res.data)
          let list = cardList.map((item, index) => {
            return {
              ...item,
              ...{
                number: index === 0 ? res.data.number : index === 1 ? res.data.thirty_percent : res.data.seventy_percent
              }
            }
          })
          setCardList(list)
        } else {
          toast.warn('网络错误')
        }
      } catch (e) {
        console.log('e', e)
        toast.warn('网络错误')
      }
    }
  }, [token, address])

  useEffect(() => {
    fetchUserInfo()
  }, [fetchUserInfo])

  return (
    <div className={styles.container}>
     
      <div className={styles.title}>{t('WhiteList')}</div>
      <div className={styles.card}>
        {cardList &&
          cardList.map((item, index) => (
            <div className={styles.card_item} key={index}>
              <div className={styles.card_item_title}>{t(item.title)}</div>
              <div className={styles.card_item_bottom}>
                <div className={styles.card_item_input}>
                  <div className={styles.card_item_content}>
                    <Image width={18} height={18} src={babyloong} alt="babyloong" />
                    <div className={styles.card_item_value}>{item.number}</div>
                    <div className={styles.card_item_tips}>≈ {state.matic} MATIC</div>
                  </div>
                </div>
                {index > 0 ? <div className={styles.card_item_buttom} onClick={() => handleClick(item)}>
                  {index !== 2 && (index === 1 && btnThirtyLoading && isBabyLongLoading ? t('Loading') : t('Get'))}
                  {index !== 1 && (index === 2 && btnSevenTyLoading && isBabyLongLoading ? t('Loading') : t('Get'))}
                </div> : <></>}
              </div>
            </div>
          ))}
      </div>
      {!state.is_it_activated && (
        <div className={styles.second_card}>
          <div className={styles.second_card_top}>
            <div className={styles.second_card_title}>{t('Double dragon eggs for first activation')}</div>
            <span className={styles.second_card_tips}>({t('Only valid for the first activation')})</span>
          </div>
          <div className={styles.second_card_button} onClick={goToEgg}>{t('activate now')}</div>
        </div>
      )}

     
    </div>
  )
}

export default NftBazaar
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
})

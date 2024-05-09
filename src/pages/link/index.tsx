import React, { useState, useEffect, useCallback } from 'react'
import styles from './bazaar.module.css'
import Image from 'next/image'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import babyloong from '@imgs/babyloong.png'
import { whitelistedUserList, getUserInfo } from '@utils/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { toast } from 'react-toastify'
import chehui from '@imgs/chehui.png'
import { useTranslation } from 'next-i18next'
import nextI18NextConfig from '../../../next-i18next.config.js'
const NftBazaar: React.FC = () => {
  const { t } = useTranslation('common')
  const [state, setState] = useState<any>({})
  const [cardList, setCardList] = useState<any[]>([
    {
      title: 'you have $BabyLoong awaiting collection',
      number: 0,
    },
    {
      title: '30% Available amount',
      number: 0,
    },
    {
      title: '70% Only receive it after activation',
      number: 0,
    },
  ])
  //
  const fetchUserInfo = useCallback(async () => {
    try {
      const res: any = await whitelistedUserList()
      if (res.code === 0) {
        console.log(res, 'res')
        setState(res.data)
        let list = cardList.map((item,index)=>{
          return{
            ...item,
            ...{
              number:index === 0?res.data.number:index === 1?res.data.thirty_percent_type:res.data.seventy_percent_type
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
  }, [])
  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.rectangle}></div>
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
                {index > 0 ? <div className={styles.card_item_buttom}>{t('Get')}</div> : <></>}
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
          <div className={styles.second_card_button}>{t('activate now')}</div>
        </div>
      )}

      <div className={styles.back}>
        <Image src={chehui} alt="1" width={20} height={18} className={styles.withdraw_icon}></Image>
        <div className={styles.go_back}>{t('Go Back')}</div>
      </div>
    </div>
  )
}

export default NftBazaar
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
})

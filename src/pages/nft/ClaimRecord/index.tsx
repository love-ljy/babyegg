// ClaimRecord.js

import React, { useCallback, useEffect, useState } from 'react'
import styles from './ClaimRecord.module.css'
import { history } from '@utils/api'
import Image from 'next/image'
import chehui from '@imgs/chehui.png'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
function ClaimRecord() {
  const { t } = useTranslation('common')
  const [claimData, setClaimData] = useState<
    { created_at: string; number: number; state: string }[]
  >([])
  // 初始化一个状态来存储领取记录数据
  const fetchUserInfo = useCallback(async () => {
    try {
      const res: any = await history({
        state: -2,
        type: 1,
        page: 1,
        limit: 10,
      })
      if (res.code === 0) {
        setClaimData(res.data.list)
        console.log(res.data, 'res')
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
      <div className={styles.padding_box}>
        <div className={styles.title}>
          <div className={styles.title_left}> {t('Claim record')}</div>
        </div>
        {claimData.length > 0 &&
          claimData.map((record, index) => (
            <div className={styles.content_root} key={index}>
              <div className={styles.content}>
                <div className={styles.root}>
                  <div className={styles.item}>
                    <div className={styles.item_left}>{t('draw time')}</div>
                    <div className={styles.item_right}>{record.created_at}</div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.item_left}>{t('Quantity claimed')}</div>
                    <div className={styles.item_right}>{record.number}</div>
                  </div>
                  {/* <div className={styles.item}>
                  <div className={styles.item_left}>领取类型</div>
                  <div className={styles.item_right}>{record.}</div>
                </div> */}
                  <div className={styles.item}>
                    <div className={styles.item_left}>{t('Claim status')}</div>
                    <div className={styles.item_right}>{record.state}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className={styles.withdraw}>
          <Image
            src={chehui}
            alt="1"
            width={20}
            height={18}
            className={styles.withdraw_icon}
          ></Image>
          {t('Withdraw')}
        </div>
      </div>
    </div>
  )
}

export default ClaimRecord

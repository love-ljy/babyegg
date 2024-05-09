// pledge.js
import React, { useState, useEffect, useCallback } from 'react'
import styles from './pledge.module.css'
import { getUserInfo, pledgeList } from '@utils/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Image from 'next/image'
import chehui from '@imgs/chehui.png'
function Pledge() {
  const [pledgeData, setPledgeData] = useState<any>({}) // 初始化一个状态来存储质押列表数据
  const router = useRouter() // 将 useRouter 移动到组件顶部
  // 点击按钮跳转到新路由
  const handleClick = () => {
    router.push('/nft/ClaimRecord')
  }
  const fetchUserInfo = useCallback(async () => {
    try {
      const res: any = await pledgeList({
        page: 1,
        limit: 10,
      })
      if (res.code === 0) {
        setPledgeData(res.data) // 将获取的数据存储到状态中
        console.log(res.data, 'res')
      } else {
        toast.warn('网络错误/未登录')
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
    }
  }, [])
  useEffect(() => {
    fetchUserInfo()
  }, [])
  //已获得总收益
  const firstPledge = pledgeData || {}
  return (
    <div className={styles.container}>
      <div className={styles.padding_box}>
        <div className={styles.title}>
          <div className={styles.title_left}>质押列表</div>
          <div className={styles.title_right} onClick={handleClick}>
            {/* 加跳转 */}
            领取记录&gt;
          </div>
        </div>
        <div className={styles.padding_box} style={{ paddingTop: '0px' }}>
          <div className={styles.ispledge_box}>
            <div className={styles.ispledge_title}>
              <div className={styles.redeemable}>可领取收益</div>
              <div className={styles.number}>{firstPledge.total_revenue}</div>
            </div>
            <div className={styles.bottom}>确认领取</div>
          </div>
        </div>
        <div className={styles.ispledge_box}>
          <div className={styles.ispledge_title}>
            <div className={styles.redeemable}>可赎回本金</div>
            <div className={styles.number}>1,000.00 USDT</div>
          </div>
          <div className={styles.bottom}>{firstPledge.state}</div>
        </div>
      </div>

      <div className={styles.withdraw}>
        <Image src={chehui} alt="1" width={20} height={18} className={styles.withdraw_icon}></Image>
        撤回
      </div>
    </div>
  )
}

export default Pledge

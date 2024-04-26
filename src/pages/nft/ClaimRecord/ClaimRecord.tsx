// ClaimRecord.js

import React from 'react'
import styles from './ClaimRecord.module.css'

function ClaimRecord() {
  return (
    <div className={styles.container}>
      <div className={styles.padding_box}>
        <div className={styles.title}>
          <div className={styles.title_left}>领取记录</div>
        </div>
        <div className={styles.content_root}>
          <div className={styles.content}>
            <div className={styles.root}>
              <div className={styles.item}>
                <div className={styles.item_left}>领取时间</div>
                <div className={styles.item_right}>12/04/2024</div>
              </div>
              <div className={styles.item}>
                <div className={styles.item_left}>领取数量</div>
                <div className={styles.item_right}>10 USDT</div>
              </div>
              <div className={styles.item}>
                <div className={styles.item_left}>领取类型</div>
                <div className={styles.item_right}>本金赎回</div>
              </div>
              <div className={styles.item}>
                <div className={styles.item_left}>领取类型</div>
                <div className={styles.item_right}>成功</div>
              </div>
            </div>
          </div>
          {/* 重复的content内容省略 */}
        </div>
        <div className={styles.withdraw}>
          {/* <img className={styles.withdraw_icon} src={require('../../static/icon/chehui.png')}></img>
          撤回 */}
        </div>
      </div>
    </div>
  )
}

export default ClaimRecord

// pledge.js
import React from 'react'
import styles from './pledge.module.css'

function Pledge() {
  return (
    <div className={styles.container}>
      <div className={styles.padding_box}>
        <div className={styles.title}>
          <div className={styles.title_left}>赎回</div>
          <div className={styles.title_right}>
            {/* 加跳转 */}
            领取记录&gt;
          </div>
        </div>
        <div className={styles.ispledge_box}>
          <div className={styles.ispledge_title}>
            <div className={styles.redeemable}>可赎回本金</div>
            <div className={styles.number}>1,000.00 USDT</div>
          </div>
          <div className={styles.bottom}>确认赎回</div>
        </div>
      </div>
      <div className={styles.padding_box} style={{ paddingTop: '0px' }}>
        <div className={styles.ispledge_box}>
          <div className={styles.ispledge_title}>
            <div className={styles.redeemable}>可赎回本金</div>
            <div className={styles.number}>1,000.00 USDT</div>
          </div>
          <div className={styles.bottom}>可赎回本金</div>
        </div>
      </div>
      <div className={styles.withdraw}>
        {/* <img className={styles.withdraw_icon} src={require('../../static/icon/chehui.png')}></img>
        撤回 */}
      </div>
    </div>
  )
}

export default Pledge

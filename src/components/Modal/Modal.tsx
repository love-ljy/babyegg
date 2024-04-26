import React, { FC } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string // 将 title 属性改为可选的
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title }) => {
  const handleClose = () => {
    onClose() // 在关闭时调用 onClose 函数
  }

  return (
    <>
      {isOpen && (
        <div className={styles['modal-overlay']} onClick={handleClose}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.fl}>
              <div className={styles['modal-header']}>
                <img
                  className={styles['modal-header-img']}
                  src={require('../../static/images/tclong.jpg')}
                  alt="Description"
                />
              </div>
              <div className={styles['modal-center']}>
                <div className={styles.center}>
                  <div className={styles.box}>
                    <div className={styles['box_title']}>NFT名称</div>
                    <div className={styles['box_text']}>Five Element</div>
                  </div>
                  <div className={styles.box}>
                    <div className={styles['box_title']}>质押进度</div>
                    <div className={styles['box_text']}>******</div>
                  </div>
                </div>
                <div className={styles.center}>
                  <div className={styles.box}>
                    <div className={styles['box_title']}>NFT名称</div>
                    <div className={styles['box_text']}>Five Element</div>
                  </div>
                  <div className={styles.box}>
                    <div className={styles['box_title']}>质押进度</div>
                    <div className={styles['box_text']}>******</div>
                  </div>
                </div>
              </div>
              <div className={styles['modal-footer']}>领取奖励</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal

import React, { FC } from 'react'
import styles from './Modal.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import nextI18NextConfig from '../../../next-i18next.config.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  nft?: any // 修改 nft 属性为对象类型
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, nft }) => {
  const { t } = useTranslation('common')
  const router = useRouter() // 将 useRouter 移动到组件顶部
  const handleClose = () => {
    onClose() // 在关闭时调用 onClose 函数
  }
  // 点击按钮跳转到新路由
  const handleClick = () => {
    router.push('/nft/pledge')
  }
  return (
    <>
      {isOpen && (
        <div className={styles['modal-overlay']} onClick={handleClose}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.fl}>
              <div className={styles['modal-header']}>
                <Image src={nft.imgSrc} width={322} height={322} alt=""></Image>
              </div>
              <div className={styles['modal-center']}>
                <div className={styles.center}>
                  <div className={styles.box}>
                    <div className={styles['box_title']}>{t('NFT name')}</div>
                    <div className={styles['box_text']}>{nft ? t(nft.name) : ''}</div>
                  </div>
                </div>
              </div>
              <div onClick={handleClick} className={styles['modal-footer']}>
                {t('Pledges')}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
})

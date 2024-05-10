import React, { useState, useEffect, useCallback } from 'react'
import styles from './bazaar.module.css'
import Modal from '../../components/Modal/Modal'
import Image from 'next/image'
import goldendragon from '@imgs/goldendragon.png'
import Woodendragon from '@imgs/Woodendragon.png'
import hose from '@imgs/hose.png'
import hotdragon from '@imgs/hotdragon.png'
import earthridge from '@imgs/earthridge.png'
import { getUserInfo, nftList } from '@utils/api'
import { toast } from 'react-toastify'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { config } from '../../wagmi/wagmi'
import abi from './abi.json'
import { useTranslation } from 'next-i18next'
import nextI18NextConfig from '../../../next-i18next.config.js'
const NftBazaar: React.FC = () => {
  const { t } = useTranslation('common')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedNft, setSelectedNft] = useState<any>(null) // 用于存储选中的NFT信息
  const LevelList = [
    { name: 'Golden Dragon', imgSrc: goldendragon },
    {
      name: 'Wood Dragon',
      imgSrc: Woodendragon,
    },
    { name: 'Water Dragon', imgSrc: hose },
    { name: 'Fire Dragon', imgSrc: hotdragon },
    { name: 'Earth Dragon', imgSrc: earthridge },
  ]
  const closeModal = () => {
    setModalOpen(false)
  }
  const openModal = (item: any) => {
    setSelectedNft(item) // 设置选中的NFT信息
    setModalOpen(true)
  }
  //
  const fetchUserInfo = useCallback(async () => {
    try {
      const res: any = await nftList({
        page: 1,
        limit: 10,
      })
      if (res.code === 0) {
        console.log(res, 'res')
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
      <div className={styles.box}>
        <div>
          <div className={styles.title}>{t('NFT market')}</div>
        </div>
        <div className={styles.fl}>
          {LevelList.map((item, index) => (
            <div className={styles.container_list} key={index}>
              <div>
                <div>
                  <div
                    className={styles.list}
                    onClick={() => openModal(item)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.list_item}>
                      <div className={styles.list_item_title}>
                        <Image src={item.imgSrc} alt="egg" />
                      </div>
                      <div className={styles.nft_name}>{t('NFT name')}</div>
                      <div className={styles.nfg_itemName}>{t(item.name)}</div>
                      <div className={styles.pledge}>{t('Pledges')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} nft={selectedNft}></Modal>
    </div>
  )
}

export default NftBazaar
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
})

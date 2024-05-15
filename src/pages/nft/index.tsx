import React, { useState, useEffect, useCallback } from 'react'
import styles from './bazaar.module.css'
import Modal from '../../components/Modal/Modal'
import Image from 'next/image'
import goldendragon from '@imgs/goldendragon.png'
import Woodendragon from '@imgs/Woodendragon.png'
import hose from '@imgs/hose.png'
import tclong from '@imgs/tclong.jpg'
import hotdragon from '@imgs/hotdragon.png'
import earthridge from '@imgs/earthridge.png'
import { getUserInfo, nftList } from '@utils/api'
import { toast } from 'react-toastify'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useNftStake from '@hooks/useNftStake'
import { useTranslation } from 'next-i18next'
import nextI18NextConfig from '../../../next-i18next.config.js'
const NftBazaar: React.FC = () => {
  const { t } = useTranslation('common')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [type, setType] = useState<number>(1)
  const {ApprovalForAll,ApprovalForWl,nftBalance,ApproveUserNft} =  useNftStake()
  const [userNfts, setUserNfts] = useState<any>([])
  const [selectedNft, setSelectedNft] = useState<any>(null) // 用于存储选中的NFT信息
  const LevelList = [
    { name: 'Five Dragon', imgSrc: tclong,id:0,num:0 },
    { name: 'Golden Dragon', imgSrc: goldendragon,id:1,num:0 },
    {
      name: 'Wood Dragon',
      imgSrc: Woodendragon,
      id:2,num:0
    },
    { name: 'Water Dragon', imgSrc: hose,id:3,num:0 },
    { name: 'Fire Dragon', imgSrc: hotdragon,id:4,num:0 },
    { name: 'Earth Dragon', imgSrc: earthridge,id:5,num:0 },
  ]
 
  useEffect(()=>{
    const mergeArraysById = (array1, array2) => {
      const map = new Map();

      array1?.forEach(item => {
        map.set(item.id, { ...item });
      });

      array2.forEach(item => {
        if (map.has(item.id)) {
          map.set(item.id, { ...map.get(item.id), ...item });
        } else {
          map.set(item.id, { ...item });
        }
      });

      return Array.from(map.values());
    };

    const merged = mergeArraysById(nftBalance, LevelList);
    setUserNfts(merged)
    console.info(merged,ApprovalForAll,ApprovalForWl)
  },[nftBalance])
  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = async(item: any,index:number) => {
    
   if(index===0){
    if(ApprovalForWl){
      await ApproveUserNft(0);
     }else{
       setSelectedNft(item) // 设置选中的NFT信息
       setModalOpen(true)
     }
   }else{
    if(!ApprovalForAll){
      await ApproveUserNft(1);
     }else{
       setSelectedNft(item) // 设置选中的NFT信息
       setModalOpen(true)
     }
   }
  }




  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
          <div className={styles.title}>{t('NFT market')}</div>
        </div>
        <div className={styles.fl}>
          {userNfts?.map((item, index) => (
            <div className={styles.container_list} key={index}>
              <div>
                <div>
                  <div
                    className={styles.list}
                    onClick={() => openModal(item,index)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.list_item}>
                      <div className={styles.list_item_title}>
                        <Image src={item.imgSrc} alt="egg" />
                      </div>
                      <div className={styles.nft_name}>{t('NFT name')} {t(item.name)}</div>
                      <div className={styles.nfg_itemName}>{t('Balance')}:{item.num}</div>
                     {index===0&& <div className={styles.pledge}>{t(!ApprovalForWl?'APPROVE':'Pledges')}</div>}
                     {index>0&& <div className={styles.pledge}>{t(!ApprovalForAll?'APPROVE':'Pledges')}</div>}
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

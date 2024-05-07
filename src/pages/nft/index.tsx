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
import { config } from '../../wagmi/wagmi'
import abi from './abi.json'

const NftBazaar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedNft, setSelectedNft] = useState<any>(null) // 用于存储选中的NFT信息
  const LevelList = [
    { name: '金龙', imgSrc: goldendragon },
    {
      name: '木龙',

      imgSrc: Woodendragon,
    },
    { name: '水龙', imgSrc: hose },
    { name: '火龙', imgSrc: hotdragon },
    { name: '土龙', imgSrc: earthridge },
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
          <div className={styles.title}>NFT市场</div>
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
                      <div className={styles.nft_name}>NFT名称</div>
                      <div className={styles.nfg_itemName}>{item.name}</div>
                      <div className={styles.pledge}>质押</div>
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

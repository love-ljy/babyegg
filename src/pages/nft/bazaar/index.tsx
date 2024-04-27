import React, { useState } from 'react'
import styles from './bazaar.module.css'
import Modal from '../../../components/Modal/Modal'

const NftBazaar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
          <div className={styles.title}>NFT市场</div>
        </div>
        <div className={styles.container_list}>
          <div className={styles.list}>
            <div className={styles.list_item}>
              <div className={styles.list_item_title}>
                <div className={styles.list_item_cross}></div>
              </div>
              <div className={styles.nft_name}>NFT名称</div>
              <div className={styles.nfg_itemName}>金龙</div>
              <div className={styles.new}>新增</div>
            </div>
          </div>
          <div>
            <div>
              <div
                className={styles.list}
                onClick={() => setModalOpen(true)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.list_item}>
                  <div className={styles.list_item_title}></div>
                  <div className={styles.nft_name}>NFT名称</div>
                  <div className={styles.nfg_itemName}>金龙</div>
                  <div className={styles.pledge}>质押</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}></Modal>
    </div>
  )
}

export default NftBazaar

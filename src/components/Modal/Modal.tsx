import React, { FC,useState } from 'react'
import styles from './Modal.module.css'
import Image from 'next/image'
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Box,Typography,Button} from '@mui/material'
import { useTranslation } from 'next-i18next'
import nextI18NextConfig from '../../../next-i18next.config.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Label } from '@mui/icons-material';
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (type: number, num: number) => void
  nft?: any // 修改 nft 属性为对象类型
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, nft, onConfirm }) => {
  const { t } = useTranslation('common')
 const [nftNum,setNftNum]=useState(0)
  const handleClose = () => {
    onClose() // 在关闭时调用 onClose 函数
  }
  const HandleInputNftNum =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBuyNum = Number(event.target.value);
    setNftNum(newBuyNum)
  }
  // 点击按钮跳转到新路由
  const handleClick = () => {
    if(nftNum>0){
      onConfirm(nft.id, nftNum)
      setNftNum(0)
    }
    
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
                   <div className={styles.box}>
                   <div className={styles['box_title']}>{t('NFT name')}:</div>
                    <div className={styles['box_text']}>{nft ? t(nft.name) : ''}</div>
                   </div>
                   
                  </div>
                 
                </div>
               
              </div>
              <Box width="88%" m={2}>
              <form noValidate style={{width:'100%'}} autoComplete="off">
                  <FormControl sx={{ width: '100%' }}>
                    
                    <div className={styles.box}>
                    <div className={styles['box_title']}><Typography mb={1} textAlign="left">请输入质押数量</Typography></div>
                    <div className={styles['box_text']}>{t('Balance')}:{nft ? nft.num : ''}</div>
                    </div>
                    <OutlinedInput onChange={HandleInputNftNum} value={nftNum} sx={{border:'1px solid #fff',color:'#fff'}} placeholder="输入质押数量" />
                  </FormControl>
                </form>
                <Button sx={{marginTop:'20px'}} onClick={handleClick} fullWidth disabled={Number(nftNum)<=0||Number(nftNum)>Number(nft.num)} >
                {t('Pledges')}
              </Button>
              </Box>
            
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

// pledge.js
import React, { useState, useEffect, useCallback } from 'react'
import styles from './pledge.module.css'
import { Button, Box,Typography,Stack } from '@mui/material'
import Image from 'next/image'
import EggTokenIcon from '@icons/eggToken.svg'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useNftStake from '@hooks/useNftStake'
import nextI18NextConfig from '../../../../next-i18next.config.js'
import Loading from '@components/Loading'

interface PledgeProps{
  confrimUnstake:(type:number,ids:number[],num:number[])=>void
  confirmGetReward:(type:number)=>void
  nftEarnedAll:number
  nftEarnedWl:number
  stakeList:any[]
}
  const Pledge: React.FC<PledgeProps> = ({nftEarnedAll,nftEarnedWl,stakeList,confrimUnstake,confirmGetReward}) => {
  const { t } = useTranslation('common')

 const HandleUnstake = async(item)=>{
  const type = item.id==0?0:1
  await confrimUnstake(type,[item.id],[item.num])
 }

  return (
    <div className={styles.container}>
      <div className={styles.padding_box}>
     
        <div className={styles.padding_box} style={{ paddingTop: '0px' }}>
          <div className={styles.ispledge_box}>
            <div className={styles.ispledge_title}>
              <div className={styles.redeemable}>{t('Five Dragon')}{t('Available income')}</div>
              <div className={styles.number}>{nftEarnedWl} <EggTokenIcon/></div>
            </div>
            <Button  onClick={()=>{confirmGetReward(0)}} disabled={Number(nftEarnedWl)===0} sx={{margin:'20px 0'}} fullWidth>{t('Confirmed collection')}</Button>
            <div className={styles.ispledge_title}>
              <div className={styles.redeemable}>{t('Others')}{t('Available income')}</div>
              <div className={styles.number}>{nftEarnedAll} <EggTokenIcon/></div>
            </div>
            <Button onClick={()=>{confirmGetReward(1)}} disabled={Number(nftEarnedAll)===0} sx={{margin:'20px 0'}} fullWidth>{t('Confirmed collection')}</Button>
          </div>
          
        </div>
        <div className={styles.ispledge_box}>
          <Typography>{t('Pledge list')}</Typography>
        {stakeList.length>0&&stakeList.map((item,index)=>{
          return(
            <Box my={2}>
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Stack flexDirection="row" gap={1}>
                  <Image src={item.imgSrc} alt="chehui" width={40} height={40} />
                  <Box>
                    <Typography textAlign="left">{t(item.name)}  #{item.id}</Typography>
                    <Typography textAlign="left">{t('Amount')} : {item.num}</Typography>
                  </Box>
                </Stack>
              </Box>
              <Button onClick={()=>{HandleUnstake(item)}} sx={{height:'30px'}}>{t('UnStake')}</Button>
            </Stack>
           </Box>
          )
        })}
        </div>
      </div>
    </div>
  )
}

export default Pledge
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
})
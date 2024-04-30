import { useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { getState } from '@store/index'
import rankBgPng from '@imgs/rankBg.png'
import CommonTab from '../commonTab/commonTab'
import CommonModal from 'src/pages/egg/components/commonModal/commonModal'
import EggTokenIcon from '@icons/eggToken.svg'
import { useTranslation } from 'next-i18next'
import VIP4 from '@imgs/3000.png'

const MarketWrap = styled.div`
  .top {
    position: relative;
    height: 80px;
    .bg {
    
      height: 80px;
      opacity: 1;
      background: radial-gradient(
        41.14% 82.88% at 46% 100%,
        rgba(210, 9, 172, 1) 41.36%,
        rgba(210, 9, 172, 0) 100%
      );
    }
    .title {
      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      font-size: 25px;
      .icon {
        position: absolute;
        right: 0;
        top: 3px;
      }
    }
  }
  .tab {
    margin-top: 4px;
    height: 500px;
  }
`
const DialogMain = styled.div`
  /* height: 600px; */
  /* max-height: 400px; */
  text-align: left;
  /* padding-bottom: 10px; */
`
const DialogFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0;
  width: 99px;
  height: 29px;
  border-radius: 39px;
  background: rgba(135, 135, 135, 1);
  padding: 6px 20px 6px 20px;
  img {
    margin-right: 20px;
  }
`
const DialogTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0;
  width: 99px;
  height: 29px;
  border-radius: 39px;
  padding: 6px 20px 6px 20px;
  margin-bottom: 10px;
  img {
    margin-right: 40px;
  }
  span {
    font-size: 25px;
  }
`
const RankMain = styled.div`
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  border: 1px solid rgba(246, 26, 126, 1);
  box-shadow: inset 0px 0px 12.1px rgba(246, 26, 126, 1);
  padding: 25px 17px 25px 17px;
  .row {
    display: flex;
  }
  .row:nth-child(1) {
    margin-right: 10px;
  }
`
const RankItem = styled.div`
  border-radius: 5px;
  background: rgba(0, 0, 0, 1);
  border: 1px solid rgba(246, 26, 126, 1);
  padding: 6px 13px 6px 13px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  &.special::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%);
    pointer-events: none;
    z-index: 1000;
  }
  img {
    position: absolute;
    top: -22px;
    right: -30px;
  }
  &:nth-child(2) {
    margin-left: 10px;
  }
  .countIcon {
    display: flex;
    align-items: center;
    span {
      margin-right: 20px;
      &.big {
        font-size: 30px;
      }
    }
  }
  .second {
    font-size: 13px;
    font-weight: 900;
    text-align: left;
    color: rgba(246, 26, 126, 1);
  }
  .third {
    font-size: 10px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    text-align: left;
  }
`

const LastWrap = styled.div`
  margin-top: 10px;
  display: flex;
  min-height: 480px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  /* border: 1px solid rgba(143, 13, 245, 1); */
  /* box-shadow: inset 0px 0px 12.1px rgba(143, 13, 245, 1); */
  /* padding: 25px 30px 25px; */
  position: relative;
`

const Column = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  background: rgba(22, 34, 54, 1);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  padding: 2px;
  .No {
    flex: 1 6%;
    text-align: center;
  }
  .address {
    flex: 1 40%;
    text-align: center;
  }
  .amount {
    flex: 1 20%;
    text-align: center;
  }
  .time {
    flex: 1 20%;
    text-align: center;
  }
`
const MyRank = styled.div`
opacity: 1;
background: rgba(22, 34, 54, 1);
display: flex;
justify-content: space-between;
align-items: center;
border-radius: 3px;
padding: 15px 15px 15px 15px;
margin:20px 0%;
`

const Source = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  .empty {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    transform: translateY(50%);
  }
`

const SourceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  font-size: 10px;
  color: rgba(255, 255, 255, 1);
  margin-top: 20px;
  .No {
    flex: 1 6%;
    text-align: center;
  }
  .address {
    flex: 1 40%;
    text-align: center;
  }
  .amount {
    flex: 1 20%;
    text-align: center;
  }
  .time {
    flex: 1 20%;
    text-align: center;
  }
`
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
interface MYRANK { my_egg: string, my_ranking: string }
interface Props {
  dataSource: any[]
  myRank?: MYRANK
  rankLevel?: Level[]
}
type Level = {
  "grade": string
  "rate": string
  "user_num": number
  "total_reward_babyloong": string
  "total_reward_babyloong_matic": string
}


const Rank = (props: Props) => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const { dataSource = [], myRank, rankLevel } = props
  const userInfo = getState('user').userInfo
  return (
    <MarketWrap>
      <div className="top">
        <div className="bg"></div>
        <div className="title">
          <span>{t('Ranking')}</span>
        </div>
      </div>
      <RankMain>
        <RankItem className="special">
          <Image src={rankBgPng} alt="rank" />
          <div className="countIcon">
            <span className="big">{rankLevel && rankLevel[4]?.total_reward_babyloong_matic}</span>
            <EggTokenIcon width={24} />
          </div>
          <div className="second">{rankLevel && rankLevel[4]?.user_num} {t('Grandmaster')}</div>
          <div className="third">{t('Current Grandmaster Prize Pool')}</div>
        </RankItem>
        <div className="row">
          <RankItem>
            <div className="countIcon">
              <span className="big">{rankLevel && rankLevel[3]?.total_reward_babyloong_matic}</span>
              <EggTokenIcon width={24} />
            </div>
            <div className="second">{rankLevel && rankLevel[3]?.user_num} {t('Grandmaster')}</div>
            <div className="third">{t('Current Grandmaster Prize Pool')}</div>
          </RankItem>
          <RankItem>
            <div className="countIcon">
              <span className="big">{rankLevel && rankLevel[2]?.total_reward_babyloong_matic}</span>
              <EggTokenIcon width={24} />
            </div>
            <div className="second">{rankLevel && rankLevel[2]?.user_num} {t('Grandmaster')}</div>
            <div className="third">{t('Current Grandmaster Prize Pool')}</div>
          </RankItem>
        </div>
        <div className="row">
          <RankItem>
            <div className="countIcon">
              <span className="big">{rankLevel && rankLevel[1]?.total_reward_babyloong_matic}</span>
              <EggTokenIcon width={24} />
            </div>
            <div className="second">{rankLevel && rankLevel[1]?.user_num} {t('Grandmaster')}</div>
            <div className="third">{t('Current Grandmaster Prize Pool')}</div>
          </RankItem>
          <RankItem>
            <div className="countIcon">
              <span className="big">{rankLevel && rankLevel[0]?.total_reward_babyloong_matic}</span>
              <EggTokenIcon width={24} />
            </div>
            <div className="second">{rankLevel && rankLevel[0]?.user_num} {t('Grandmaster')}</div>
            <div className="third">{t('Current Grandmaster Prize Pool')}</div>
          </RankItem>
        </div>
        <MyRank>
          <Flex>
            <Image width={60} src={VIP4} alt="rank" />
            <div>
              <Typography fontSize="12px">您的排位</Typography>
              <Typography color="rgba(246, 26, 126, 1)" fontWeight="bold" fontSize="14px">育龙宗师</Typography>
              <Typography fontSize="12px">龙蛋数额{myRank?.my_egg}</Typography>
            </div>
          </Flex>
          <Flex>
            <Typography fontSize="12px">NO</Typography>
            <Typography fontWeight="bold" fontSize="44px">{myRank?.my_ranking}</Typography>
          </Flex>
        </MyRank>
        <div>
          <div>{t('Loong Egg Rank')}</div>
        </div>
        <LastWrap>
          <div
            style={{
              width: '100%',
            }}
          >
            <Column>
              <div className="No">No.</div>
              <div className="address">{t('Address')}</div>
              <div className="amount">{t('Amount')}</div>
              <div className="time">{t('Time')}</div>
            </Column>
            <Source>
              {dataSource.length ? (
                dataSource.map((item: any) => {
                  return (
                    <SourceItem>
                      <div className="No">{item.no}</div>
                      <div className="address">{item.address}</div>
                      <div className="amount">{item.amount}</div>
                      <div className="time">{item.time}</div>
                    </SourceItem>
                  )
                })
              ) : (
                <div className="empty">{t('No Data')}</div>
              )}
            </Source>
          </div>
        </LastWrap>
      </RankMain>
    </MarketWrap>
  )
}

export default Rank

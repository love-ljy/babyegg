import Image from 'next/image'
import styled from '@emotion/styled'
import {useMemo} from 'react'
import { Typography, Box } from '@mui/material'
import rankBgPng from '@imgs/rankBg.png'
import EggTokenIcon from '@icons/eggToken.svg'
import { useTranslation } from 'next-i18next'
import VIP0 from '@imgs/99.png'
import VIP1 from '@imgs/100.png'
import VIP2 from '@imgs/300.png'
import VIP3 from '@imgs/500.png'
import VIP4 from '@imgs/1000.png'
import VIP5 from '@imgs/3000.png'
import { formatAddress } from '@utils/formatterBalance'

const MarketWrap = styled.div`
  .top {
    position: relative;
    height: 80px;
    .bg {
      height: 80px;
      opacity: 1;
      background: radial-gradient(
        49.14% 90.88% at 52% 100%,
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .row:nth-child(1) {
    /* margin-right: 10px; */
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
    /* margin-left: 10px; */
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
  margin: 20px 0%;
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
  justify-content: end;
`

const Flex2 = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: end;
`
interface MYRANK {
  my_egg: string
  my_ranking: string
}
interface Props {
  dataSource: any[]
  myRank?: MYRANK
  rankLevel: Level[]
}
type Level = {
  grade: string
  rate: string
  user_num: string
  total_reward_babyloong: string
  total_reward_babyloong_matic: string
}

const Rank = (props: Props) => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const { dataSource = [], myRank, rankLevel = [] } = props
  const LevelList = [
    { name: 'Intern', count: 1 },
    { name: 'Novice', count: 2 },
    { name: 'Elite', count: 3 },
    { name: 'Expert', count: 4 },
    { name: 'Master', count: 5 },
    { name: 'Grandmaster', count: 6 }
  ]
  const LeveUserlList = [
    { name: 'Intern', count: 0, imgSrc: <Image src={VIP0} width={61} height={66} alt='' /> },
    { name: 'Novice', count: 100, imgSrc: <Image src={VIP1} width={61} height={66} alt='' /> },
    { name: 'Elite', count: 300, imgSrc: <Image src={VIP2} width={61} height={66} alt='' /> },
    { name: 'Expert', count: 500, imgSrc: <Image src={VIP3} width={61} height={66} alt='' /> },
    { name: 'Master', count: 1000, imgSrc: <Image src={VIP4} width={61} height={66} alt='' /> },
    { name: 'Grandmaster', count: 3000, imgSrc: <Image src={VIP5} width={61} height={66} alt='' /> }
  ]
  const variable = Number(myRank?.my_egg)
  const UserLevel = useMemo(()=>{
    const level = LeveUserlList.find(level => level.count > variable);

    // 如果找到，返回前一个元素的 imgSrc
    if (level) {
        const index = LeveUserlList.indexOf(level);
        return index > 0 ? LeveUserlList[index - 1] : null;
    }

    // 如果没有找到符合条件的元素，返回数组最后一个元素的 imgSrc
    return LeveUserlList[LeveUserlList.length - 1];
  },[variable])
  const imgSrc = UserLevel ? UserLevel?.imgSrc : null;
  const LevlName:string = UserLevel ? UserLevel?.name : 'Master';
  const  renderUserTitle = (level:number)=>{
    console.info(level)
    return LevelList.find(e=>e.count===Number(level))?.name||'Intern'
  }
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
            <span className="big">{rankLevel[4]?.total_reward_babyloong_matic}</span>
            <EggTokenIcon width={24} />
          </div>
          <div className="second">
            {rankLevel[4]?.user_num} {t('Grandmaster')}
          </div>
          <div className="third">{t('Current Grandmaster Prize Pool')}</div>
        </RankItem>
        <div className="row">
          <RankItem>
            <div className="countIcon">
              <span className="big">{rankLevel[3]?.total_reward_babyloong_matic}</span>
              <EggTokenIcon width={24} />
            </div>
            <div className="second">
              {rankLevel[3]?.user_num} {t('Master')}
            </div>
            <div className="third">{t('Current Master Prize Pool')}</div>
          </RankItem>
          <RankItem>
            <div className="countIcon">
              <span className="big">{rankLevel[2]?.total_reward_babyloong_matic}</span>
              <EggTokenIcon width={24} />
            </div>
            <div className="second">
              {rankLevel[2]?.user_num} {t('Expert')}
            </div>
            <div className="third">{t('Current Expert Prize Pool')}</div>
          </RankItem>
        </div>
        <div className="row">
          <RankItem>
            <div className="countIcon">
              <span className="big">{rankLevel[1]?.total_reward_babyloong_matic}</span>
              <EggTokenIcon width={24} />
            </div>
            <div className="second">
              {rankLevel[1]?.user_num} {t('Elite')}
            </div>
            <div className="third">{t('Current Elite Prize Pool')}</div>
          </RankItem>
          <RankItem>
            <div className="countIcon">
              <span className="big">{rankLevel[0]?.total_reward_babyloong_matic}</span>
              <EggTokenIcon width={24} />
            </div>
            <div className="second">
              {rankLevel[0]?.user_num} {t('Novice')}
            </div>
            <div className="third">{t('Current Novice Prize Pool')}</div>
          </RankItem>
        </div>
        <MyRank>
          <Flex>
            {imgSrc}
            <div>
              <Typography fontSize="12px">{t('Your Ranking')}</Typography>
              <Typography my={1} color="rgba(246, 26, 126, 1)" fontWeight="bold" fontSize="14px">
                {t(LevlName)}
              </Typography>
              <Typography fontSize="12px">{t('Egg Amount')}{myRank?.my_egg}</Typography>
            </div>
          </Flex>
          <Flex2>
            <Typography fontSize="12px">NO</Typography>
            <Typography fontWeight="bold" fontSize="44px">
              {myRank?.my_ranking}
            </Typography>
          </Flex2>
        </MyRank>
        <div>
          <div>{t('Loong EGG Rank')}</div>
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
              <div className="time">{t('Title')}</div>
            </Column>
            <Source>
              {dataSource.length ? (
                dataSource.map((item: any) => {
                  return (
                    <SourceItem key={item.ranking}>
                      <div className="No">{item.ranking}</div>
                      <div className="address">{formatAddress(item.username)}</div>
                      <div className="amount">{item.dragon_egg}</div>
                      <div className="time">{t(renderUserTitle(item.level_grade))}</div>
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

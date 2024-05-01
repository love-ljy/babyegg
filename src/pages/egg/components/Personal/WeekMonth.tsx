import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import styled from '@emotion/styled'
import markitipPng from '@imgs/markitip.png'
import closePng from '@imgs/close.png'
import desctipPng from '@imgs/desctip.png'
import CommonTab from '../commonTab/commonTab'
import MaticIcon from '@icons/matic.svg'
import { useTranslation } from 'next-i18next'
import { getUserRanking, getRankingYuLong } from '@utils/api'

const MarketWrap = styled.div`
  .top {
    position: relative;
    height: 80px;
    .bg {
    
      height: 80px;
      opacity: 1;
      background: radial-gradient(
        41.14% 82.88% at 46% 100%,
        rgba(143, 13, 245, 0.7) 41.36%,
        rgba(84, 8, 143, 0) 100%
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
    /* height: 500px; */
  }
  .seeMore {
    width: 250px;
    height: 40px;

    border-radius: 32px;
    background: linear-gradient(90deg, rgba(50, 32, 208, 1) 0%, rgba(246, 26, 126, 1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 15px 6px 15px;
    margin: 10px auto;
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
const ContentWrap = styled.div`
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);

  border: 1px solid rgba(246, 26, 126, 1);

  box-shadow: inset 0px 0px 12.1px rgba(246, 26, 126, 1);
  padding: 25px 29px 25px 29px;
  .bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .count {
      font-size: 30px;
      font-weight: 700;
    }
    .img {
      margin-left: 10px;
    }
  }
`

interface tabItem {
  label: string
  value: string
  component: any
}

interface CompProps {
  dataSource: any[]
  myInfo?:MyInfo
}
const Bot = styled.div`
  border-radius: 5px;
background: rgba(184, 3, 139, 1);
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
padding: 6px 15px 6px 15px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin: auto; */
    /* transform: translateY(50%); */
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
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
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

const Comp = (props: CompProps) => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const { dataSource,myInfo } = props
  return (
    <ContentWrap>
      <Bot>
        <Typography fontSize={15} fontWeight={700}>
          {t('TOTAL PRIZE POOL')}
        </Typography>
        <div className="bot">
          <span className="count">100,000,000</span>
          <div className="img">
            <MaticIcon />
          </div>
        </div>
      </Bot>
      <MyRank>
        <div>
          <Typography fontSize="12px">您当前的预计分红</Typography>
          <Typography color="rgba(246, 26, 126, 1)" fontWeight="bold" fontSize="14px">{myInfo?.my_reward_matic}</Typography>
          <Typography fontSize="12px">您的小区新增业绩 {myInfo?.my_min_son_team_performance}</Typography>
        </div>
        <Flex>
          <Typography fontSize="12px">NO</Typography>
          <Typography fontWeight="bold" fontSize="44px">{myInfo?.my_ranking}</Typography>
        </Flex>
      </MyRank>
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
    </ContentWrap>
  )
}

interface MyInfo{
  my_min_son_team_performance:string
my_ranking:string
my_reward:string
my_reward_matic:string
total_reward:string
total_reward_matic:string
}

const WeekMonth = () => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [marketShow, setMarketShow] = useState(false)
  const [dataSource, setDataSource] = useState([
    // {
    //   no: 100,
    //   address: '0x4Bc48...3B98fD',
    //   amount: 1000,
    //   time: '12 hours ago',
    // },
  ])
  const [myInfo,setMyInfo] = useState<MyInfo>()
  const [dataSource2, setDataSource2] = useState([
    {
      no: 100,
      address: '0x4Bc48...3B98fD',
      amount: 1000,
      time: '12 hours ago',
    },
  ])
  const tabList: tabItem[] = [
    {
      label: 'Weekly',
      value: 'Weekly',
      component: <Comp myInfo={myInfo} dataSource={dataSource} />,
    },
    {
      label: 'Monthly',
      value: 'Monthly',
      component: <Comp myInfo={myInfo} dataSource={dataSource} />,
    },
  ]
  const tabChange = (_event: React.SyntheticEvent, i: number) => {
    FetchRankingLevel(i)
  }
  const FetchRankingLevel = async (i) => {
    console.info(2222)
    const res: any = await getRankingYuLong(i)
    if (res.code === 0) {
      setDataSource(res.data.list)
      const {my_min_son_team_performance,my_ranking,my_reward,my_reward_matic,total_reward,total_reward_matic} = res.data
      setMyInfo({
        my_min_son_team_performance,
        my_ranking,
        my_reward,
        my_reward_matic,
        total_reward,
        total_reward_matic
      })
    }
  }
  const swipeChange = (i: number) => {
    if (loading) return
    // if (rankAllList.length) {
    //   setPageIndex(1);
    //   setList(rankAllList[i].list);
    //   setPageCount(Math.ceil(rankAllList[i].list.length / pageSize));
    // }
    // setRankTitle(selectList[i].label);
  }
  useEffect(() => {

    FetchRankingLevel(0)
  }, [])
  return (
    <MarketWrap>
      
      <div className="tab">
        <CommonTab
          tabList={tabList}
          tabChange={tabChange}
          swipeChange={swipeChange}
          selectedcolor={'rgba(184, 3, 139, 1)'}
        />
      </div>
      <div className="seeMore">{t('See More')}</div>
    </MarketWrap>
  )
}

export default WeekMonth

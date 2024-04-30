import { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import markitipPng from '@imgs/markitip.png'
import CommonTab from '../commonTab/commonTab'
import UserPanel from './UserPanel'
import Invitation from './Invitation'
import Withdraw from './Withdraw'
import Rank from './Rank'
import WeekMonth from './WeekMonth'
import { useTranslation } from 'next-i18next'
import {getUserRanking} from '@utils/api'

const MarketWrap = styled.div`
  .top {
    position: relative;
    height: 80px;
    .bg {
    
      height: 80px;
      opacity: 1;
      background: radial-gradient(
        41.14% 82.88% at 46% 100%,
        rgba(0, 79, 201, 1) 41.36%,
        rgba(0, 79, 201, 0) 100%
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
`

interface tabItem {
  label: string
  value: string
  component: any
}

const tabList: tabItem[] = [
  {
    label: 'User Panel',
    value: 'panel',
    component: <UserPanel />,
  },
  {
    label: 'Invitation',
    value: 'Invitation',
    component: <Invitation />,
  },
  {
    label: 'Withdraw',
    value: 'Withdraw',
    component: <Withdraw />,
  },
]
interface MYRANK{my_egg:string,my_ranking:string}

const Personal = () => {
  // @ts-ignore
const { t } = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [myRank,setMyRank] = useState<MYRANK>()
  const [dataSource, setDataSource] = useState([
    // {
    //   no: 100,
    //   address: '0x4Bc48...3B98fD',
    //   amount: 1000,
    //   time: '12 hours ago',
    // },
  ])

  const fetchEggRanking = async()=>{
    setLoading(true)
    const res:any =  await getUserRanking()
    if(res.code===0){
      setDataSource(res.data.list)
      setMyRank({my_egg:res.data.my_egg,my_ranking:res.data.my_ranking})
    }
  }
  

  const tabChange = (_event: React.SyntheticEvent, i: number) => {
    if (loading) return
    // if (rankAllList.length) {
    //   // setPageIndex(1);
    //   // setList(rankAllList[i].list);
    //   // setPageCount(Math.ceil(rankAllList[i].list.length / pageSize));
    // }
    // setRankTitle(selectList[i].label);
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
  useEffect(()=>{
    fetchEggRanking()
  },[])

  return (
    <MarketWrap>
      <div className="top">
        <div className="bg"></div>
        <div className="title">
          <span>{t('Personal Center')}</span>
        </div>
      </div>
      <div className="tab">
        <CommonTab
          tabList={tabList}
          tabChange={tabChange}
          swipeChange={swipeChange}
          selectedColor={'rgba(50, 32, 208, 1)'}
        />
      </div>
      <Rank myRank={myRank} dataSource={dataSource} />
      <Box mt={2}>
        <WeekMonth />
      </Box>
    </MarketWrap>
  )
}

export default Personal

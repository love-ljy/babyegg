import { useEffect, useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import CommonTab from '../commonTab/commonTab'
import Last from './Last'
import Traffic from './Traffic'
import BuyEgg from './BuyEgg'
import GameDesc from './GameDesc'
import { useTranslation } from 'next-i18next'
import { getLast100, getRealTimeTraffic } from '@utils/api'

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
    /* max-height: 500px; */
  }
`


interface tabItem {
  label: string
  value: string
  component: any
}

interface TrafficProps{
  list:{
    id:string,
    event:string,
    created_at:string,
    username:string
  }[],
  page:{
    total_count:string
    total_page:number
    current_page:number
  }
}

const Market = () => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [marketShow, setMarketShow] = useState(false)
  const [dataSource, setDataSource] = useState([
    // {
    //   no: 1,
    //   address: '0x9a4E864aF8E...C71c88f1782bD',
    // },
  ])
  const [currentPage,setCurrentPage] = useState(1)
  const [tabNum,setTabNum] = useState(0)
  const [dataSource2, setDataSource2] = useState<TrafficProps>()
  const tabList: tabItem[] = [
    {
      label: 'Buy Egg',
      value: 'buy',
      component: <BuyEgg />,
    },
    {
      label: 'Last 100',
      value: 'last',
      component: <Last dataSource={dataSource} />,
    },
    {
      label: 'Traffic',
      value: 'traffic',
      component: <Traffic changePage={setCurrentPage} dataSource={dataSource2} />,
    },
    {
      label: 'MeExplan',
      value: 'gameInfo',
      component: <GameDesc />,
    },
  ]
  const fetchLast100 = async (i: number) => {
    console.info(i)
    let res: any
   
    if (i === 1) {
      res = await getLast100({ page: currentPage, limit: 10 })
      if (res.code === 0) {
        setDataSource(res.data)
      }
    } else if (i === 2) {
      res = await getRealTimeTraffic({ page: currentPage, limit: 10 })
      if (res.code === 0) {
        setDataSource2(res.data)
      }
    }
   

  }

  useEffect(()=>{
    if(tabNum===1||tabNum===2){
      fetchLast100(tabNum)
    }
    
  },[currentPage,tabNum])
  const tabChange = (_event: React.SyntheticEvent, i: number) => {
    console.info(i)
    setTabNum(i)
    if (i === 1 || i === 2) { fetchLast100(i) }
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

  const openMarketDialog = () => {
    setMarketShow(true)
  }

  const closeDialog = () => {
    setMarketShow(false)
  }

  return (
    <MarketWrap>
      <div className="top">
        <div className="bg"></div>
        <div className="title">
          <span>{t('Egg Market')}</span>
          {/* <div className="icon" onClick={openMarketDialog}>
            <Image src={markitipPng} width={25} alt="markitip" height={25} />
          </div> */}
        </div>
      </div>
      <div className="tab">
        <CommonTab tabList={tabList} tabChange={tabChange} swipeChange={swipeChange} />
      </div>

    </MarketWrap>
  )
}

export default Market

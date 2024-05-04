import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import CommonTab from '../commonTab/commonTab'
import Last from './Last'
import Traffic from './Traffic'
import BuyEgg from './BuyEgg'
import GameDesc from './GameDesc'
import { useTranslation } from 'next-i18next'
import { getLast100, getRealTimeTraffic } from '@utils/api'

import { useAccount } from 'wagmi'
import { selectAuthToken, selectIsBindParent } from '@store/user'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

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

interface TrafficProps {
  list: {
    id: string
    event: string
    created_at: string
    username: string
  }[]
  page: {
    total_count: string
    total_page: number
    current_page: number
  }
}

const Market = () => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const [dataSource, setDataSource] = useState<TrafficProps>()
  const [currentPage, setCurrentPage] = useState(1)
  const [tabNum, setTabNum] = useState(0)
  const [dataSource2, setDataSource2] = useState<TrafficProps>()

  const { address } = useAccount()

  const token = useSelector(selectAuthToken)
  const isBindParent: any = useSelector(selectIsBindParent)

  const tabList: tabItem[] = [
    {
      label: 'Buy Egg',
      value: 'buy',
      component: <BuyEgg />,
    },
    {
      label: 'Last 100',
      value: 'last',
      component: <Last dataSource={dataSource} changePage={setCurrentPage} />,
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

  const tabChange = (_event: React.SyntheticEvent, i: number) => {
    setTabNum(i)
    setCurrentPage(1)
  }

  const swipeChange = (i: number) => {
    setTabNum(i)
    setCurrentPage(1)
  }

  const fetchTableList = useCallback(async () => {
    if (address && isBindParent && token) {
      let res: any
      try {
        if (tabNum === 1) {
          res = await getLast100({ page: currentPage, limit: 10 })
          if (res.code === 0) {
            setDataSource(res.data)
          } else {
            toast.warn(res.msg)
          }
        } else if (tabNum === 2) {
          res = await getRealTimeTraffic({ page: currentPage, limit: 10 })
          if (res.code === 0) {
            setDataSource2(res.data)
          } else {
            toast.warn(res.msg)
          }
        }
      } catch (e) {
        console.log('table list error', e)
        toast.warn('网络错误')
      }
    }
  }, [currentPage, tabNum, address, isBindParent, token])

  useEffect(() => {
    fetchTableList()
  }, [fetchTableList])

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

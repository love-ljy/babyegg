import { useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import markitipPng from '@imgs/markitip.png'
import CommonTab from '../commonTab/commonTab'
import BuyEgg from './BuyEgg'

const MarketWrap = styled.div`
  .top {
    position: relative;
    height: 80px;
    .bg {
      width: 367px;
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
    height: 500px;
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
    component: <BuyEgg />,
  },
  {
    label: 'Invitation',
    value: 'Invitation',
    component: <BuyEgg />,
  },
  {
    label: 'Withdraw',
    value: 'Withdraw',
    component: <BuyEgg />,
  },
]

const Personal = () => {
  const [loading, setLoading] = useState(false)

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

  return (
    <MarketWrap>
      <div className="top">
        <div className="bg"></div>
        <div className="title">
          <span>Personal Center</span>
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
    </MarketWrap>
  )
}

export default Personal

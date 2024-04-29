import { useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import markitipPng from '@imgs/markitip.png'
import closePng from '@imgs/close.png'
import desctipPng from '@imgs/desctip.png'
import CommonTab from '../commonTab/commonTab'
import Last from './Last'
import Traffic from './Traffic'
import BuyEgg from './BuyEgg'
import { useTranslation } from 'next-i18next'
import CommonModal from 'src/pages/egg/components/commonModal/commonModal'

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

interface tabItem {
  label: string
  value: string
  component: any
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
  const [dataSource2, setDataSource2] = useState([
    // {
    //   no: 100,
    //   address: '0x4Bc48...3B98fD',
    //   amount: 1000,
    //   time: '12 hours ago',
    // },
  ])
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
      component: <Traffic dataSource={dataSource2} />,
    },
  ]
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
          <div className="icon" onClick={openMarketDialog}>
            <Image src={markitipPng} width={25} alt="markitip" height={25} />
          </div>
        </div>
      </div>
      <div className="tab">
        <CommonTab tabList={tabList} tabChange={tabChange} swipeChange={swipeChange} />
      </div>
      <CommonModal
        visible={marketShow}
        setVisible={setMarketShow}
        title={
          <DialogTitle>
            <div>
              <Image src={desctipPng} width={25} height={25} alt="desc" />
            </div>
            <span>{t('Description')}</span>
          </DialogTitle>
        }
        footer={
          <DialogFooter onClick={closeDialog}>
            <div>
              <Image src={closePng} width={13} height={13} alt="close" />
            </div>
            <span>{t('Close')}</span>
          </DialogFooter>
        }
      >
        <DialogMain>
          <div className="mechanism"> {t("Mechanism Explanation")}: </div>
          <div>
            {t(`Lucky Reward: Each egg purchase provides a chance to win an airdrop reward of 100-1000
            $MATIC (1% probability).Initial Value: After purchase, the egg's initial value is zero,
            which increases as more people buy.Early Opening: Before the end of the current game
            round, players can choose to open their egg to claim double the current value, after
            which the egg will disappear.Repurchase: Players can use the $BabyLoong from opened eggs
            to buy more eggs. The old eggs still exist but their value resets to zero. Once
            activated, you can use held $BabyLoong to purchase eggs.Countdown Increase: Each
            purchase or opening of an egg increases the countdown timer by 30 seconds (initially set
            at 24 hours). When the timer reaches zero, the last 100 players to buy eggs evenly split
            a prize pool, and the very last buyer receives an extra large reward.Automatic Opening:
            When the countdown ends, all eggs automatically open, and players receive the current
            value of $BabyLoong contained within.Game Reset: After the round ends, a new game round
            begins.`)}
          </div>
        </DialogMain>
      </CommonModal>
    </MarketWrap>
  )
}

export default Market

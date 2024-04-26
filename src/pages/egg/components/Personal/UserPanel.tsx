import { useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import Image from 'next/image'
import currentEggPng from '@imgs/currentEgg.png'
import grandmasterPng from '@imgs/grandmaster.png'
import LinearProgress from '@mui/material/LinearProgress'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay, virtualize } from 'react-swipeable-views-utils'
import EggTokenIcon from '@icons/eggToken.svg'
import LeftArrowIcon from '@icons/leftArrow.svg'
import RightArrowIcon from '@icons/rightArrow.svg'
import { mod } from 'react-swipeable-views-core'
import { useSelector } from 'react-redux'
import { selectWalletInfo, selectUserInfo } from '@store/user'
const UserPanelWrap = styled.div`
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  border: 1px solid rgba(26, 0, 187, 1);
  box-shadow: inset 0px 0px 12.1px rgba(0, 100, 255, 0.74);
  padding: 25px 10px 25px 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  .header {
    width: 100%;
    display: flex;
    justify-content: start;
    margin-bottom: 20px;
    img {
      margin-right: 24px;
    }
    .prograssWrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      .MuiLinearProgress-root {
        background-color: #000;
        border-radius: 5px;
        border: 1px solid rgba(50, 32, 208, 1);
        height: 15px;
      }
      .MuiLinearProgress-bar {
        background: linear-gradient(180deg, rgba(210, 9, 172, 1) 0%, rgba(86, 0, 154, 1) 100%);
      }
      .title {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
      }
      .masterWrap {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .master {
          font-size: 20px;
          font-weight: 900;
        }
        .percent {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
`

const SwipeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    margin-bottom: 10px;
  }
  .earn {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 4px;
  }
  .countWrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    span {
      margin-right: 10px;
    }
  }
  .btnWrap {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    span {
      margin-right: 10px;
    }
    .open {
      width: 126px;
      height: 30px;
      border-radius: 32px;
      background: rgba(0, 79, 201, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 15px 6px 15px;
    }
    .repu {
      width: 126px;
      height: 30px;
      border-radius: 32px;
      background: rgba(88, 88, 88, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 15px 6px 15px;
    }
  }
`

const EggStatusWrap = styled.div`
  width: 100%;
  margin-bottom: 10px;
  .eggTitle {
    font-size: 15px;
    font-weight: 700;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 6px;
  }
  .eggStatus {
    position: relative;
    border-radius: 5px;
    padding: 22px 10px;
    width: 100%;
    background: rgba(0, 0, 0, 1);
    border: 1px solid rgba(50, 32, 208, 1);
    .pageWrap {
      position: absolute;
      bottom: 25px;
      display: flex;
      width: 100%;
      justify-content: center;
      .page {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        margin-right: 10px;
        &.actived {
          background-color: #fff;
        }
      }
    }
    .left {
      position: absolute;
      left: 10px;
      z-index: 1000;
      top: 0;
      bottom: 0;
      transform: translateY(50%);
      margin: auto;
    }
    .right {
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      transform: translateY(50%);
      z-index: 1000;
      margin: auto;
    }
  }
`
const RewardStatusWrap = styled.div`
  width: 100%;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    .history {
      font-size: 10px;
      line-height: 12.1px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`
const CommWrap = styled.div`
  display: flex;
  justify-content: space-between;
  .row {
    flex: 1 50%;
  }
  .row:nth-child(1) {
    margin-right: 10px;
  }
`
const CommonRow = styled.div`
  border-radius: 5px;
  background: rgba(0, 0, 0, 1);

  border: 1px solid rgba(26, 0, 187, 1);
  margin-bottom: 10px;
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: end; */
  /* align-items: end; */
  padding: 4px 10px 4px 10px;
  .topTxt {
    text-align: left;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
  }
  .bot {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  /* .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    .topTxt {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.5);
    }
    .bot {
      font-size: 15px;
      font-weight: 700;
    }
  } */
`
const Expenditure = styled.div`
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  background: rgba(0, 0, 0, 1);
  border: 1px solid rgba(50, 32, 208, 1);
  margin-bottom: 20px;
  .mar {
    margin-bottom: 15px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    .group {
      flex: 1 60%;
      display: flex;
      flex-direction: column;
      align-items: start;
      .title {
        text-align: left;
        flex-wrap: wrap;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
      }
      .count {
        font-size: 15px;
        font-weight: 700;
      }
    }
    .group2 {
      flex: 1 40%;
    }
  }
`

const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews))

const slidesData = [
  { img: currentEggPng, count: 10000 },
  { img: currentEggPng, count: 20000 },
  { img: currentEggPng, count: 30000 },
]

function slideRenderer(params: any) {
  const { index, key } = params
  const inx = mod(index, slidesData.length)
  return (
    <SwipeItem key={index}>
      <div>
        <Image src={slidesData[inx].img} alt="egg" />
      </div>
      <span className="earn">Earnings</span>
      <div className="countWrap">
        <span>{slidesData[inx].count}</span>
        <EggTokenIcon />
      </div>
      <div className="btnWrap">
        <span className="open">Open Egg</span>
        <span className="repu">Repurchase</span>
      </div>
    </SwipeItem>
  )
}

const UserPanel = () => {
  const [progress, setProgress] = useState(0)
  const [index, setIndex] = useState(0)
  const userInfo: any = useSelector(selectUserInfo)

  
  const handleLeftArrowClick = () => {
    setIndex(index - 1)
  }
  const handleRightArrowClick = () => {
    setIndex(index + 1)
  }

  const pageClick = (index: number) => {
    setIndex(index)
  }

  return (
    <UserPanelWrap>
      <div className="header">
        <div>
          <Image src={grandmasterPng} alt="grandmaster" />
        </div>
        <div className="prograssWrap">
          <div className="title">Title</div>
          <div className="masterWrap">
            <span className="master">{userInfo.level_name}</span>
            <span className="percent">{userInfo.level_grade || 0}/1000</span>
          </div>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        </div>
      </div>
      <Expenditure>
        <div className="row mar">
          <div className="group">
            <span className="title">Total Personal Expenditure</span>
            <span className="count">{userInfo.my_performance || 0}</span>
          </div>
          <div className="group group2">
            <span className="title">Total Eggs Purchased</span>
            <span className="count">{userInfo.dragon_egg_total || 0}</span>
          </div>
        </div>
        <div className="row mar">
          <div className="group">
            <span className="title">Current Eggs Held</span>
            <span className="count">{userInfo.dragon_egg}</span>
          </div>
          <div className="group group2">
            <span className="title">Current Egg Purchase Sequence</span>
            <span className="count">{userInfo.last_sort_num}</span>
          </div>
        </div>
        <div className="row">
          <div className="group">
            <span className="title">Your Ranking Sequence</span>
            <span className="count">{userInfo.my_sort_num || 0}</span>
          </div>
        </div>
      </Expenditure>
      <EggStatusWrap>
        <div className="eggTitle">Current Egg Status</div>
        <div className="eggStatus">
          <LeftArrowIcon onClick={handleLeftArrowClick} className="swiperBtn left" />
          <AutoPlaySwipeableViews
            slideRenderer={slideRenderer}
            index={index}
            onChangeIndex={(index: number) => setIndex(index)}
          />
          <RightArrowIcon onClick={handleRightArrowClick} className="swiperBtn right" />
          <div className="pageWrap">
            {slidesData.map((item, i) => {
              return (
                <div
                  className={`page ${i === mod(index, slidesData.length) ? 'actived' : ''}`}
                  onClick={() => pageClick(i)}
                ></div>
              )
            })}
          </div>
        </div>
      </EggStatusWrap>
      <RewardStatusWrap>
        <div className="title">
          <div>Reward Status</div>
          <div>
            <span className="history">{'History >'}</span>
          </div>
        </div>
        <CommonRow>
          <div className="topTxt">
            <span>Egg Earnings</span>
          </div>
          <div className="bot">
            <span>10,000.00</span>
            <EggTokenIcon />
          </div>
        </CommonRow>
        <CommWrap>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Public Seq Earnings</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Lucky Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
        </CommWrap>
        <CommWrap>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Last 100 Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Last Master Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
        </CommWrap>
        <CommonRow className="row">
          <div className="topTxt">
            <span>Egg Rank Reward</span>
          </div>
          <div className="bot">
            <span>10,000.00</span>
            <EggTokenIcon />
          </div>
        </CommonRow>
        <CommWrap>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Weekly Rank Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Monthly Rank Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
        </CommWrap>
      </RewardStatusWrap>
    </UserPanelWrap>
  )
}
export default UserPanel

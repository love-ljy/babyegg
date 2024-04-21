import { useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import SwipeableViews from 'react-swipeable-views'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useTheme } from '@mui/material/styles'
import markitipPng from '@imgs/markitip.png'

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
    height: 500px;
  }
`

const TabItem = styled(Tab)`
  min-height: 0;
  width: 113px;
  height: 34px;
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  text-transform: none;
  &.Mui-selected {
    background: rgba(91, 0, 183, 1);
  }
`

const SwipeableViewsWrap = styled(SwipeableViews)`
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: hidden;
`

const selectList = [
  {
    label: 'Buy Egg',
    value: 'buy',
  },
  {
    label: 'Last 100',
    value: 'last',
  },
  {
    label: 'Traffic',
    value: 'traffic',
  },
]

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 142px)',
        maxHeight: '750px',
      }}
    >
      {value === index && children}
    </div>
  )
}

const Market = () => {
  const [loading, setLoading] = useState(false)
  const [currIndex, setCurrIndex] = useState(0)
  const theme = useTheme()

  const toggleBar = (_event: React.SyntheticEvent, i: number) => {
    if (loading) return
    // if (rankAllList.length) {
    //   // setPageIndex(1);
    //   // setList(rankAllList[i].list);
    //   // setPageCount(Math.ceil(rankAllList[i].list.length / pageSize));
    // }
    // setRankTitle(selectList[i].label);
    setCurrIndex(i)
  }

  const handleChangeIndex = (i: number) => {
    if (loading) return
    // if (rankAllList.length) {
    //   setPageIndex(1);
    //   setList(rankAllList[i].list);
    //   setPageCount(Math.ceil(rankAllList[i].list.length / pageSize));
    // }
    // setRankTitle(selectList[i].label);
    setCurrIndex(i)
  }

  return (
    <MarketWrap>
      <div className="top">
        <div className="bg"></div>
        <div className="title">
          <span>Egg Market</span>
          <div className="icon">
            <Image src={markitipPng} width={25} alt="markitip" height={25} />
          </div>
        </div>
      </div>
      <div className="tab">
        <Tabs
          value={currIndex}
          onChange={toggleBar}
          // scrollButtons
          textColor="inherit"
          // allowScrollButtonsMobile
          indicatorColor="secondary"
          variant="scrollable"
          aria-label="full width tabs example"
          sx={{
            margin: '0 auto',
            '.MuiTabs-indicator': {
              display: 'none',
            },
            '.MuiButtonBase-root': {
              minWidth: '6px',
              padding: '12px 4px',
            },
          }}
        >
          {selectList.map((v, i) => (
            <TabItem
              label={v.label}
              key={i}
              sx={{
                color: '#fff',
                fontSize: '16px',
              }}
            />
          ))}
        </Tabs>
        <SwipeableViewsWrap
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={currIndex}
          onChangeIndex={handleChangeIndex}
        >
          {selectList.map((v, i) => (
            <TabPanel value={currIndex} index={i} dir={theme.direction} key={i}>
              <div>123</div>
            </TabPanel>
          ))}
        </SwipeableViewsWrap>
      </div>
    </MarketWrap>
  )
}

export default Market

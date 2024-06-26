import { useState } from 'react'
import styled from '@emotion/styled'
import SwipeViews from 'react-swipeable-views'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

const TabItem = styled(Tab)<{ selectedcolor: string }>`
  min-height: 0;
  flex: 1;
  height: 34px;
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  text-transform: none;
  font-size: 16px;
  &.Mui-selected {
    background: ${({ selectedcolor }) => selectedcolor};
  }
`

const SwipeViewsWrap = styled(SwipeViews)`
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: hidden;
`

interface Props {
  tabList: any[]
  tabChange: (_event: React.SyntheticEvent, i: number) => void
  swipeChange: (i: number) => void
  selectedcolor?: string
}

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
        // height: 'calc(100vh - 142px)',
        // maxHeight: '750px',
      }}
    >
      {value === index && children}
    </div>
  )
}

const CommonTab = (props: Props) => {
  const { tabList = [], tabChange, swipeChange, selectedcolor = 'rgba(91, 0, 183, 1)' } = props
  const [currIndex, setCurrIndex] = useState(0)
  const theme = useTheme()
  const { t } = useTranslation('common')

  const handleChange = (_event: React.SyntheticEvent, i: number) => {
    setCurrIndex(i)
    tabChange && tabChange(_event, i)
  }

  const handleSwipeChange = (i: number) => {
    setCurrIndex(i)
    swipeChange && swipeChange(i)
  }

  return (
    <div>
      <Tabs
        value={currIndex}
        onChange={handleChange}
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
          '.MuiTabs-flexContainer': {
            display: 'flex',
            justifyContent: 'space-between',
          },
        }}
      >
        {tabList.map((v: Record<string, string>, i: number) => (
          <TabItem label={t(v.label)} key={i} selectedcolor={selectedcolor} />
        ))}
      </Tabs>
      <SwipeViewsWrap
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={currIndex}
        onChangeIndex={handleSwipeChange}
      >
        {tabList.map((v: Record<string, string>, i: number) => (
          <TabPanel value={currIndex} index={i} dir={theme.direction} key={i}>
            {v.component}
          </TabPanel>
        ))}
      </SwipeViewsWrap>
    </div>
  )
}
export default CommonTab

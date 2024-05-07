import { useEffect, useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import CommonTab from '../commonTab/commonTab'
import UserPanel from './UserPanel'
import Invitation from './Invitation'
import Withdraw from './Withdraw'
import Rank from './Rank'
import WeekMonth from './WeekMonth'
import { useTranslation } from 'next-i18next'
import { getUserRanking, getRankingLevel } from '@utils/api'
import { selectAuthToken, selectIsBindParent } from '@store/user'
import { useSelector } from 'react-redux'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'

const MarketWrap = styled.div`
  .top {
    position: relative;
    height: 80px;
    .bg {
      height: 80px;
      opacity: 1;
      background: radial-gradient(
        49.14% 90.88% at 52% 100%,
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
type Level = {
  grade: string
  rate: string
  user_num: string
  total_reward_babyloong: string
  total_reward_babyloong_matic: string
}
interface MYRANK {
  my_egg: string
  my_ranking: string
}

const Personal = () => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const [myRank, setMyRank] = useState<MYRANK>()
  const [rankLevel, setRankLevel] = useState<Level[]>([])
  const [dataSource, setDataSource] = useState([])
  const token = useSelector(selectAuthToken)
  const isBindParent: any = useSelector(selectIsBindParent)
  const { address } = useAccount()

  const tabChange = (_event: React.SyntheticEvent, i: number) => {}

  const swipeChange = (i: number) => {}

  const fetchUserRank = useCallback(async () => {
    if (address && isBindParent && token) {
      try {
        const res: any = await getUserRanking()
        if (res.code === 0) {
          setDataSource(res.data.list)
          setMyRank({ my_egg: res.data.my_egg, my_ranking: res.data.my_ranking })
        } else {
          toast.warn(res.msg)
          setDataSource([])
        }
      } catch (e) {
        console.log('fetchUserRank error', e)
        toast.warn('网络错误')
        setDataSource([])
      }
    }
  }, [address && isBindParent && token])

  const fetchRankLevel = useCallback(async () => {
    if (address && isBindParent && token) {
      try {
        const res: any = await getRankingLevel()
        if (res.code === 0) {
          setRankLevel(res.data)
        } else {
          toast.warn(res.msg)
          setRankLevel([])
        }
      } catch (e) {
        console.log('fetchRankLevel error', e)
        toast.warn('网络错误')
        setRankLevel([])
      }
    }
  }, [address && isBindParent && token])

  useEffect(() => {
    fetchUserRank()
    fetchRankLevel()
  }, [fetchUserRank, fetchRankLevel])

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
          selectedcolor={'rgba(50, 32, 208, 1)'}
        />
      </div>
      <Rank myRank={myRank} rankLevel={rankLevel} dataSource={dataSource} />
      <Box mt={2}>
        <WeekMonth  />
      </Box>
    </MarketWrap>
  )
}

export default Personal

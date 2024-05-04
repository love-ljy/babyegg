import styled from '@emotion/styled'
import CommonPage from '../commonPage/commonPage'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { formatAddress } from '@utils/formatterBalance'

const LastWrap = styled.div`
  display: flex;
  min-height: 480px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  border: 1px solid rgba(143, 13, 245, 1);
  box-shadow: inset 0px 0px 12.1px rgba(143, 13, 245, 1);
  padding: 25px 30px 25px;
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
    /* transform: translateY(50%); */
  }
`

const SourceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  font-size: 10px;
  color: rgba(255, 255, 255, 1);
  margin-top: 20px;
  align-items: center;
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
interface Props {
  dataSource?: TrafficProps
  changePage: (i: number) => void
}

const titles = {
  level_title: '头衔变动',
  dragon_egg: '购买龙蛋 Matic',
  dragon_egg_babyloong: '购买龙蛋 Babyloong',
  matic_investment: 'Matic 投资',
  babyloong_investment: 'Babyloong 投资',
  dragon_egg_babyloong_reward: '主动打开龙蛋',
  dragon_egg_babyloong_reward_auto: '自动打开龙蛋',
  game_last_open_egg: '神龙奖励',
  game_last_hundred_people_open_egg: '最后100奖励',
  game_lucky_reward: '幸运奖励',
  index_reward: '公排奖励',
  invite_reward: '邀请奖励',
  level_reward: '头衔分红',
  yulong_ranking_weekly_dividend: '育龙周榜分红',
  yulong_ranking_monthly_dividend: '育龙月榜分红',
}

const Traffic = (props: Props) => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const { dataSource, changePage } = props
  const changePageFormat = (event: React.ChangeEvent<unknown>, value: number) => {
    changePage(value)
  }

  return (
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
          {dataSource?.list?.length ? (
            dataSource?.list?.map((item: any) => {
              return (
                <SourceItem>
                  <div className="No">{item.id}</div>
                  <div className="address">{formatAddress(item.username)}</div>
                  <div className="amount">{titles[item.event]}</div>
                  <div className="time">{item.created_at}</div>
                </SourceItem>
              )
            })
          ) : (
            <div className="empty">{t('No Data')}</div>
          )}
        </Source>
      </div>
      <Box mt={2}>
        {dataSource?.list?.length ? (
          <CommonPage
            count={dataSource?.page?.total_count}
            page={dataSource?.page?.current_page}
            handleChange={changePageFormat}
          />
        ) : null}
      </Box>
    </LastWrap>
  )
}
export default Traffic

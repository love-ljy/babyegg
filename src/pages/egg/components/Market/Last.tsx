import styled from '@emotion/styled'
import CommonPage from '../commonPage/commonPage'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import MaticIcon from '@icons/matic.svg'
import { useSelector } from 'react-redux'
import {selectTotalData} from '@store/user'
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
  div {
    flex: 1 50%;
    text-align: left;
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
  .No {
    flex: 1 30%;
    text-align: left;
  }
  .address {
    flex: 1 70%;
    text-align: left;
  }
`
const RewardBox = styled.div`
border-radius: 5px;
background: rgba(184, 3, 139, 1);
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
padding: 6px 15px 6px 15px;
`
const LastBox = styled.div`
border-radius: 5px;
background: rgba(49, 32, 204, 1);
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
padding: 6px 15px 6px 15px;
margin: 20px 0;
`
const RewardBoxItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: .9fr .1fr;
  justify-content: start;
  align-items: center;
  color: rgba(255, 255, 255, 1);
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
  dataSource?: string[]
  changePage: (i: number) => void
}

const Last = (props: Props) => {
  const { dataSource, changePage } = props
  const totalData = useSelector(selectTotalData)
  const { t } = useTranslation('common')
  console.info(dataSource, '--',totalData)
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
        <RewardBox>
          <Typography>{t('Current Last 100 Bonus per pac')}</Typography>
          <RewardBoxItem>
            <Typography fontSize="35px">{totalData.last100_reward&&Number(totalData.last100_reward).toFixed(4)||'0'}</Typography>
            <MaticIcon />
          </RewardBoxItem>
        </RewardBox>
        <LastBox>
          <Typography>{t('current Ultimate Bonus')}</Typography>
          <RewardBoxItem>
            <Typography fontSize="35px">{totalData.last_reward&&Number(totalData.last_reward).toFixed(4)||'0'}</Typography>
            <MaticIcon />
          </RewardBoxItem>
        </LastBox>
        <Column>
          <div>No.</div>
          <div>{t('Address')}</div>
        </Column>
        <Source>
          {dataSource?.length ? (
            dataSource?.map((item: any, index: number) => {
              return (
                <SourceItem>
                  <div className="No">{index}</div>
                  <div className="address">{formatAddress(item,10)}</div>
                </SourceItem>
              )
            })
          ) : (
            <div className="empty">{t('No Data')}</div>
          )}
        </Source>
      </div>
      {/* <Box mt={2}>
        {dataSource?.list?.length ? (
          <CommonPage
            count={dataSource?.page?.total_count}
            page={dataSource?.page?.current_page}
            handleChange={changePageFormat}
          />
        ) : null}
      </Box> */}
    </LastWrap>
  )
}

export default Last

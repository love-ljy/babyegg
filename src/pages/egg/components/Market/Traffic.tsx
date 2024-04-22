import styled from '@emotion/styled'
import CommonPage from '../commonPage/commonPage'
import { Box } from '@mui/material'

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

interface Props {
  dataSource: any[]
}

const Traffic = (props: Props) => {
  const { dataSource = [] } = props
  return (
    <LastWrap>
      <Column>
        <div className="No">No.</div>
        <div className="address">Address</div>
        <div className="amount">Amount</div>
        <div className="time">Time</div>
      </Column>
      <Source>
        {dataSource.length ? (
          dataSource.map((item: any) => {
            return (
              <SourceItem>
                <div className="No">{item.no}</div>
                <div className="address">{item.address}</div>
                <div className="amount">{item.amount}</div>
                <div className="time">{item.time}</div>
              </SourceItem>
            )
          })
        ) : (
          <span className="empty">No Data</span>
        )}
      </Source>
      <Box mt={2}>{dataSource.length ? <CommonPage /> : null}</Box>
    </LastWrap>
  )
}
export default Traffic

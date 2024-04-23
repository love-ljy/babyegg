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

interface Props {
  dataSource: any[]
}

const Last = (props: Props) => {
  const { dataSource = [] } = props
  return (
    <LastWrap>
      <div
        style={{
          width: '100%',
        }}
      >
        <Column>
          <div>No.</div>
          <div>Address</div>
        </Column>
        <Source>
          {dataSource.length ? (
            dataSource.map((item: any) => {
              return (
                <SourceItem>
                  <div className="No">{item.no}</div>
                  <div className="address">{item.address}</div>
                </SourceItem>
              )
            })
          ) : (
            <div className="empty">No Data</div>
          )}
        </Source>
      </div>
      <Box mt={2}>{dataSource.length ? <CommonPage /> : null}</Box>
    </LastWrap>
  )
}
export default Last

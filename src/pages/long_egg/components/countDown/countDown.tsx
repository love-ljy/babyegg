import styled from '@emotion/styled'
import { Box } from '@mui/material'

const TimeWrap = styled.div`
  background: rgba(0, 0, 0, 0.71);
  box-shadow: inset 0px 0px 12.1px rgba(0, 100, 255, 0.74);
  height: 73px;
  display: flex;
  justify-content: space-around;
  padding: 0 50px;
  align-items: center;
  .time-item {
    display: flex;
    flex-direction: column;
    .counter {
      font-size: 30px;
      line-height: 26px;
    }
    .label {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`

const CountDown = () => {
  return (
    <TimeWrap>
      <div className="time-item">
        <span className="counter">31</span>
        <span className="label">hours</span>
      </div>
      <span className="counter">:</span>
      <div className="time-item">
        <span className="counter">31</span>
        <span className="label">minute</span>
      </div>
      <span className="counter">:</span>
      <div className="time-item">
        <span className="counter">31</span>
        <span className="label">second</span>
      </div>
    </TimeWrap>
  )
}
export default CountDown

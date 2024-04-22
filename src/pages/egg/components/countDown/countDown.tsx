import styled from '@emotion/styled'
import quotePng from '@imgs/quote.png'
import Image from 'next/image'

const TimeWrap = styled.div`
 border-radius: 5px;
background: rgba(0, 0, 0, 0.71);

/* Inner Shadow */
box-shadow: 0px 0px 12.1px 0px rgba(0, 100, 255, 0.74) inset;
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
  img {
    margin-top: -14px;
  }
`

const CountDown = () => {
  return (
    <TimeWrap>
      <div className="time-item">
        <span className="counter">31</span>
        <span className="label">hours</span>
      </div>
      <Image src={quotePng} width={3} height={12} alt=":" />
      <div className="time-item">
        <span className="counter">31</span>
        <span className="label">minute</span>
      </div>
      <Image src={quotePng} width={3} height={12} alt=":" />
      <div className="time-item">
        <span className="counter">31</span>
        <span className="label">second</span>
      </div>
    </TimeWrap>
  )
}
export default CountDown

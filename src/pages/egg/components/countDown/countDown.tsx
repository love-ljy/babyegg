import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import quotePng from '@imgs/quote.png'
import Image from 'next/image'
import Countdown from 'react-countdown';
import { useTranslation } from 'next-i18next'

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
interface Props {
  initialTimeInSeconds: Date
}

function CountDown({ initialTimeInSeconds }: Props) {
  // @ts-ignore
  const { t } = useTranslation('common')
  const Completionist = (completed) => {
    return !completed ;
  }

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <div> <TimeWrap>
        <div className="time-item">
          <span className="counter">{hours}</span>
          <span className="label">{t('hours')}</span>
        </div>
        <Image src={quotePng} width={3} height={12} alt=":" />
        <div className="time-item">
          <span className="counter">{minutes}</span>
          <span className="label">{t('minute')}</span>
        </div>
        <Image src={quotePng} width={3} height={12} alt=":" />
        <div className="time-item">
          <span className="counter">{seconds}</span>
          <span className="label">{t('second')}</span>
        </div>
      </TimeWrap></div>;
    }
  }

  return <div>{initialTimeInSeconds && <Countdown
    date={initialTimeInSeconds}
    renderer={renderer}
  />}</div>
}

export default CountDown

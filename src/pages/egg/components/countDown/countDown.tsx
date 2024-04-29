import { useState, useEffect } from 'react'
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
interface Props {
  initialTimeInSeconds: Date
}

function CountDown({ initialTimeInSeconds }: Props) {
  const calculateTimeLeft = (): { days: number, hours: number, minutes: number, seconds: number } => {
    const difference = +new Date(initialTimeInSeconds) - +new Date();

    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  const pad = (num: number) => `0${num}`.slice(-2)


  return <div> <TimeWrap>
    <div className="time-item">
      <span className="counter">{pad(timeLeft.hours)}</span>
      <span className="label">hours</span>
    </div>
    <Image src={quotePng} width={3} height={12} alt=":" />
    <div className="time-item">
      <span className="counter">{pad(timeLeft.minutes)}</span>
      <span className="label">minute</span>
    </div>
    <Image src={quotePng} width={3} height={12} alt=":" />
    <div className="time-item">
      <span className="counter">{pad(timeLeft.seconds)}</span>
      <span className="label">second</span>
    </div>
  </TimeWrap></div>
}

export default CountDown

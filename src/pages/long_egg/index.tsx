import { Typography } from '@mui/material'
import CountDown from './components/countDown/countDown'
import styled from '@emotion/styled'

const LongEggWrap = styled.div`
  padding: 140px 20px 30px;
`

const CountDownWrap = styled.div`
  /* margin-top: 140px; */
`

function LongEgg() {
  return (
    <div>
      <img
        src="/img/countBg.png"
        alt="countBg"
        style={{
          position: 'absolute',
          zIndex: -1,
        }}
      />
      <LongEggWrap>
        <CountDownWrap>
          <Typography>Countdown</Typography>
          <CountDown />
        </CountDownWrap>
      </LongEggWrap>
    </div>
  )
}

export default LongEgg

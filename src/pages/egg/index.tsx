import { Typography, Box } from '@mui/material'
import styled from '@emotion/styled'
import CountDown from './components/countDown/countDown'
import Participation from './components/Participation/Participation'
import Market from './components/Market/Market'
import Personal from './components/Personal/Personal'

const LongEggWrap = styled.div`
  color: #fff;
  /* background-color: #fff; */
  .bg {
    background-image: url('/img/countBg.png');
    background-size: cover;
    height: 475px;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
`

const Content = styled.div`
  padding: 100px 20px 30px;
`

function LongEgg() {
  return (
    <LongEggWrap>
      <div className="bg"></div>
      <Content>
        <Typography fontSize={25}>Countdown</Typography>
        <CountDown />
        <Box mt={2}>
          <Participation />
        </Box>
        <Box mt={6}>
          <Market />
        </Box>
        <Box mt={6}>
          <Personal />
        </Box>
      </Content>
    </LongEggWrap>
  )
}

export default LongEgg

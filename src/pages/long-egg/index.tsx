import { Typography, Box } from '@mui/material'
import styled from '@emotion/styled'
import CountDown from './components/countDown/countDown'
import Participation from './components/Participation/Participation'
import Market from './components/Market/Market'

const LongEggWrap = styled.div`
  background-image: url('@imgs/countBg.png');
  background-size: cover;
  height: 475px;
`

const Content = styled.div`
  padding: 100px 20px 30px;
`

function LongEgg() {
  return (
    <LongEggWrap>
      <Content>
        <Typography fontSize={25}>Countdown</Typography>
        <CountDown />
        <Box mt={2}>
          <Participation />
        </Box>
        <Box mt={2}>
          <Market />
        </Box>
      </Content>
    </LongEggWrap>
  )
}

export default LongEgg

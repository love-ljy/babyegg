import { Typography, Box } from '@mui/material'
import styled from '@emotion/styled'
import CountDown from './components/countDown/countDown'
import Participation from './components/Participation/Participation'

const LongEggWrap = styled.div`
  background-image: url('/img/countBg.png');
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
      </Content>
    </LongEggWrap>
  )
}

export default LongEgg

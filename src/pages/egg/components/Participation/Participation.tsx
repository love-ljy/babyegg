import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import distributePng from '@imgs/distribute.png'
import MaticIcon from '@icons/matic.svg'
import Image from 'next/image'

const ParticipationWrap = styled.div`
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  border: 1px solid rgba(0, 100, 255, 1);
  box-shadow: inset 0px 0px 12.1px rgba(0, 100, 255, 0.74);
  padding: 12px 14px 12px 14px;
  .count {
    font-size: 30px;
  }
  .img {
    margin-bottom: 10px;
  }
  .bot {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  .parti {
    display: flex;
    flex-direction: column;
    text-align: left;
    .label {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`

const Mid = styled.div`
  padding: 6px 36px;
  border-radius: 51px;
  background: linear-gradient(180deg, rgba(246, 26, 126, 1) 0%, rgba(246, 26, 126, 0.3) 100%);
`

const Bot = styled.div`
  margin-top: 15px;
  padding: 6px 36px;
  border-radius: 51px;
  background: linear-gradient(180deg, rgba(50, 32, 208, 1) 0%, rgba(26, 16, 106, 1) 100%);
`

const Participation = () => {
  return (
    <ParticipationWrap>
      <Top>
        <div className="parti">
          <span className="label">Master Participation</span>
          <span className="count">100</span>
        </div>
        <div className="parti">
          <span className="label">Egg Participation</span>
          <span className="count">100</span>
        </div>
      </Top>
      <Mid>
        <Typography fontSize={15} fontWeight={700}>
          Total Distribute
        </Typography>
        <div className="bot">
          <span className="count">100,000,000</span>
          <div className="img">
            <Image src={distributePng} width={24} height={24} alt="distribute" />
          </div>
        </div>
      </Mid>
      <Bot>
        <Typography fontSize={15} fontWeight={700}>
          Total Prize Pool
        </Typography>
        <div className="bot">
          <span className="count">100,000,000</span>
          <div className="img">
            <MaticIcon />
          </div>
        </div>
      </Bot>
    </ParticipationWrap>
  )
}
export default Participation

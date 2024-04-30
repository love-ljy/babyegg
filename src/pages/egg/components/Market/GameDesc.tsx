import styled from '@emotion/styled'
import CommonPage from '../commonPage/commonPage'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

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
  text-align: left;
  font-size: 13px;
`

const Column = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  background: rgba(22, 34, 54, 1);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  padding: 2px;
  .No {
    flex: 1 6%;
    text-align: center;
  }
  .address {
    flex: 1 40%;
    text-align: center;
  }
  .amount {
    flex: 1 20%;
    text-align: center;
  }
  .time {
    flex: 1 20%;
    text-align: center;
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
    flex: 1 6%;
    text-align: center;
  }
  .address {
    flex: 1 40%;
    text-align: center;
  }
  .amount {
    flex: 1 20%;
    text-align: center;
  }
  .time {
    flex: 1 20%;
    text-align: center;
  }
`

const GameDesc = () => {
          // @ts-ignore
          const { t } = useTranslation('common')
  return (
    <LastWrap>
      <div
        style={{
          width: '100%',
        }}
      >
          <div className="mechanism"> {t("Mechanism Explanation")}: </div>
          <div>
            {t(`Lucky Reward: Each egg purchase provides a chance to win an airdrop reward of 100-1000
            $MATIC (1% probability).Initial Value: After purchase, the egg's initial value is zero,
            which increases as more people buy.Early Opening: Before the end of the current game
            round, players can choose to open their egg to claim double the current value, after
            which the egg will disappear.Repurchase: Players can use the $BabyLoong from opened eggs
            to buy more eggs. The old eggs still exist but their value resets to zero. Once
            activated, you can use held $BabyLoong to purchase eggs.Countdown Increase: Each
            purchase or opening of an egg increases the countdown timer by 30 seconds (initially set
            at 24 hours). When the timer reaches zero, the last 100 players to buy eggs evenly split
            a prize pool, and the very last buyer receives an extra large reward.Automatic Opening:
            When the countdown ends, all eggs automatically open, and players receive the current
            value of $BabyLoong contained within.Game Reset: After the round ends, a new game round
            begins.`)}
          </div>
          </div>
    </LastWrap>
  )
}
export default GameDesc

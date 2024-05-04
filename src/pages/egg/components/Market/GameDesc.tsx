import styled from '@emotion/styled'
import CommonPage from '../commonPage/commonPage'
import { Typography, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

const LastWrap = styled.div`
  display: flex;
  max-height: 580px;
  overflow-y: scroll;
  /* overflow: hidden; */
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  border: 1px solid rgba(143, 13, 245, 1);
  box-shadow: inset 0px 0px 12.1px rgba(143, 13, 245, 1);
  padding: 10px;
  position: relative;
  text-align: left;
  font-size: 13px;

`
const InfoHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  font-size: 12px;
  background-color: #4E177F;
  text-align: center;
  & p{
    padding: 4px 0;
    font-size: 12px;
  }
`
const InviteHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  font-size: 12px;
  background-color: #4E177F;
  text-align: center;
  & p{
    padding: 4px 0;
    font-size: 12px;
  }
`
const InfoContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  font-size: 12px;
  border: 1px solid #fff;
  text-align: center;
  & p{
    
    height: 40px;
    align-content: center;
    font-size: 12px;
  }
  & p:nth-child(2){
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
  }
`

const InviteContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  font-size: 12px;
  border: 1px solid #fff;
  text-align: center;
  & p{
    font-size: 12px;
    padding: 4px 0;
  }
  & p:nth-child(2){
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
  }
`

const FlexRow = styled.div`
  width: 100%;
  /* display: flex;
  justify-content: start; */
  font-size: 13px;
  & span{
    color: #fff;
    font-size: 14px;
    font-weight: 600;
  }
  & i{
    color: rgba(255, 255, 255, 0.767);
    font-style: normal;
    font-size: 12px;
    font-weight: 300;
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
  const infoList = [
    { num: 30, level: 10, downLevel: 15 },
    { num: 70, level: 12, downLevel: 18 },
    { num: 150, level: 14, downLevel: 21 },
    { num: 300, level: 16, downLevel: 24 },
    { num: 500, level: 20, downLevel: 30 },
    { num: 1000, level: 20, downLevel: 30 },
    { num: 3000, level: 20, downLevel: 30 }
  ]
  const inviteList = [
    { num: 'First', level: 20, downLevel: 15 },
    { num: 'Second', level: 10, downLevel: 18 },
    { num: 'Third', level: 3, downLevel: 21 },
    { num: 'Forth', level: 3, downLevel: 24 },
    { num: 'Fifth', level: 10, downLevel: 30 },
    { num: 'Sixth', level: 2, downLevel: 30 },
    { num: 'Seventh', level: 2, downLevel: 30 }
  ]
  const rewardList = [
    { num: 'Below 500 $Matic', level: null, downLevel: 60 },
    { num: '500 $Matic or Above', level: 5, downLevel: 50 },
    { num: '1000 $Matic or Above', level: 8, downLevel: 40 },
    { num: '3000 $Matic or Above', level: 10, downLevel: 30 },
  ]
  const loonList = [
    { num: 'Novice', level: 100, downLevel: 60 },
    { num: 'Elite', level: 300, downLevel: 50 },
    { num: 'Expert', level: 500, downLevel: 40 },
    { num: 'Master', level: 1000, downLevel: 30 },
    { num: 'Grandmaster', level: 3000, downLevel: 30 },
  ]
  return (
    <LastWrap>
      <div
        style={{
          width: '100%',
        }}
      >
        <div>
          <Typography mb={3}>{t('Mechanism Explanation')}: </Typography>
          <FlexRow><span>{t('Lucky Reward')}</span>: <i>{t('Each egg purchase provides a chance to win an airdrop reward of 100-1000 $MATIC (1% probability)')}</i>.</FlexRow>
          <FlexRow><span>{t('Initial Value')}</span>: <i>{t("After purchase, the egg's initial value is zero, which increases as more people buy")} </i></FlexRow>
          <FlexRow><span>{t('Early Opening')}</span>: <i>{t("Before the end of the current game round, players can choose to open their egg to claim double the current value, after which the egg will disappear")}</i></FlexRow>
          <FlexRow><span>{t('Repurchase')}</span>: <i>{t("Players can use the $BabyLoong from opened eggs to buy more eggs. The old eggs still exist but their value resets to zero. Once activated, you can use held $BabyLoong to purchase eggs")}</i></FlexRow>
          <FlexRow><span>{t('Countdown Increase')}</span>: <i>{t("Each purchase or opening of an egg increases the countdown timer by 30 seconds (initially set at 24 hours) When the timer reaches zero, the last 100 players to buy eggs evenly split a prize pool, and the very last buyer receives an extra large reward")}</i></FlexRow>
          <FlexRow><span>{t('Automatic Opening')}</span>: <i>{t("When the countdown ends, all eggs automatically open, and players receive the current value of $BabyLoong contained within")}</i></FlexRow>
        </div>
        <Typography my={3}>{t('Public Sequence Explanation')}:</Typography>
        <InfoHeader>
          <Typography>{t('Expenditure')}</Typography>
          <Typography>{t("Upper LVL")}</Typography>
          <Typography>{t('Downward LVL')}</Typography>
        </InfoHeader>
        {infoList.map(e => {
          return (
            <InfoContent key={e.num}>
              <Typography>{e.num} $Matic</Typography>
              <Typography>{e.level} {t('levels')}</Typography>
              <Typography>{e.downLevel} {t('levels')}</Typography>
            </InfoContent>
          )
        })}
        <Box my={2}>
          <FlexRow><span>1.{t('Egg Purchase')}</span>: <i>{t('Invest $MATIC to buy an egg, each valued at 10 $MATIC.')}</i>.</FlexRow>
          <FlexRow><span>2.{t('Public Sequence')}</span>: <i>{t("After purchase, the $MATIC used to buy the egg is distributed to the previous 30 addresses, each receiving 1%, and to the following 20 addresses, each also receiving 1%.")} </i></FlexRow>
          <FlexRow><span>3.{t('Automatic Sequence')}</span>: <i>{t("Buyers of eggs are automatically entered into the public sequence system, arranged according to the time of purchase.")}</i></FlexRow>
          <FlexRow><span>4.{t('Reward Distribution')}</span>: <i>{t("The $MATIC spent by users on purchasing eggs is distributed according to their position in the public sequence, receiving rewards from up to 20 addresses above them and 30 addresses below them")}</i></FlexRow>
          <FlexRow><span>5.{t('Repurchase Rewards')}</span>: <i>{t("Each purchase or opening of an egg increases the countdown timer by 30 seconds (initially set at 24 hours) When the timer reaches zero, the last 100 players to buy eggs evenly split a prize pool, and the very last buyer receives an extra large reward")}</i></FlexRow>
          <FlexRow><span>{t('Automatic Opening')}</span>: <i>{t("If a user repurchases eggs, rewards are distributed based on their current position in the public sequence")}</i></FlexRow>
        </Box>
        <Box my={2}>
          <FlexRow><span>1.{t('Long Egg Income')}</span>: <i> - 40%</i>.</FlexRow>
          <FlexRow><span>2.{t('Income Reserve for Manual Egg Unlock')}</span>: <i> - 40% </i></FlexRow>
          <FlexRow><span>3.{t('Lucky Reward')}</span>: <i> - 5% ($Matic)</i></FlexRow>
          <FlexRow><span>4.{t('The Last Egg Hatcher')}</span>: <i> - 5% ($Matic)</i></FlexRow>
          <FlexRow><span>5.{t("The 100")}</span>: <i> - 10% ($Matic)</i></FlexRow>
        </Box>
        <Typography my={3}>{t('Invitation Reward Explanation')}:</Typography>
        <InviteHeader>
          <Typography>{t('Referrals(Gen)')}</Typography>
          <Typography>{t("Percentage")}</Typography>
        </InviteHeader>
        {inviteList.map(e => {
          return (
            <InviteContent key={e.num}>
              <Typography>{t(e.num)}</Typography>
              <Typography>{e.level}%</Typography>
            </InviteContent>
          )
        })}
        <Box my={2}>
          <FlexRow><span>1.{t('Referral Confirmation')}</span>: <i>{t('The referral relationship is confirmed by binding the wallet address of the inviter')}</i>.</FlexRow>
          <FlexRow><span>2.{t('Reward Eligibility')}</span>: <i>{t("An individual must accumulate personal expenditures of 500 $MATIC and refer at least 5 valid addresses to qualify for rewards from the 5th to the 7th generations")} </i></FlexRow>
         </Box>
         <Typography my={3}>{t('Withdrawal & Reinvest Explanation')}:</Typography>
        <InfoHeader>
          <Typography>{t('Total')}</Typography>
          <Typography>{t("Direct Referral")}</Typography>
          <Typography>{t('Auto Reinvest')}</Typography>
        </InfoHeader>
        {rewardList.map((e,i) => {
          return (
            <InfoContent key={e.num}>
              <Typography>{t(e.num)}</Typography>
              <Typography>{e.level} {i>0?t('Valid Addresses'):'-'}</Typography>
              <Typography>{e.downLevel} %</Typography>
            </InfoContent>
          )
        })}
         <Box my={2}>
          <FlexRow><span>1.{t('Automatic Reinvestment on Withdrawal')}</span>: <i>{t('Choosing to withdraw triggers automatic reinvestment')}</i>.</FlexRow>
          <FlexRow><span>2.{t('Reinvestment Benefits')}</span>: <i>{t("Although automatic reinvestment does not directly grant new eggs, it still yields dynamic rewards and corresponding expenditure amounts")} </i></FlexRow>
          <FlexRow><span>3.{t('Purchasing More Eggs')}</span>: <i>{t("Deciding to use $BabyLoong within the eggs to buy more eggs not only expands your collection but also earns additional bonuses")}</i></FlexRow>
          <FlexRow><span>4.{t('Withdrawal Fees')}</span>: <i>{t("The platform charges a 5% handling fee on withdrawals as a revenue source, and $BabyLoong can be used to purchase eggs")}</i></FlexRow>
       </Box>
       <Typography mt={3}>{t('Long Egg Leaderboard Explanation')}:</Typography>
       <Typography fontSize="12px" fontWeight={300} my={1}>{t('Rank users globally based on the total number of eggs purchased in real time')}</Typography>
       {loonList.map(e => {
          return (
            <InviteContent key={e.num}>
              <Typography>{t(e.num)}</Typography>
              <Typography>{e.level}{t('Eggs or Above')}</Typography>
            </InviteContent>
          )
        })}
        <Typography mt={3}>{t('Loong Master Leaderboard Explanation')}:</Typography>
         <Box my={2}>
          <FlexRow> 1.<i>{t('The leaderboard will be updated based on the sum of new additions by department, featuring weekly rankings (new additions each week) and monthly rankings (new additions each month)')}</i>.</FlexRow>
          <FlexRow> 2.<i>{t("The top 100 users on the weekly leaderboard will receive dividends once a week, and the top 100 users on the monthly leaderboard will receive dividends once a month")} </i></FlexRow>
          <FlexRow>3.<i>{t("New additions refer to the number of eaas purchased")}</i></FlexRow>
       </Box>
      </div>
    </LastWrap>
  )
}
export default GameDesc

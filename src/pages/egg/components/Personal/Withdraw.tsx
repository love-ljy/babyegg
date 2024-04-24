import { useState } from 'react'
import styled from '@emotion/styled'
import CopyIcon from '@icons/copy.svg'
import MaticIcon from '@icons/matic.svg'
import EggTokenIcon from '@icons/eggToken.svg'
import { useSelector } from 'react-redux'
import { selectWalletInfo } from '@store/user'
import { toast } from 'react-toastify'

const InvitationWrap = styled.div`
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  border: 1px solid rgba(26, 0, 187, 1);
  box-shadow: inset 0px 0px 12.1px rgba(26, 0, 187, 1);
  padding: 25px 12px;
  .title {
    font-size: 15px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 4px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    .draw {
      border-radius: 5px;
      background: rgba(50, 32, 208, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 15px 6px 15px;
      margin-bottom: 10px;
      margin-left: 10px;
    }
    .draw2 {
      border-radius: 5px;
      background: linear-gradient(90deg, rgba(50, 32, 208, 1) 0%, rgba(246, 26, 126, 1) 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 15px 6px 15px;
      margin-bottom: 10px;
      margin-left: 10px;
    }
  }
  .noteWrap {
    text-align: left;
    font-size: 10px;
    .note {
      text-decoration: underline;
      margin-bottom: 10px;
    }
  }
`
const RowLeft = styled.div`
  border-radius: 5px;
  background: rgba(0, 0, 0, 1);
  border: 1px solid rgba(26, 0, 187, 1);
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  flex: 1;
  .text {
    /* font-size: 10px; */
    /* color: rgba(255, 255, 255, 0.5); */
    text-align: left;
  }
`
const Withdraw = () => {
  const walletInfo = useSelector(selectWalletInfo)

  const handleWithDraw1 = () => {
    if (!walletInfo) {
      toast.warn('请链接钱包')
      return
    }
  }

  const handleWithDraw2 = () => {
    if (!walletInfo) {
      toast.warn('请链接钱包')
      return
    }
  }
  return (
    <InvitationWrap>
      <div className="title">Your Current Earning Balance</div>
      <div className="row">
        <RowLeft>
          <span className="text">10,000.00</span>
          <MaticIcon />
        </RowLeft>
        <div className="draw" onClick={handleWithDraw1}>
          Withdraw
        </div>
      </div>
      <div className="row">
        <RowLeft>
          <span className="text">10,000.00</span>
          <EggTokenIcon />
        </RowLeft>
        <div className="draw2" onClick={handleWithDraw2}>
          Withdraw
        </div>
      </div>
      <div className="noteWrap">
        <div className="note">Note:</div>
        <div>
          The platform will charge a 5% fee on withdrawals as revenue.When choosing to withdraw
          $Matic, a portion of the amount will be automatically reinvested.
        </div>
      </div>
    </InvitationWrap>
  )
}

export default Withdraw

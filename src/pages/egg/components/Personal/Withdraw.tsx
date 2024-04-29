import { useState } from 'react'
import styled from '@emotion/styled'
import CopyIcon from '@icons/copy.svg'
import MaticIcon from '@icons/matic.svg'
import EggTokenIcon from '@icons/eggToken.svg'
import { useSelector } from 'react-redux'
import { selectWalletInfo } from '@store/user'
import { toast } from 'react-toastify'
import CommonModal from '../commonModal/commonModal'
import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

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
      background: rgba(184, 3, 139, 1);
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

const ModalMain = styled.div`
  width: 260px;
  img {
    margin: 0 auto 20px;
  }
  .divied {
    height: 2px;
    background-color: rgba(143, 13, 245, 0.3);
    margin: 10px 0;
  }
  .title {
    text-align: left;
    font-size: 10px;
    margin-bottom: 20px;
    color: rgba(255, 255, 255);
  }
  .countWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    font-size: 10px;
    .label {
      color: rgba(255, 255, 255, 0.5);
    }
    .r {
      display: flex;
      align-items: center;
      span {
        margin-right: 4px;
      }
    }
  }
  .txt {
    font-size: 10px;
    text-align: center;
    margin-top: 50px;
    color: rgba(255, 255, 255, 0.5);
  }
  .mid {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .equ {
      font-size: 15px;
      font-weight: 700;
      color: rgba(143, 13, 245, 1);
    }
    .box {
      display: flex;
      align-items: center;
      span {
        margin-right: 4px;
      }
    }
  }
`

const BtnWrap = styled.div<{ width?: string; isCancel?: boolean }>`
  display: flex;
`

const BuyBtn = styled(Button)<{ width?: string; isCancel?: boolean }>`
  width: 80%;
  height: 30px;
  border-radius: 32px;
  background: rgba(135, 135, 135, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-weight: 700px;
  font-size: 15px;
  margin: 20px 10px 0;
  &.confirm {
    background: rgba(213, 27, 140, 1);
  }
`

const Withdraw = () => {
        // @ts-ignore
const { t } = useTranslation('common')
  const [visible, setVisible] = useState(false)
  const [withdrawType, setWithdrawType] = useState('')
  const walletInfo = useSelector(selectWalletInfo)

  const openModal = (type: string) => {
    if (!walletInfo) {
      toast.warn('请链接钱包')
      return
    }
    setWithdrawType(type)
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
  }

  const handleWithdraw = () => {}

  return (
    <InvitationWrap>
      <div className="title">{t('Your Current Earning Balance')}</div>
      <div className="row">
        <RowLeft>
          <span className="text">10,000.00</span>
          <MaticIcon />
        </RowLeft>
        <div className="draw" onClick={() => openModal('babyloong')}>
          {t('Withdraw')}
        </div>
      </div>
      <div className="row">
        <RowLeft>
          <span className="text">10,000.00</span>
          <EggTokenIcon />
        </RowLeft>
        <div className="draw2" onClick={() => openModal('Matic')}>
        {t('Withdraw')}
        </div>
      </div>
      <div className="noteWrap">
        <div className="note">{t('Note')}:</div>
        <div>
          {t(`The platform will charge a 5% fee on withdrawals as revenue.When choosing to withdraw
          $Matic, a portion of the amount will be automatically reinvested.`)}
        </div>
      </div>
      <CommonModal visible={visible} setVisible={setVisible} footer={<span></span>}>
        <ModalMain>
          {withdrawType === 'babyloong' ? (
            <div>
              <div className="title">{t('The platform will charge a 5% fee on withdrawals as revenue')}</div>
              <div className="countWrap">
                <span className="label">{t('Withdrawal $ Babyloong Amount')}</span>
                <span>100</span>
              </div>
              <div className="countWrap">
                <span className="label">{t('Fee')}</span>
                <span>10,000,00</span>
              </div>
              <div className="divied"></div>
              <div className="countWrap">
                <span>{t('Actual Amout Received"')}</span>
                <div className="r">
                  <span>10,000,00</span>
                  <EggTokenIcon />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="title">{t('*5%Fee On Withdrawal Amount')}</div>
              <div className="countWrap">
                <span className="label">{t('Withdrawal $Matic  Amount')}</span>
                <span>100</span>
              </div>
              <div className="countWrap">
                <span className="label">{t('Fee')}</span>
                <span>10,000,00</span>
              </div>
              <div className="countWrap">
                <span className="label">{t('Total')}</span>
                <span>10,000,00</span>
              </div>
              <div className="divied"></div>
              <div className="countWrap">
                <span className="label">{t('Automatic reinvestment')} (60%)</span>
                <span>10,000,00</span>
              </div>
              <div className="divied"></div>
              <div className="countWrap">
                <span>{t('Actual Amout Received')}</span>
                <div className="r">
                  <span>10,000,00</span>
                  <EggTokenIcon />
                </div>
              </div>
            </div>
          )}
          <BtnWrap>
            <BuyBtn className="confirm" onClick={handleWithdraw}>
              {t('YES')}
            </BuyBtn>
            <BuyBtn onClick={closeModal}>{t('NO')}</BuyBtn>
          </BtnWrap>
        </ModalMain>
      </CommonModal>
    </InvitationWrap>
  )
}

export default Withdraw

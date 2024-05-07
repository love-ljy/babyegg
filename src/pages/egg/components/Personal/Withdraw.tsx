import { useEffect, useState, useCallback, useMemo } from 'react'
import styled from '@emotion/styled'
import MaticIcon from '@icons/matic.svg'
import EggTokenIcon from '@icons/eggToken.svg'
import { useSelector } from 'react-redux'
import { selectWalletInfo, selectAuthToken, selectIsBindParent } from '@store/user'
import { toast } from 'react-toastify'
import CommonModal from '../commonModal/commonModal'
import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { getIncomeReceiveNumber, incomeReceive } from '@utils/api'
import { selectGamingId } from '@store/user'
import useMaticReward from '@hooks/useMaticReward'
import useBabyLongReward from '@hooks/useBabyLongReward'
import useGetBalance from '@hooks/useGetBalance'
import { BabyToken, MainContractAddr } from '@config/contants'
import { useAccount } from 'wagmi'
import { getBalanceAmount } from '@utils/formatterBalance'
import BigNumber from 'bignumber.js'

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

const BtnWrap = styled.div<{ width?: string; iscancel?: boolean }>`
  display: flex;
`

const BuyBtn = styled(Button)<{ width?: string; iscancel?: boolean }>`
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
  const [btnLoading, setLoading] = useState(false)
  const [withdrawType, setWithdrawType] = useState('')
  const walletInfo = useSelector(selectWalletInfo)
  const [maticMidReward, setMaticMidReward] = useState<any>('')
  const [babyLongReward, setBabyLongReward] = useState<any>('')
  const { userBalance } = useGetBalance()

  const gamingId: any = useSelector(selectGamingId)

  const { address } = useAccount()

  const token = useSelector(selectAuthToken)
  const isBindParent: any = useSelector(selectIsBindParent)

  const { maticContractReward, refetch, isMaticLoading, setMaticParam } = useMaticReward({
    onSuccess() {
      toast.success('提取成功')
      userBalance.refetch()
      refetch()
      fetchUserRewardInfo()
      setVisible(false)
      setMaticParam([])
    },
    onError(error, rawError) {
      console.log('maticWithDraw rawError', rawError)
      toast.warn('提取失败')
      setMaticParam([])
    },
    args: [[+gamingId]],
    mutationError() {
      setMaticParam([])
      setLoading(false)
    },
  })

  const { isBabyLongLoading, setBabyLongParam } = useBabyLongReward({
    onSuccess() {
      toast.success('提取成功')
      userBalance.refetch()
      fetchUserRewardInfo()
      setVisible(false)
      setBabyLongParam([])
    },
    onError(error, rawError) {
      console.log('babyLongWithdraw rawError', rawError)
      toast.warn('提取失败')
      setBabyLongParam([])
    },
    mutationError() {
      setBabyLongParam([])
      setLoading(false)
    },
  })

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

  const handleWithdraw = () => {
    if (withdrawType === 'Matic') {
      handleMatic()
    } else {
      handleBabyLong()
    }
  }

  const handleMatic = async () => {
    try {
      setLoading(true)
      const res: any = await incomeReceive({
        type: -1,
        coin_type: 0,
      })
      if (res.code === 0) {
        const { oid, token_amount, _deadline, v, r, s } = res.data
        setMaticParam([MainContractAddr, +token_amount, +_deadline, +oid, v, r, s])
      } else {
        toast.warn(res.msg)
        setLoading(false)
      }
    } catch (e) {
      console.log('matic withdraw error', e)
      toast.warn('网络错误')
      setLoading(false)
    }
  }

  const handleBabyLong = async () => {
    try {
      setLoading(true)
      const res: any = await incomeReceive({
        type: -1,
        coin_type: 1,
      })
      if (res.code === 0) {
        const { oid, token_amount, _deadline, v, r, s } = res.data
        setBabyLongParam([BabyToken, +token_amount, +_deadline, +oid, +v, r, s])
      } else {
        toast.warn(res.msg)
        setLoading(false)
      }
    } catch (e) {
      console.log('baby withdraw error', e)
      toast.warn('网络错误')
      setLoading(false)
    }
  }

  const fetchUserRewardInfo = useCallback(async () => {
    if (address && isBindParent && token) {
      try {
        const res: any = await getIncomeReceiveNumber(-1)
        if (res.code === 0) {
          setMaticMidReward(res.data.find(v => v.coin_type === '0')?.number || 0)
          setBabyLongReward(res.data.find(v => v.coin_type === '1')?.number || 0)
        } else {
          toast.warn(res.msg)
        }
      } catch (e) {
        console.log('e', e)
        toast.warn('网络错误')
      }
    }
  }, [address && isBindParent && token])

  const maticWithdrawInfo = useMemo(() => {
    const mergeMaticBalance =
      (maticContractReward ? +getBalanceAmount(maticContractReward as BigNumber)?.toString() : 0) +
        +maticMidReward || 0
    const maticFee = mergeMaticBalance * 0.05 || 0
    const maticTotal = mergeMaticBalance - maticFee || 0
    const maticRepeat = maticTotal * 0.6 || 0
    const maticReal = maticTotal - maticRepeat || 0
    return {
      mergeMaticBalance,
      maticFee,
      maticTotal,
      maticRepeat,
      maticReal,
    }
  }, [maticContractReward, maticMidReward])

  const babyLongWithdrawInfo = useMemo(() => {
    const babyLongFee = +babyLongReward * 0.05 || 0
    const babyLongReal = +babyLongReward - babyLongFee
    return {
      babyLongFee,
      babyLongReal,
    }
  }, [babyLongReward])

  useEffect(() => {
    fetchUserRewardInfo()
  }, [fetchUserRewardInfo])

  return (
    <InvitationWrap>
      <div className="title">{t('Your Current Earning Balance')}</div>
      <div className="row">
        <RowLeft>
          <span className="text">{maticWithdrawInfo.mergeMaticBalance}</span>
          <MaticIcon />
        </RowLeft>
        <div className="draw" onClick={() => openModal('Matic')}>
          {t('Withdraw')}
        </div>
      </div>
      <div className="row">
        <RowLeft>
          <span className="text">{babyLongReward}</span>
          <EggTokenIcon />
        </RowLeft>
        <div className="draw2" onClick={() => openModal('BabyLong')}>
          {t('Withdraw')}
        </div>
      </div>
      <div className="noteWrap">
        <div className="note">{t('Note')}:</div>
        <div>
          {t(`The platform will charge a 5% fee on withdrawals as revenue`)}.{' '}
          {t(
            `When choosing to withdraw $Matic,a portion of the amount will be automatically reinvested`
          )}
        </div>
      </div>
      <CommonModal visible={visible} setVisible={setVisible} footer={<span></span>}>
        <ModalMain>
          {withdrawType === 'BabyLong' ? (
            <div>
              <div className="title">
                {t('The platform will charge a 5% fee on withdrawals as revenue')}
              </div>
              <div className="countWrap">
                <span className="label">{t('Withdrawal $ Babyloong Amount')}</span>
                <span>{babyLongReward}</span>
              </div>
              <div className="countWrap">
                <span className="label">{t('Fee')}</span>
                <span>{babyLongWithdrawInfo.babyLongFee}</span>
              </div>
              <div className="divied"></div>
              <div className="countWrap">
                <span>{t('Actual Amout Received"')}</span>
                <div className="r">
                  <span>{babyLongWithdrawInfo.babyLongReal}</span>
                  <EggTokenIcon />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="title">{t('*5%Fee On Withdrawal Amount')}</div>
              <div className="countWrap">
                <span className="label">{t('Withdrawal $Matic  Amount')}</span>
                <span>{maticWithdrawInfo.mergeMaticBalance}</span>
              </div>
              <div className="countWrap">
                <span className="label">{t('Fee')}</span>
                <span>{maticWithdrawInfo.maticFee}</span>
              </div>
              <div className="countWrap">
                <span className="label">{t('Total')}</span>
                <span>{maticWithdrawInfo.maticTotal}</span>
              </div>
              <div className="divied"></div>
              <div className="countWrap">
                <span className="label">{t('Automatic reinvestment')} (60%)</span>
                <span>{maticWithdrawInfo.maticRepeat}</span>
              </div>
              <div className="divied"></div>
              <div className="countWrap">
                <span>{t('Actual Amout Received')}</span>
                <div className="r">
                  <span>{maticWithdrawInfo.maticReal}</span>
                  <EggTokenIcon />
                </div>
              </div>
            </div>
          )}
          <BtnWrap>
            <BuyBtn
              className="confirm"
              disabled={isMaticLoading || isBabyLongLoading || btnLoading}
              onClick={handleWithdraw}
            >
              {isMaticLoading || isBabyLongLoading || btnLoading ? t('Loading...') : t('YES')}
            </BuyBtn>
            <BuyBtn onClick={closeModal}>{t('NO')}</BuyBtn>
          </BtnWrap>
        </ModalMain>
      </CommonModal>
    </InvitationWrap>
  )
}

export default Withdraw

import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import MaticIcon from '@icons/matic.svg'
import EggTokenIcon from '@icons/eggToken.svg'
import { useSelector } from 'react-redux'
import { selectWalletInfo } from '@store/user'
import { toast } from 'react-toastify'
import CommonModal from '../commonModal/commonModal'
import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { getIncomeReceiveNumber, incomeReceive } from '@utils/api'
import { selectGamingId } from '@store/user'
import useMaticReward from '@hooks/useMaticReward'
import useBabyLongReward from '@hooks/useBabyLongReward'
import useGetBalance from '@hooks/useGetBalance'
import { formatUnits } from 'viem'
import useAllowance from '@hooks/useAllowance'
import { BabyToken, withDrawAddr, BurnContractAddr } from '@config/contants'

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
  const [approveLoading, setApproveLoading] = useState(false) // approve
  const [withdrawType, setWithdrawType] = useState('')
  // const [babyLongParam, setBabyLongParam] = useState<any>([])
  const walletInfo = useSelector(selectWalletInfo)
  const [maticMidReward, setMaticMidReward] = useState<any>('')
  const [babyLongReward, setBabyLongReward] = useState<any>('')
  const gamingId: any = useSelector(selectGamingId)
  const { userBalance } = useGetBalance()

  const {
    allowSpendingTokens: babyLongApprove,
    isAllowing: babyLongAllowLoading,
    allowance: babyLongAllowance,
  } = useAllowance(BabyToken, withDrawAddr)
  const {
    allowSpendingTokens: maticApprove,
    isAllowing: maticAllowLoading,
    allowance: maticAllowance,
  } = useAllowance(BurnContractAddr, withDrawAddr)

  const { maticContractReward, refetch, isMaticLoading, maticWithDraw, maticDrawEstimatedGas, setMaticParam } =
    useMaticReward({
      gamingId,
      onSuccess() {
        toast.success('提取成功')
        userBalance.refetch()
        refetch()
        fetchUserRewardInfo()
      },
      onError(error, rawError) {
        console.log('maticWithDraw rawError', rawError)
        toast.warn('提取失败')
      },
      args: [[+gamingId]],
    })

  const {
    isBabyLongLoading,
    babyLongWithdraw,
    babyLongDrawEstimatedGas,
    babyLongParam,
    setBabyLongParam,
  } = useBabyLongReward({
    onSuccess() {
      toast.success('提取成功')
      userBalance.refetch()
      fetchUserRewardInfo()
      setVisible(false)
    },
    onError(error, rawError) {
      console.log('babyLongWithdraw rawError', rawError)
      toast.warn('提取失败')
    },
    // args: babyLongParam,
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

  const fetchUserRewardInfo = async () => {
    try {
      const res: any = await getIncomeReceiveNumber(-1)
      if (res.code === 0) {
        setMaticMidReward(res.data.find(v => v.coin_type === '0')?.number || 0)
        setBabyLongReward(res.data.find(v => v.coin_type === '1')?.number || 0)
      } else {
        toast.warn('网络错误')
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
    }
  }

  const handleWithdraw = () => {
    if (withdrawType === 'Matic') {
      handleMatic()
    } else {
      handleBabyLong()
    }
  }

  const handleMatic = () => {
    const estimatedGasInFloat = maticDrawEstimatedGas
      ? parseFloat(formatUnits(maticDrawEstimatedGas, walletInfo?.decimals))
      : null
    if (!estimatedGasInFloat) {
      toast.warn("Couldn't estimate gas")
      setLoading(false)
      return
    }
    if (0 + estimatedGasInFloat > walletInfo?.balance) {
      toast.warn('Insufficient balance for gas')
      setLoading(false)
      return
    }
    maticWithDraw()
  }

  const handleBabyLong = async () => {
    try {
      setLoading(true)
      const res: any = await incomeReceive({
        type: -1,
        coin_type: 1,
      })
      if (res.code === 0) {
        console.log('res.data', res.data)
        const { oid, token_amount, _deadline, v, r, s } = res.data
        // const estimatedGasInFloat = babyLongDrawEstimatedGas
        //   ? parseFloat(formatUnits(babyLongDrawEstimatedGas, walletInfo?.decimals))
        //   : null
        // if (!estimatedGasInFloat) {
        //   toast.warn("Couldn't estimate gas")
        //   setLoading(false)
        //   return
        // }
        // if (0 + estimatedGasInFloat > walletInfo?.balance) {
        //   toast.warn('Insufficient balance for gas')
        //   setLoading(false)
        //   return
        // }
        setBabyLongParam([BabyToken, +token_amount, +_deadline, +oid, +v, r, s])
        // setBabyLongParam([
        //   63,
        //   190000000000000000000,
        //   1714741962,
        //   '28',
        //   '0x5cfe4edb1cd74814744209a9d832dc93eb877be3e9f31ab82fda90ebd0dae805',
        //   '0x538388de0edb82d9336367638162890b0f48889d284a5d65411d088ab1c9e21a',
        // ])
      } else {
        toast.warn(res.msg)
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
    } finally {
      setLoading(false)
    }
  }

  const handlerApprove = () => {
    if (withdrawType === 'matic') {
      maticApprove()
    } else {
      babyLongApprove()
    }
  }

  useEffect(() => {
    fetchUserRewardInfo()
  }, [])

  return (
    <InvitationWrap>
      <div className="title">{t('Your Current Earning Balance')}</div>
      <div className="row">
        <RowLeft>
          <span className="text">
            {maticContractReward ? +maticContractReward?.toString() : 0 + +maticMidReward}
          </span>
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
          {t(`The platform will charge a 5% fee on withdrawals as revenue`)}. {t(`When choosing to withdraw $Matic,a portion of the amount will be automatically reinvested`)}
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
                <span>{+babyLongReward * 0.05}</span>
              </div>
              <div className="divied"></div>
              <div className="countWrap">
                <span>{t('Actual Amout Received"')}</span>
                <div className="r">
                  <span>{+babyLongReward + babyLongReward * 0.05}</span>
                  <EggTokenIcon />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="title">{t('*5%Fee On Withdrawal Amount')}</div>
              <div className="countWrap">
                <span className="label">{t('Withdrawal $Matic  Amount')}</span>
                <span>
                  {maticContractReward ? +maticContractReward?.toString() : 0 + +maticMidReward}
                </span>
              </div>
              <div className="countWrap">
                <span className="label">{t('Fee')}</span>
                <span>
                  {(maticContractReward ? +maticContractReward?.toString() : 0 + +maticMidReward) *
                    0.05}
                </span>
              </div>
              <div className="countWrap">
                <span className="label">{t('Total')}</span>
                <span>
                  {maticContractReward
                    ? +maticContractReward?.toString()
                    : 0 +
                      +maticMidReward +
                      (maticContractReward
                        ? +maticContractReward?.toString()
                        : 0 + +maticMidReward) *
                        0.05}
                </span>
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
            <BuyBtn
              className="confirm"
              disabled={isMaticLoading || isBabyLongLoading || btnLoading}
              onClick={handleWithdraw}
            >
              {isMaticLoading || isBabyLongLoading || btnLoading ? t('Loading...') : t('YES')}
            </BuyBtn>
            {/* {(babyLongAllowance && +babyLongAllowance.toString() > 0) ||
            (maticAllowance && +maticAllowance.toString() > 0) ? (
              <BuyBtn
                className="confirm"
                disabled={isMaticLoading || isBabyLongLoading || btnLoading}
                onClick={handleWithdraw}
              >
                {isMaticLoading || isBabyLongLoading || btnLoading ? t('Loading...') : t('YES')}
              </BuyBtn>
            ) : (
              <BuyBtn
                className="confirm"
                iscancel={babyLongAllowLoading || maticAllowLoading}
                disabled={babyLongAllowLoading || maticAllowLoading}
                onClick={handlerApprove}
              >
                {babyLongAllowLoading || maticAllowLoading ? 'Loading...' : 'Approve'}
              </BuyBtn>
            )} */}

            <BuyBtn onClick={closeModal}>{t('NO')}</BuyBtn>
          </BtnWrap>
        </ModalMain>
      </CommonModal>
    </InvitationWrap>
  )
}

export default Withdraw

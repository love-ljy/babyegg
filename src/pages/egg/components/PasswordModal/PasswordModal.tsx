import { useState, useMemo } from 'react'
import CommonModal from '../commonModal/commonModal'
import styled from '@emotion/styled'
import { TextField, Button, Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import useAllowance from '@hooks/useAllowance'
import { BabyToken, BurnContractAddr } from '@config/contants'
import { useReadContract, useWriteContract } from 'wagmi'
import { updateUserInfo, getOrderStatus, createOrder, getUserInfo } from '@utils/api'
import burnABI from '@config/abi/burnToken.json'
import { getDecimalAmount } from '@utils/formatterBalance'
import Countdown from 'react-countdown'
import { formatUnits } from 'viem'
import { selectWalletInfo, setUserInfo } from '@store/user'
import { useSelector } from 'react-redux'
import useBabyLong from '@hooks/useBabyLong'
import useGetBalance from '@hooks/useGetBalance'
import useTokenBalance from '@hooks/useTokenBalance'
import { dispatch } from '@store/index'

const ModalMain = styled.div`
  width: 260px;
  img {
    margin: 0 auto 20px;
  }
  .title {
    text-align: left;
    font-size: 10px;
    margin-bottom: 4px;
    color: rgba(255, 255, 255, 0.5);
  }
  .countWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
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

const CountInput = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
  input {
    color: #fff;
    text-indent: 1em;
    /* font-weight: 700; */
    font-size: 12px;
    height: 26px;
    user-select: text;
  }
  .Mui-focused {
    border: none;
    outline: none;
  }
  .MuiInputBase-root::after {
    border: none;
  }
  opacity: 1;
  border-radius: 5px;
  background: rgba(0, 0, 0, 1);
  border: 1px solid rgba(143, 13, 245, 1);
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

const BtnWrap = styled.div<{ width?: string; iscancel?: boolean }>`
  display: flex;
`

interface Props {
  type: 'set' | 'normal'
}

const PasswordModal = props => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const { visible, setVisible, onOk, onClose, type } = props
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showRepeatPass, setShowRepeatPass] = useState(false)
  const [pass, setPass] = useState('')
  const [orderId, setOrderId] = useState(0)
  const [repeatPass, setRepeatPass] = useState('')
  const [isSettingPass, setIsSettingPass] = useState(0)
  const [expirationTime, setExpirationTime] = useState(0)

  const walletInfo = useSelector(selectWalletInfo)

  const { userBalance } = useGetBalance()
  const { formatBalance } = useTokenBalance(BabyToken)
  const { isAllowing, allowSpendingTokens, allowance, approveEstimatedGas } = useAllowance(
    BabyToken,
    BurnContractAddr
  )
  const { isLoading: babyLoading, setBabyArgs } = useBabyLong({
    onSuccess() {
      setBabyArgs([])
      userBalance.refetch()
      pollFetchStatus()
    },
    onError(error, rawError) {
      console.log('set pass baby rawError', rawError)
      toast.warn('设置密码失败')
      setBabyArgs([])
      setLoading(false)
    },
    mutationError() {
      setBabyArgs([])
      setLoading(false)
    },
  })

  const handleClose = () => {
    setVisible(false)
    setPass('')
    setRepeatPass('')
    onClose && onClose()
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const passChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value)
  }

  const repeatPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPass(event.target.value)
  }

  const handleClickShowPassword = () => setShowPass(show => !show)

  const handleClickShowRepeatPassword = () => setShowRepeatPass(show => !show)

  const handlerApprove = async () => {
    const estimatedGasInFloat = approveEstimatedGas
      ? parseFloat(formatUnits(approveEstimatedGas, walletInfo?.decimals))
      : null
    if (!estimatedGasInFloat) {
      toast.warn("Couldn't estimate gas")
      return
    }
    if (estimatedGasInFloat > walletInfo?.balance) {
      toast.warn('Insufficient balance for gas')
      return
    }
    allowSpendingTokens()
  }

  const pollFetchStatus = async () => {
    const poll = async () => {
      try {
        const res: any = await getOrderStatus({ id: orderId })
        if (res.code === 0) {
          const { state, expire_time } = res.data
          if (+state === 1) {
            setExpirationTime(expire_time)
            setIsSettingPass(state)
            clearInterval(pollingInterval)
            setLoading(false)
          }
        } else {
          toast.warn(res.msg)
          clearInterval(pollingInterval)
          setLoading(false)
        }
      } catch (e) {
        console.log('pollFetchStatus error', e)
        toast.warn('网络错误')
        clearInterval(pollingInterval)
        setLoading(false)
      }
    }
    const pollingInterval = setInterval(poll, 10000)
    poll()
  }

  const fetchUserInfo = async () => {
    try {
      const res: any = await getUserInfo()
      if (res.code === 0) {
        dispatch(setUserInfo(res.data))
      } else {
        toast.warn(res.msg)
      }
    } catch (e) {
      console.log('set pass fetchUserInfo, error', e)
      toast.warn('网络错误')
    }
  }

  const handleSettingPass = async () => {
    if (!pass || !repeatPass) {
      toast.warn('密码不能为空')
      return
    }
    if (pass !== repeatPass && type === 'set') {
      toast.warn('密码不一致，请重新输入')
      return
    }
    try {
      setLoading(true)
      const res: any = await updateUserInfo({
        pay_password: pass,
        pay_password_v: repeatPass,
      })
      if (res.code === 0) {
        await fetchUserInfo()
        setVisible(false)
        toast.success('密码设置成功')
        setIsSettingPass(0)
        setExpirationTime(0)
      } else {
        toast.warn(res.msg)
      }
    } catch (e) {
      console.log('updateUserInfo error', e)
      toast.warn('网络错误')
    } finally {
      setLoading(false)
    }
  }

  const handlePreSettingPass = async () => {
    if (type == 'normal') {
      if (!pass) {
        toast.warn('密码不能为空')
        return
      }
      setLoading(true)
      onOk && (await onOk({ id: 0, password: pass }))
      setLoading(false)
    } else {
      setLoading(true)
      try {
        const res: any = await createOrder({
          type: 1,
        })
        if (res.code === 0) {
          const { r, v, s, id, type, amount, coin_token, sign_out_time } = res.data
          if (Number(amount) > Number(formatBalance)) {
            toast.warn('babylonng 余额不足')
            setLoading(false)
            return
          }
          const bigAmount = getDecimalAmount(amount, 18)
          setOrderId(id)
          setBabyArgs([coin_token, bigAmount, type, id, sign_out_time, v, r, s])
        } else {
          toast.warn(res.msg)
          setLoading(false)
        }
      } catch (e) {
        console.log('set pass createOrder error', e)
        toast.warn('网络错误')
        setLoading(false)
      }
    }
  }

  const handleSetPassword = async () => {
    if (isSettingPass) {
      handleSettingPass()
    } else {
      handlePreSettingPass()
    }
  }

  const passComp = useMemo(() => {
    return (
      <>
        <div className="title">密码</div>
        <CountInput
          type={showPass ? 'text' : 'password'}
          id="outlined-adornment-password"
          value={pass}
          onChange={passChange}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPass ? (
                    <VisibilityOff
                      sx={{
                        color: '#fff',
                        marginRight: '10px',
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        color: '#fff',
                        marginRight: '10px',
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </>
    )
  }, [showPass, pass])

  const renderSetPass = useMemo(() => {
    if (+isSettingPass === 1 && type === 'set') {
      return (
        <>
          {passComp}
          <div>
            <div className="title">确认密码</div>
            <CountInput
              type={showRepeatPass ? 'text' : 'password'}
              value={repeatPass}
              onChange={repeatPassChange}
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showRepeatPass ? (
                        <VisibilityOff
                          sx={{
                            color: '#fff',
                            marginRight: '10px',
                          }}
                        />
                      ) : (
                        <Visibility
                          sx={{
                            color: '#fff',
                            marginRight: '10px',
                          }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </>
      )
    }
  }, [isSettingPass, isSettingPass, repeatPass, showRepeatPass, passComp])

  return (
    <CommonModal visible={visible} setVisible={setVisible} footer={<span></span>}>
      <ModalMain>
        <Typography>{type === 'set' ? '设置密码' : '输入密码'}</Typography>
        {expirationTime > 0 && <Countdown date={expirationTime * 1000} />}
        {renderSetPass}
        {type === 'normal' && passComp}
        {type === 'set' && (
          <Typography fontSize="12px" textAlign="center" mt={2}>
            设置支付密码前需要支付 1 $babylong
          </Typography>
        )}
        <BtnWrap>
          {Number(allowance) > 0 ? (
            <BuyBtn
              className="confirm"
              iscancel={loading || babyLoading}
              disabled={loading || babyLoading}
              onClick={handleSetPassword}
            >
              {loading || babyLoading ? 'Loading...' : '确定'}
            </BuyBtn>
          ) : (
            <BuyBtn
              className="confirm"
              iscancel={isAllowing}
              disabled={isAllowing}
              onClick={handlerApprove}
            >
              {isAllowing ? 'Loading...' : 'Approve'}
            </BuyBtn>
          )}

          <BuyBtn onClick={handleClose}>{'取消'}</BuyBtn>
        </BtnWrap>
      </ModalMain>
    </CommonModal>
  )
}

export default PasswordModal

import { useState } from 'react'
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
import { updateUserInfo,getOrderStatus, createOrder } from '@utils/api'
import burnABI from '@config/abi/burnToken.json'
import { getDecimalAmount } from '@utils/formatterBalance'
import Countdown from 'react-countdown';

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

const BuyBtn = styled(Button) <{ width?: string; isCancel?: boolean }>`
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

const BtnWrap = styled.div<{ width?: string; isCancel?: boolean }>`
  display: flex;
`

interface Props { }

const PasswordModal = (props: any) => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const { allowSpendingTokens, allowance } = useAllowance(BabyToken, BurnContractAddr)
  const { visible, setVisible, onOk, onClose, type } = props
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showRepeatPass, setShowRepeatPass] = useState(false)
  const [pass, setPass] = useState('')
  const [orderId,setOrderId] = useState(0)
  const [repeatPass, setRepeatPass] = useState('')
  const [status,setStatus] = useState(0)
  const [expirationTime,setExpirationTime] = useState(0)
  const {
    data: hash,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract({
    mutation: {
      onError: (error: Error) => onError(error),
      onSuccess: () => {
        PollFetchStatus()
      }
    },
  })

  const onError = (error: Error) => {
    toast.error(error.message)
    setLoading(false)
  }
  const handleClick = async () => {
    if (pass !== repeatPass && type !== 'input') {
      toast.warn('密码不一致，请重新输入')
      return
    }
    setLoading(true)
    onOk &&
      (await onOk({
        pay_password: pass,
        pay_password_v: repeatPass,
      }))
    setLoading(false)
  }

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
  const HandlerApprove = async () => {
    setLoading(true)
    await allowSpendingTokens()
    setLoading(false)
  }
 
  
  const PollFetchStatus = async()=>{
    const poll = async() => {
    if (Date.now() >= expirationTime*1000||status===1) {
      clearInterval(pollingInterval);
      return;
    }
    const res:any = await getOrderStatus({id:orderId})
    if(res.code===0){
      const {state,expire_time} = res.data
      setExpirationTime(expire_time)
      setStatus(state)
      if(Number(state)===1){
        clearInterval(pollingInterval);
        const result:any = await updateUserInfo({
          pay_password:pass,
          pay_password_v:repeatPass
        })
        toast.success('密码设置成功')
        setLoading(false)
        if(result.code===0){
          onOk && onOk({
            id:orderId,
            password:pass
          })
        }
      }
    }}
    const pollingInterval = setInterval(poll, 10000);
    poll(); // 立即执行一次
  
    return () => clearInterval(pollingInterval); 
  }
  
  const HandleSetPassword = async () => {
    if (pass !== repeatPass && type !== 'setpass') {
      toast.warn('密码不一致，请重新输入')
      return
    }
    setLoading(true)
    if (type === 'setpass') {
      onOk && onOk({id:0,password:pass})
    } else {
      const res: any = await createOrder({
        type: 1
      })
      if (res.code === 0) {
        console.info(res)
        const { r, v, s, id, type, amount, coin_token, sign_out_time } = res.data
        const bigAmount = getDecimalAmount(amount, 18)
        setExpirationTime(sign_out_time)
        setOrderId(id)
        console.info({
          coin_token, bigAmount, type, id, sign_out_time, v, r, s
        })
        await writeContractAsync({
          address: BurnContractAddr,
          abi: burnABI,
          functionName: 'deposit',
          args: [coin_token, bigAmount, type, id, sign_out_time, v, r, s],
        })

       
      }else{
        
      }
    }

  }
  return (
    <CommonModal visible={visible} setVisible={setVisible} footer={<span></span>}>

      <ModalMain>
        <Typography>{type === 'setpass' ? '打开龙蛋需要输入密码' : '打开龙蛋需要先设置密码'}</Typography>
        {expirationTime>0&&status===0&&<Countdown date={expirationTime*1000} />}
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
        {type !== 'setpass' && (
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
        )}
        {type !== 'setpass' && <Typography fontSize="12px" textAlign="left" >设置支付密码前需要支付 1 $babylong</Typography>}
        <BtnWrap>
          {Number(allowance) > 0 ? <BuyBtn className="confirm" isCancel={loading} disabled={loading} onClick={HandleSetPassword}>
            {loading ? 'Loading...' : '确定'}
          </BuyBtn> : <BuyBtn className="confirm" isCancel={loading} disabled={loading} onClick={HandlerApprove}>
            {loading ? 'Loading...' : 'Approve'}
          </BuyBtn>}

          <BuyBtn onClick={handleClose}>{'取消'}</BuyBtn>
        </BtnWrap>
      </ModalMain>
    </CommonModal>
  )
}

export default PasswordModal

import { useState } from 'react'
import CommonModal from '../commonModal/commonModal'
import styled from '@emotion/styled'
import { TextField, Button } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { toast } from 'react-toastify'

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

const BtnWrap = styled.div<{ width?: string; isCancel?: boolean }>`
  display: flex;
`

interface Props {}

const PasswordModal = (props: any) => {
     // @ts-ignore
     const { t } = useTranslation('common')
  const { visible, setVisible, onOk, onClose, type } = props
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showRepeatPass, setShowRepeatPass] = useState(false)
  const [pass, setPass] = useState('')
  const [repeatPass, setRepeatPass] = useState('')

  const handleClick = async () => {
    if (pass !== repeatPass && type !== 'input') {
      toast.warn('密码不一致，请重新输入')
      return
    }
    setLoading(true)
    onOk &&
      (await onOk({
        pass,
        repeatPass,
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

  return (
    <CommonModal visible={visible} setVisible={setVisible} footer={<span></span>}>
      <ModalMain>
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
        {type !== 'input' && (
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

        <BtnWrap>
          <BuyBtn className="confirm" isCancel={loading} disabled={loading} onClick={handleClick}>
            {loading ? 'Loading...' : '确定'}
          </BuyBtn>
          <BuyBtn onClick={handleClose}>{'取消'}</BuyBtn>
        </BtnWrap>
      </ModalMain>
    </CommonModal>
  )
}

export default PasswordModal

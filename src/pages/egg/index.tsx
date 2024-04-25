import { useState, useEffect, useCallback } from 'react'
import { Typography, Box, TextField, Button } from '@mui/material'
import styled from '@emotion/styled'
import CountDown from './components/countDown/countDown'
import Participation from './components/Participation/Participation'
import Market from './components/Market/Market'
import Personal from './components/Personal/Personal'
import { getUserHadParent, submitUserLogin, getUserInfo } from '@utils/api'
import CommonModal from './components/commonModal/commonModal'
import { selectWalletInfo, setUserInfo } from '@store/user'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { dispatch } from '@store/index'
import { toast } from 'react-toastify'
import md5 from 'md5'
// import useBind from '@hooks/useBind'
import eggAbi from '../../config/abi/eggAbi.json'
import { useReadContract, useWriteContract } from 'wagmi'
import { MainContractAddr } from '@config/contants'

const LongEggWrap = styled.div`
  color: #fff;
  /* background-color: #fff; */
  .bg {
    background-image: url('/img/countBg.png');
    background-size: cover;
    height: 475px;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
`

const Content = styled.div`
  padding: 100px 20px 30px;
`
const ModalMain = styled.div`
  width: 260px;
  .title {
    text-align: left;
    font-size: 14px;
    margin-bottom: 4px;
  }
`

const CountInput = styled(TextField)`
  width: 100%;

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
  height: 40px;
  border-radius: 32px;
  background: linear-gradient(90deg, rgba(50, 32, 208, 1) 0%, rgba(246, 26, 126, 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 15px 6px 15px;
  margin-top: 20px;
  font-weight: 700px;
  font-size: 15px;
  margin: 20px auto 0;
`

function LongEgg() {
  const [visible, setVisible] = useState(false)
  const [bindAddress, setBindAddress] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [loading, setLoading] = useState(false)
  const walletInfo = useSelector(selectWalletInfo)
  const {
    data: hash,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract({
    mutation: {
      onError: (error: Error) => onError(error),
    },
  })

  const onError = (error: any) => {
    setLoading(false)
  }

  // const { checkParent } = useBind()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBindAddress(event.target.value)
  }

  const fetchUserHadParent = useCallback(async () => {
    try {
      const res: any = await getUserHadParent({
        username: walletInfo.address,
        invite: '',
      })
      if (res.code === 0) {
        if (res.data.had_parent === 0) {
          // 未绑定
          setBindAddress(res.data.username)
          setInviteCode(res.data.invite)
          setVisible(true)
        } else {
          // 已绑定
          setVisible(false)
          login(res.data.invite)
        }
      } else {
        toast.warn('网络错误')
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
    }
  }, [walletInfo?.address])

  const fetchUserInfo = async () => {
    try {
      const res: any = await getUserInfo()
      if (res.code === 0) {
        dispatch(setUserInfo(res.data))
        setVisible(false)
        setLoading(false)
      } else {
        toast.warn('网络错误')
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
    }
  }

  const login = async (invite: string) => {
    try {
      const res: any = await submitUserLogin({
        password: md5(md5(walletInfo?.address + 'babyloong') + 'babyloong'),
        username: walletInfo?.address,
        invite,
      })
      if (res.code === 0) {
        localStorage.setItem('token', res.data.Token)
        dispatch(setUserInfo({ token: res.data.Token }))
        fetchUserInfo()
      } else {
        toast.warn('网络错误')
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
    }
  }

  const handleBind = async () => {
    try {
      setLoading(true)
      await writeContractAsync({
        address: MainContractAddr,
        abi: eggAbi,
        functionName: 'bind',
        args: [bindAddress],
      })
      login(inviteCode)
    } catch (error) {
      console.log('bind error', error)
      onError(error)
    }
  }

  useEffect(() => {
    if (walletInfo?.address) {
      fetchUserHadParent()
    } else {
      setVisible(false)
    }
  }, [walletInfo?.address])

  return (
    <LongEggWrap>
      <div className="bg"></div>
      <Content>
        <Typography fontSize={25}>Countdown</Typography>
        <CountDown />
        <Box mt={2}>
          <Participation />
        </Box>
        <Box mt={6}>
          <Market />
        </Box>
        <Box mt={6}>
          <Personal />
        </Box>
      </Content>
      <CommonModal visible={visible} setVisible={setVisible} footer={<span></span>}>
        <ModalMain>
          <div className="title">绑定上级钱包地址</div>
          <CountInput type="text" value={bindAddress} onChange={handleChange} variant="standard" />
          <BuyBtn isCancel={loading} disabled={loading} onClick={handleBind}>
            {loading ? 'Loading...' : '确定'}
          </BuyBtn>
        </ModalMain>
      </CommonModal>
    </LongEggWrap>
  )
}

export default LongEgg

LongEgg.getInitialProps = async () => {
  return {}
}

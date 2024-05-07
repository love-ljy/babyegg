import { useState, useEffect, useCallback, useContext } from 'react'
import { Typography, Box, TextField, Button } from '@mui/material'
import styled from '@emotion/styled'
import CountDown from './components/countDown/countDown'
import Participation from './components/Participation/Participation'
import Market from './components/Market/Market'
import Personal from './components/Personal/Personal'
import { useAccount } from 'wagmi'
import {
  getUserHadParent,
  submitUserLogin,
  getUserInfo,
  getGameInfo,
  queryTotalNet,
} from '@utils/api'
import CommonModal from './components/commonModal/commonModal'
import {
  selectWalletInfo,
  setUserInfo,
  setInviteCode,
  setAuthToken,
  selectInviteCode,
  setIsBindParent,
  setGamingId,
  setTotalData
} from '@store/user'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { dispatch } from '@store/index'
import { toast } from 'react-toastify'
import md5 from 'md5'
import useBind2 from '@hooks/useBind2'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { formatUnits } from 'viem'
import nextI18NextConfig from '../../../next-i18next.config.js'
import { TOKEN } from '@config/contants'
import useGetBalance from '@hooks/useGetBalance'

const LongEggWrap = styled.div`
  color: #fff;
  /* background-color: #fff; */
  padding: 8rem 20px 0 20px;
  background-image: url('/img/countBg.png');
  background-size: cover;
  /* height: 475px; */
  width: 100%;
`

const Content = styled.div`
  padding: 10px 20px 30px;
  color: #fff;
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

const BuyBtn = styled(Button)<{ width?: string; iscancel?: boolean }>`
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
  const { t } = useTranslation('common')
  const router = useRouter()
  const { address } = useAccount()

  const [visible, setVisible] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [bindAddress, setBindAddress] = useState<any>('')
  const [gameInfo, setGameInfo] = useState<any>({})
  const [gameEnd, setGameEnd] = useState(false)
  const [allNet, setAllNet] = useState<any>({})
  const [countDown, setCountDown] = useState<number>(0)

  const inviteCode = useSelector(selectInviteCode)
  const walletInfo: any = useSelector(selectWalletInfo)
  const { userBalance } = useGetBalance()
  const {
    estimatedGas: bindEstimatedGas,
    bindParent,
    isLoading: bindLoading,
    refetch,
  } = useBind2({
    args: [bindAddress],
    onSuccess() {
      login(inviteCode)
      toast.success('绑定上级成功')
    },
    onError(error, rawError) {
      console.log('bind rawError', rawError)
      toast.warn('绑定上级失败')
      setFetchLoading(false)
    },
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBindAddress(event.target.value)
  }

  const fetchUserInfo = async () => {
    try {
      const res: any = await getUserInfo()
      if (res.code === 0) {
        dispatch(setUserInfo(res.data))
        dispatch(setIsBindParent(true))
        fetchEggCountDown()
        fetchAllNetwork()
        setVisible(false)
        userBalance.refetch()
      } else {
        toast.warn(res.msg)
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
    } finally {
      setFetchLoading(false)
    }
  }

  const login = async (invite: string) => {
    try {
      const res: any = await submitUserLogin({
        password: md5(md5(address + 'babyloong') + 'babyloong'),
        username: address as `0x${string}`,
        invite,
      })
      if (res.code === 0) {
        localStorage.setItem(TOKEN, res.data.Token)
        dispatch(setAuthToken(res.data.Token))
        fetchUserInfo()
      } else {
        localStorage.setItem(TOKEN, '')
        dispatch(setAuthToken(''))
        toast.warn(res.msg)
        setFetchLoading(false)
      }
    } catch (e) {
      localStorage.setItem(TOKEN, '')
      console.log('login error', e)
      toast.warn('网络错误')
      setFetchLoading(false)
    }
  }

  const handleBind = async () => {
    setFetchLoading(true)
    const estimatedGasInFloat = bindEstimatedGas
      ? parseFloat(formatUnits(bindEstimatedGas, walletInfo?.decimals))
      : null
    if (!estimatedGasInFloat) {
      toast.warn("Couldn't estimate gas")
      setFetchLoading(false)
      return
    }
    if (estimatedGasInFloat > walletInfo?.balance) {
      toast.warn('Insufficient balance for gas')
      setFetchLoading(false)
      return
    }
    bindParent()
  }

  const fetchEggCountDown = async () => {
    try {
      const res: any = await getGameInfo()
      if (res.code === 0) {
        setGameInfo(res.data)
        const { end_time } = res.data
        const endDate = new Date(end_time).getTime()
        const startDate = new Date().getTime()
        setCountDown(Math.ceil(endDate-startDate))
        const isEnd = Math.ceil(endDate-startDate) < 0
        setGameEnd(isEnd)
        dispatch(setGamingId(res.data.id))
      } else if (res.code === 1) {
        setGameEnd(true)
      } else {
        toast.warn(res.msg)
      }
    } catch (e) {
      console.log('fetchEggCountDown error', e)
      toast.warn('网络错误')
    }
  }

  const fetchAllNetwork = async () => {
    try {
      const res: any = await queryTotalNet()
      if (res.code === 0) {
        setAllNet(res.data)
        dispatch(setTotalData(res.data))
      } else {
        toast.warn(res.msg)
      }
    } catch (e) {
      console.log('fetchAllNetwork error', e)
      toast.warn('网络错误')
    }
  }

  const fetchUserParent = useCallback(async () => {
    try {
      if (address && router.isReady) {
        const bindRes = await refetch()
        const { invite } = router.query
        const res: any = await getUserHadParent({
          username: address,
          invite: invite || '',
        })
        if (res.code === 0) {
          if (res.data.had_parent === 0) {
            setVisible(true)
            dispatch(setInviteCode(invite ? invite : res.data.invite))
            setBindAddress(res.data.username)
            dispatch(setIsBindParent(false))
            localStorage.setItem('inviteCode', invite ? invite : res.data.invite)
            localStorage.setItem('userAddress', address)
          } else {
            if (bindRes.data !== res.data.username) {
              setVisible(true)
              dispatch(setInviteCode(invite ? invite : res.data.invite))
              localStorage.setItem('inviteCode', invite ? invite : res.data.invite)
              localStorage.setItem('userAddress', address)
              setBindAddress(res.data.username)
              dispatch(setIsBindParent(false))
              toast.warn('测试文案: 与合约上级不一致, 需重新绑定')
            } else {
              setVisible(false)
              login(res.data.invite)
              localStorage.setItem('inviteCode', res.data.invite)
              localStorage.setItem('userAddress', address)
            }
          }
        } else {
          toast.warn(res.msg)
        }
      }
    } catch (error) {
      console.info('fetchUserParent', error)
    }
  }, [address, router.isReady])

  useEffect(() => {
    fetchUserParent()
  }, [fetchUserParent])

  const LongHeader = () => {
    const timer = new Date().getTime()+Number(Number(gameInfo?.remaining_time)*1000)
    const deadlineDate = new Date(timer);
    return (
      <LongEggWrap>
        <Typography fontWeight={700} fontSize={25}>
          {Number(gameInfo?.state)!=0 ? t('Waiting for the next round to start') : t('Countdown')}
          {Number(gameInfo?.state)===0 && <CountDown initialTimeInSeconds={deadlineDate} />}
        </Typography>
        <Box mt={2}>
          <Participation allNet={allNet} />
        </Box>
      </LongEggWrap>
    )
  }

  return (
    <div>
      <LongHeader />
      <Content>
        <Box>
          <Market />
        </Box>
        <Box mt={6}>
          <Personal />
        </Box>
      </Content>
      <CommonModal visible={visible} setVisible={setVisible} footer={<span></span>}>
        <ModalMain>
          <div className="title">{t('Bind superior address')}</div>
          <CountInput type="text" value={bindAddress} onChange={handleChange} variant="standard" />
          <BuyBtn
            iscancel={fetchLoading || bindLoading}
            disabled={fetchLoading || bindLoading}
            onClick={handleBind}
          >
            {fetchLoading || bindLoading ? 'Loading...' : t('confirm')}
          </BuyBtn>
        </ModalMain>
      </CommonModal>
    </div>
  )
}

export default LongEgg

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
  },
})

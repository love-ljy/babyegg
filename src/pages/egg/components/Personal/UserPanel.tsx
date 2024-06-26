import { useState, useEffect, useMemo, useCallback } from 'react'
import styled from '@emotion/styled'
import { Box, TextField, Button } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import currentEggPng from '@imgs/currentEgg.png'
import grandmasterPng from '@imgs/grandmaster.png'
import openEggPng from '@imgs/openEgg.png'
import VIP0 from '@imgs/99.png'
import VIP1 from '@imgs/100.png'
import VIP2 from '@imgs/300.png'
import VIP3 from '@imgs/500.png'
import VIP4 from '@imgs/1000.png'
import VIP5 from '@imgs/3000.png'
import eggUpPng from '@imgs/eggUpPng.png'
import eggIconPng from '@imgs/eggIcon.png'
import LinearProgress from '@mui/material/LinearProgress'
import EggTokenIcon from '@icons/eggToken.svg'
import MaticIcon from '@icons/matic.svg'
import { useSelector } from 'react-redux'
import { BurnContractAddr } from '@config/contants'
import burnABI from '@config/abi/burnToken.json'
import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import {
  selectWalletInfo,
  selectUserInfo,
  selectAuthToken,
  setTotalRewards,
  selectIsBindParent,
  selectBabyPrice,
  selectGamingId,
  setBindVisible
} from '@store/user'
import {
  getGameEgg,
  // openEgg,
  // eggIncomeReinvestment,
  // getCoin,
  // getIncomeReceiveNumber,
  getUserAllIncome,
  createOrder
} from '@utils/api'
import { toast } from 'react-toastify'
import CommonModal from '../commonModal/commonModal'
import { getDecimalAmount } from '@utils/formatterBalance'
// import PasswordModal from '../PasswordModal/PasswordModal'
import { useTranslation } from 'next-i18next'
import { dispatch } from '@store/index'
import useBabyLong from '@hooks/useBabyLong'
import useGetBalance from '@hooks/useGetBalance'


const UserPanelWrap = styled.div`
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  border: 1px solid rgba(26, 0, 187, 1);
  box-shadow: inset 0px 0px 12.1px rgba(0, 100, 255, 0.74);
  padding: 25px 10px 25px 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  .header {
    width: 100%;
    display: flex;
    justify-content: start;
    margin-bottom: 20px;
    img {
      margin-right: 24px;
    }
    .prograssWrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      .MuiLinearProgress-root {
        background-color: #000;
        border-radius: 5px;
        border: 1px solid rgba(50, 32, 208, 1);
        height: 15px;
      }
      .MuiLinearProgress-bar {
        background: linear-gradient(180deg, rgba(210, 9, 172, 1) 0%, rgba(86, 0, 154, 1) 100%);
      }
      .title {
        font-size: 20px;
        font-weight: 900;
        color: #fff;
      }
      .masterWrap {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .master {
          font-size: 20px;
          font-weight: 900;
          color: #fff;
        }
        .percent {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
`

const SwipeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .longEgg {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .infoItem {
      width: 50%;
      /* width: 150px; */
      border-radius: 5px;
      background: rgba(0, 0, 0, 1);
      border: 1px solid rgba(26, 0, 187, 1);
      padding: 4px 10px 4px 10px;
      text-align: left;
      margin-bottom: 10px;
      &:first-child {
        margin-right: 10px;
      }
      .title {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: 2px;
      }
      .bot {
        display: flex;
        /* justify-content: space-around; */
        align-items: center;
        img {
          margin-right: 4px;
        }
      }
      .rit-bot {
        display: flex;
        justify-content: space-between;

        .t {
          display: flex;
          align-items: center;
          span {
            margin-left: 4px;
          }
        }
        .rit {
          display: flex;
          flex-direction: column;
          align-items: end;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .earn {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 4px;
  }
  .countWrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    span {
      margin-right: 10px;
    }
  }
  .btnWrap {
    display: flex;
    justify-content: center;
    /* margin-bottom: 20px; */
    font-size: 13px;
    font-weight: 500;
    span {
      margin-right: 10px;
    }
    .open {
      width: 126px;
      /* height: 30px; */
      border-radius: 32px;
      background: rgba(0, 79, 201, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 15px 6px 15px;
      margin-right: 10px;
    }
    .repu {
      width: 126px;
      /* height: 30px; */
      border-radius: 32px;
      background: rgba(184, 3, 139, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px 15px 6px 15px;
    }
  }
`

const EggStatusWrap = styled.div`
  width: 100%;
  margin-bottom: 10px;
  .eggTitle {
    font-size: 15px;
    font-weight: 700;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 6px;
  }
  .eggStatus {
    position: relative;
    border-radius: 5px;
    padding: 22px 10px;
    width: 100%;
    background: rgba(0, 0, 0, 1);
    border: 1px solid rgba(50, 32, 208, 1);
    .pageWrap {
      position: absolute;
      bottom: 25px;
      display: flex;
      width: 100%;
      justify-content: center;
      .page {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        margin-right: 10px;
        &.actived {
          background-color: #fff;
        }
      }
    }
    .left {
      position: absolute;
      left: 10px;
      z-index: 1000;
      top: 0;
      bottom: 0;
      transform: translateY(50%);
      margin: auto;
    }
    .right {
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      transform: translateY(50%);
      z-index: 1000;
      margin: auto;
    }
  }
`
const RewardStatusWrap = styled.div`
  width: 100%;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    .history {
      font-size: 10px;
      line-height: 12.1px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`
const CommWrap = styled.div`
  display: flex;
  justify-content: space-between;
  .row {
    flex: 1 50%;
  }
  .row:nth-child(1) {
    margin-right: 10px;
  }
`
const CommonRow = styled.div`
  border-radius: 5px;
  background: rgba(0, 0, 0, 1);

  border: 1px solid rgba(26, 0, 187, 1);
  margin-bottom: 10px;
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: end; */
  /* align-items: end; */
  padding: 4px 10px 4px 10px;
  .topTxt {
    text-align: left;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
  }
  .bot {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  /* .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    .topTxt {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.5);
    }
    .bot {
      font-size: 15px;
      font-weight: 700;
    }
  } */
`
const Expenditure = styled.div`
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  background: rgba(0, 0, 0, 1);
  border: 1px solid rgba(50, 32, 208, 1);
  margin-bottom: 20px;
  .mar {
    margin-bottom: 15px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    .group {
      flex: 1 60%;
      display: flex;
      flex-direction: column;
      align-items: start;
      .title {
        text-align: left;
        flex-wrap: wrap;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
      }
      .count {
        font-size: 15px;
        font-weight: 700;
      }
    }
    .group2 {
      flex: 1 40%;
    }
  }
`
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

const BuyBtn = styled(Button) <{ width?: string; iscancel?: boolean }>`
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

const UserPanel = () => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const router = useRouter()
  const { address } = useAccount()

  const [userReward, setUserReward] = useState<any>()
  const [passVisible, setPassVisible] = useState(false)
  const [eggLoading, setEggLoading] = useState(false)
  const [upLoading, setUpLoading] = useState(false)
  const [eggType, setEggType] = useState('')
  const [eggInfo, setEggInfo] = useState({
    dragon_egg: 0,
    dragon_egg_babyloong: 0,
  })
  const [eggVisible, setEggVisible] = useState(false)

  const userInfo: any = useSelector(selectUserInfo)
  const token = useSelector(selectAuthToken)
  const walletInfo: any = useSelector(selectWalletInfo)
  const babyPrice: any = useSelector(selectBabyPrice)
  const isBindParent: any = useSelector(selectIsBindParent)
  const gamingId: any = useSelector(selectGamingId)
  const { userBalance } = useGetBalance()

  const { isLoading: babyLoading, setBabyArgs } = useBabyLong({
    onSuccess() {
      toast.success('操作成功')
      userBalance.refetch()
      setBabyArgs([])
      setEggLoading(false)
      setUpLoading(false)
    },
    onError(error, rawError) {
      console.log('babyLong rawError', rawError)
      toast.warn('操作失败')
      setEggLoading(false)
      setUpLoading(false)
      setBabyArgs([])
    },
    mutationError() {
      setBabyArgs([])
      setEggLoading(false)
      setUpLoading(false)
    },
  })

  const LevelList = [
    { name: 'Intern', count: 0, imgSrc: <Image src={VIP0} width={61} height={66} alt="" /> },
    { name: 'Novice', count: 1000, imgSrc: <Image src={VIP1} width={61} height={66} alt="" /> },
    { name: 'Elite', count: 3000, imgSrc: <Image src={VIP2} width={61} height={66} alt="" /> },
    { name: 'Expert', count: 5000, imgSrc: <Image src={VIP3} width={61} height={66} alt="" /> },
    { name: 'Master', count: 10000, imgSrc: <Image src={VIP4} width={61} height={66} alt="" /> },
    {
      name: 'Grandmaster',
      count: 30000,
      imgSrc: <Image src={VIP5} width={61} height={66} alt="" />,
    },
  ]

  const openDialog = (type: string) => {
    if (!address) {
      toast.warn('请链接钱包')
      return
    }
  
    if (userInfo.pay_password) {
      setEggVisible(true)
      setEggType(type)
    } else {
      setPassVisible(true)
    }
  }

  // const handleOpenEgg = async passParams => {
  //   if (eggType === 'open') {
  //     try {
  //       const res: any = await openEgg({
  //         password: passParams.password,
  //       })
  //       if (res.code === 0) {
  //         setPassVisible(false)
  //         fetchGameEgg()
  //         toast.success('打开成功')
  //       } else {
  //         toast.warn(res.msg)
  //       }
  //     } catch (e) {
  //       console.log('open egg error', e)
  //       toast.warn('网络错误')
  //     }
  //   } else {
  //     try {
  //       const res: any = await eggIncomeReinvestment({
  //         id: passParams.id,
  //         password: passParams.password,
  //       })
  //       if (res.code === 0) {
  //         setPassVisible(false)
  //         fetchGameEgg()
  //         toast.success('升级成功')
  //       } else {
  //         toast.warn(res.msg)
  //       }
  //     } catch (e) {
  //       console.log('level up error', e)
  //       toast.warn('网络错误')
  //     }
  //   }
  // }

  const handleEggConfirm = async () => {
    setEggVisible(false)
    setPassVisible(true)
  }

  const closeEggModal = async () => {
    setEggVisible(false)
  }

  // const passOK = async (passParams: any) => {
  //   await handleOpenEgg(passParams)
  // }

  const fetchGameEgg = useCallback(async () => {
    if (address && isBindParent && token) {
      try {
        const res: any = await getGameEgg()
        if (res.code === 0) {
          setEggInfo(res.data)
        } else {
          setEggInfo({
            dragon_egg: 0,
            dragon_egg_babyloong: 0,
          })
          toast.warn(res.msg)
        }
      } catch (e) {
        console.log('fetchGameEgg error', e)
        toast.warn('网络错误')
        setEggInfo({
          dragon_egg: 0,
          dragon_egg_babyloong: 0,
        })
      }
    }
  }, [address, isBindParent, token])

  // const fetchUserRewardInfo = useCallback(async () => {
  //   if (address && isBindParent && token) {
  //     try {
  //       const array = [-1, 0, 4, 5, 6, 7, 8, 9]
  //       const resolve = array.map(async e => {
  //         const res: any = await getIncomeReceiveNumber(e)
  //         if (res.code === 0) {
  //           return res.data
  //         } else {
  //           return null
  //         }
  //       })
  //       const res = await Promise.all(resolve)
  //       setUserReward(res?.flat())

  //       // setBabyIncome(res?.flat()?[1])
  //     } catch (error) {
  //       console.log('fetchUserRewardInfo error', error)
  //       toast.warn('网络错误')
  //     }
  //   }
  // }, [address, isBindParent, token])

  const fetchUserTotalRewards = useCallback(async () => {
    if (address && isBindParent && token) {
      try {
        const res: any = await getUserAllIncome()
        if (res.code === 0) {
          setUserReward(res.data)
          dispatch(setTotalRewards(res.data))
        } else {
          return null
        }
      } catch (error) {
        console.log('fetchUserRewardInfo error', error)
        toast.warn('网络错误')
      }
    }
  }, [address, isBindParent, token])


  useEffect(() => {
    fetchGameEgg()
    fetchUserTotalRewards()
  }, [fetchGameEgg, fetchUserTotalRewards])

  const toHistory = () => {
    router.push('/history')
  }

  const handleOpen = async () => {
    if(!isBindParent){
      dispatch(setBindVisible(true))
      return
    }
    try {
      setEggLoading(true)
      const res: any = await createOrder({
        type: 2,
        id: gamingId,
        event_type: 1
      })
      if (res.code === 0) {
        const { r, v, s, id, type, amount, coin_token, sign_out_time } = res.data
        const bigAmount = getDecimalAmount(amount, 18)
        setBabyArgs([coin_token, bigAmount, type, id, sign_out_time, v, r, s])
      } else {
        toast.warn(res.msg)
        setEggLoading(false)
      }
    } catch (e) {
      console.log('open egg error', e)
      toast.warn('网络错误')
      setEggLoading(false)
    }
  }

  const handleUpgrade = async () => {
    if(!isBindParent){
      dispatch(setBindVisible(true))
      return
    }
    try {
      setUpLoading(true)
      const res: any = await createOrder({
        type: 2,
        id: gamingId,
        event_type: 2
      })
      if (res.code === 0) {
        const { r, v, s, id, type, amount, coin_token, sign_out_time } = res.data
        const bigAmount = getDecimalAmount(amount, 18)
        setBabyArgs([coin_token, bigAmount, type, id, sign_out_time, v, r, s])
      } else {
        toast.warn(res.msg)
        setUpLoading(false)
      }
    } catch (e) {
      console.log('open egg error', e)
      toast.warn('网络错误')
      setUpLoading(false)
    }
  }

  const variable = Number(userInfo.dragon_egg)
  const level = useMemo(() => {
    const level = LevelList.find(level => level.count > Number(userInfo.dragon_egg))

    // 如果找到，返回前一个元素的 imgSrc
    if (level) {
      const index = LevelList.indexOf(level)
      return index > 0 ? LevelList[index - 1] : null
    }

    // 如果没有找到符合条件的元素，返回数组最后一个元素的 imgSrc
    return LevelList[LevelList.length - 1]
  }, [Number(userInfo.dragon_egg)])

  const imgSrc = level ? level?.imgSrc : null
  const LevlName: string = level ? level?.name : 'Master'

  return (
    <UserPanelWrap>
      <div className="header">
        <div>{imgSrc}</div>
        <div className="prograssWrap">
          <div className="masterWrap">
            <div className="title">{t(LevlName)}</div>
            <span className="percent">{userInfo.dragon_egg || 0}/{userInfo.next_level_need_egg_num&&userInfo.next_level_need_egg_num||1000}</span>
          </div>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={Number(userInfo.dragon_egg) / 100} />
          </Box>
        </div>
      </div>
      <Expenditure>
        <div className="row mar">
          <div className="group">
            <span className="title">{t('Total Personal Expenditure')}</span>
            <span className="count">{userInfo.my_performance || 0}</span>
          </div>
          <div className="group group2">
            <span className="title">{t('Total Eggs Purchased')}</span>
            <span className="count">{userInfo.dragon_egg_total || 0}</span>
          </div>
        </div>
        <div className="row mar">
          <div className="group">
            <span className="title">{t('Current Eggs Held')}</span>
            <span className="count">{userInfo.dragon_egg || '0'}</span>
          </div>
          <div className="group group2">
            <span className="title">{t('Your Master Rank')}</span>
            <span className="count">{userInfo.index_num || '-'}</span>
          </div>
        </div>
      </Expenditure>
      <EggStatusWrap>
        <div className="eggTitle">{t('Current Egg Status')}</div>
        <div className="eggStatus">
          <SwipeItem>
            <div>
              <Image src={currentEggPng} alt="egg" />
            </div>
            <div className="longEgg">
              <div className="infoItem">
                <div className="title">{t('Number Dragon Eggs')}</div>
                <div className="bot">
                  <div>
                    <Image src={eggIconPng} alt="egg" />
                  </div>
                  <span>{eggInfo.dragon_egg || '0'}</span>
                </div>
              </div>
              <div className="infoItem">
                <div className="title">{t('Egg Income')}</div>
                <div className="rit-bot">
                  <div className="t">
                    <EggTokenIcon />
                    <span>{Number(eggInfo.dragon_egg_babyloong).toFixed(0) || '0'}</span>
                  </div>
                  <div className="rit">
                    <span>
                      ≈ {(Number(eggInfo.dragon_egg_babyloong) * Number(babyPrice)).toFixed(4)}
                    </span>
                    <span>Matic</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnWrap">
              <div className="open" onClick={handleOpen}>
                {eggLoading || babyLoading && !upLoading ? t('Loading...') : t('Open Egg')}
              </div>
              <div className="repu" onClick={handleUpgrade}>
                {upLoading || babyLoading && !eggLoading ? t('Loading...') : t('Upgrade')}
              </div>
            </div>
          </SwipeItem>
        </div>
      </EggStatusWrap>
      <RewardStatusWrap>
        <div className="title">
          <div>{t('Reward Status')}</div>
          <div onClick={toHistory}>
            <span className="history">{t('History')}</span>
          </div>
        </div>
        <CommonRow>
          <div className="topTxt">
            <span>{t('Egg Earnings')}</span>
          </div>
          <div className="bot">
            <span>{userReward?.egg_income&&Number(userReward?.egg_income).toFixed(2) || '0'}</span>
            <EggTokenIcon />
          </div>
        </CommonRow>
        <CommWrap>
          <CommonRow className="row">
            <div className="topTxt">
              <span>{t('Public Sep Earnings')}</span>
            </div>
            <div className="bot">
              <span>{userReward?.index_income&&Number(userReward?.index_income).toFixed(2) || '0'}</span>
              <MaticIcon />
            </div>
          </CommonRow>
          <CommonRow className="row">
            <div className="topTxt">
              <span>{t('Lucky Reward')}</span>
            </div>
            <div className="bot">
              <span>{userReward?.lucky_income&&Number(userReward?.lucky_income).toFixed(2) || '0'}</span>
              <MaticIcon />
            </div>
          </CommonRow>
        </CommWrap>
        <CommWrap>
          <CommonRow className="row">
            <div className="topTxt">
              <span>{t('Last 100 Reward')}</span>
            </div>
            <div className="bot">
              <span>{Number(userReward?.last_100_income).toFixed(0) || '0'}</span>
              <MaticIcon />
            </div>
          </CommonRow>
          <CommonRow className="row">
            <div className="topTxt">
              <span>{t('Last Master Reward')}</span>
            </div>
            <div className="bot">
              <span>{Number(userReward?.last_one_income).toFixed(0) || '0'}</span>
              <MaticIcon />
            </div>
          </CommonRow>
        </CommWrap>
        <CommonRow className="row">
          <div className="topTxt">
            <span>{t('Egg Rank Reward')}</span>
          </div>
          <div className="bot">
            <span>{userReward?.level_income || '0'}</span>
            <EggTokenIcon />
          </div>
        </CommonRow>
        <CommWrap>
          <CommonRow className="row">
            <div className="topTxt">
              <span>{t('Weekly Rank Reward')}</span>
            </div>
            <div className="bot">
              <span>{userReward?.yulong_week_income&&Number(userReward?.yulong_week_income).toFixed(2) || '0'}</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
          <CommonRow className="row">
            <div className="topTxt">
              <span>{t('Monthly Rank Reward')}</span>
            </div>
            <div className="bot">
              <span>{userReward?.yulong_month_income&&Number(userReward?.yulong_month_income).toFixed(2) || '0'}</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
        </CommWrap>
      </RewardStatusWrap>
      {/* <PasswordModal
        visible={passVisible}
        type={userInfo.pay_password ? 'normal' : 'set'}
        onClose={() => setPassVisible(false)}
        setVisible={setPassVisible}
        onOk={passOK}
      /> */}
      <CommonModal visible={eggVisible} setVisible={setEggVisible} footer={<span></span>}>
        <ModalMain>
          {eggType === 'open' ? (
            <div>
              <div className="img">
                <Image src={openEggPng} alt="egg" />
              </div>
              <div className="title">{t('Current total earnings from all eggs')}</div>
              <div className="countWrap">
                <span>{Number(eggInfo.dragon_egg_babyloong)}</span>
                <EggTokenIcon />
              </div>
              <div className="title">{t('Open all eggs to receive double earnings')}</div>
              <div className="countWrap">
                <span>{Number(eggInfo.dragon_egg_babyloong) * 2}</span>
                <EggTokenIcon />
              </div>
              <div className="txt">{t('Confirm to open all eggs?')}</div>
            </div>
          ) : (
            <div>
              <div className="img">
                <Image src={eggUpPng} alt="egg" />
              </div>
              <div className="title">{t('Current total earnings from all eggs')}</div>
              <div className="countWrap">
                <span>{Number(eggInfo.dragon_egg_babyloong).toFixed(0)}</span>
                <EggTokenIcon />
              </div>
              <div className="mid">
                <div className="box">
                  <span>{Number(eggInfo.dragon_egg_babyloong).toFixed(0)}</span>
                  <EggTokenIcon />
                </div>
                <span className="equ">=</span>
                <div className="box">
                  <span>{(Number(eggInfo.dragon_egg_babyloong) * Number(babyPrice)).toFixed(4)}</span>
                  <MaticIcon />
                </div>
              </div>
              <div className="title">{t('You can currently upgrade')}</div>
              <div className="countWrap">
                <span>{Number(eggInfo.dragon_egg)}</span>
                <EggTokenIcon />
              </div>
              <div className="txt">{t('Confirm upgrade')} ?</div>
            </div>
          )}
          <BtnWrap>
            <BuyBtn className="confirm" onClick={handleEggConfirm}>
              {t('Yes')}
            </BuyBtn>
            <BuyBtn onClick={closeEggModal}>{t('No')}</BuyBtn>
          </BtnWrap>
        </ModalMain>
      </CommonModal>
    </UserPanelWrap>
  )
}

export default UserPanel

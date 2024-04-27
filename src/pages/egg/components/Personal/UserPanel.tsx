import { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { Box, TextField, Button } from '@mui/material'
import Image from 'next/image'
import currentEggPng from '@imgs/currentEgg.png'
import grandmasterPng from '@imgs/grandmaster.png'
import openEggPng from '@imgs/openEgg.png'
import eggUpPng from '@imgs/eggUpPng.png'
import eggIconPng from '@imgs/eggIcon.png'
import LinearProgress from '@mui/material/LinearProgress'
import EggTokenIcon from '@icons/eggToken.svg'
import { useSelector } from 'react-redux'
import { selectWalletInfo, selectUserInfo, selectIsBindParent } from '@store/user'
import { getGameEgg, openEgg, eggIncomeReinvestment } from '@utils/api'
import { toast } from 'react-toastify'
import CommonModal from '../commonModal/commonModal'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

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
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
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

const UserPanel = () => {
  const [progress, setProgress] = useState(0)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showRepeatPass, setShowRepeatPass] = useState(false)
  const [pass, setPass] = useState('')
  const [repeatPass, setRepeatPass] = useState('')
  const [eggType, setEggType] = useState('')
  const [eggInfo, setEggInfo] = useState({
    dragon_egg: 0,
    dragon_egg_babyloong: 0,
  })
  const userInfo: any = useSelector(selectUserInfo)
  const walletInfo: any = useSelector(selectWalletInfo)
  const isBindParent: any = useSelector(selectIsBindParent)
  const [visible, setVisible] = useState(false)
  const [eggVisible, setEggVisible] = useState(false)

  const fetchGameEgg = useCallback(async () => {
    try {
      const res: any = await getGameEgg()
      if (res.code === 0) {
        setEggInfo(res.data)
      } else {
        setEggInfo({
          dragon_egg: 0,
          dragon_egg_babyloong: 0,
        })
        toast.warn('网络错误')
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
      setEggInfo({
        dragon_egg: 0,
        dragon_egg_babyloong: 0,
      })
    }
  }, [walletInfo?.address])

  const openDialog = (type: string) => {
    setEggVisible(true)
    setEggType(type)
  }

  const passChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value)
  }

  const repeatPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPass(event.target.value)
  }

  const handleClickShowPassword = () => setShowPass(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleClickShowRepeatPassword = () => setShowRepeatPass(show => !show)

  const handleMouseDownRepeatPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleOpenEgg = async () => {
    if (pass !== repeatPass) {
      toast.warn('密码不一致，请重新输入')
      return
    }
    setLoading(true)
    if (eggType === 'open') {
      try {
        const res: any = await openEgg({
          game_member_id: pass,
          password: repeatPass,
        })
        console.log('res')
        if (res.code === 0) {
          setVisible(false)
          setPass('')
          setRepeatPass('')
          fetchGameEgg()
          toast.success('打开成功')
        } else {
          toast.warn('网络错误')
        }
      } catch (e) {
        console.log('e')
        toast.warn('网络错误')
      } finally {
        setLoading(false)
      }
    } else {
      try {
        const res: any = await eggIncomeReinvestment({
          id: '',
          game_member_id: pass,
          password: repeatPass,
        })
        console.log('res')
        if (res.code === 0) {
          setVisible(false)
          setPass('')
          setRepeatPass('')
          fetchGameEgg()
          toast.success('升级成功')
        } else {
          toast.warn('网络错误')
        }
      } catch (e) {
        console.log('e')
        toast.warn('网络错误')
      } finally {
        setLoading(false)
      }
    }
  }

  const closeDialog = async () => {
    setVisible(false)
    setPass('')
    setRepeatPass('')
  }
  const handleEggConfirm = async () => {
    setEggVisible(false)
    setVisible(true)
  }
  const closeEggModal = async () => {
    setEggVisible(false)
  }

  useEffect(() => {
    if (walletInfo?.address && isBindParent) {
      fetchGameEgg()
    }
  }, [walletInfo?.address, isBindParent])

  return (
    <UserPanelWrap>
      <div className="header">
        <div>
          <Image src={grandmasterPng} alt="grandmaster" />
        </div>
        <div className="prograssWrap">
          <div className="title">Title</div>
          <div className="masterWrap">
            <span className="master">{userInfo.level_name}</span>
            <span className="percent">{userInfo.level_grade || 0}/1000</span>
          </div>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        </div>
      </div>
      <Expenditure>
        <div className="row mar">
          <div className="group">
            <span className="title">个人总消费额度</span>
            <span className="count">{userInfo.my_performance || 0}</span>
          </div>
          <div className="group group2">
            <span className="title">购买龙蛋总量</span>
            <span className="count">{userInfo.dragon_egg_total || 0}</span>
          </div>
        </div>
        <div className="row mar">
          <div className="group">
            <span className="title">当前持有龙蛋总量</span>
            <span className="count">{userInfo.dragon_egg}</span>
          </div>
          <div className="group group2">
            <span className="title">您的育龙师序列</span>
            <span className="count">{userInfo.last_sort_num}</span>
          </div>
        </div>
      </Expenditure>
      <EggStatusWrap>
        <div className="eggTitle">Current Egg Status</div>
        <div className="eggStatus">
          <SwipeItem>
            <div>
              <Image src={currentEggPng} alt="egg" />
            </div>
            <div className="longEgg">
              <div className="infoItem">
                <div className="title">龙蛋持有总额</div>
                <div className="bot">
                  <div>
                    <Image src={eggIconPng} alt="egg" />
                  </div>
                  <span>{eggInfo.dragon_egg}</span>
                </div>
              </div>
              <div className="infoItem">
                <div className="title">龙蛋当前收益</div>
                <div className="rit-bot">
                  <div className="t">
                    <EggTokenIcon />
                    <span>{eggInfo.dragon_egg_babyloong}</span>
                  </div>
                  <div className="rit">
                    <span>≈ 100.00</span>
                    <span>Matic</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="btnWrap">
              <div className="open" onClick={() => openDialog('open')}>
                打开龙蛋
              </div>
              <div className="repu" onClick={() => openDialog('up')}>
                升级龙蛋
              </div>
            </div>
          </SwipeItem>
        </div>
      </EggStatusWrap>
      <RewardStatusWrap>
        <div className="title">
          <div>Reward Status</div>
          <div>
            <span className="history">{'History >'}</span>
          </div>
        </div>
        <CommonRow>
          <div className="topTxt">
            <span>Egg Earnings</span>
          </div>
          <div className="bot">
            <span>10,000.00</span>
            <EggTokenIcon />
          </div>
        </CommonRow>
        <CommWrap>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Public Seq Earnings</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Lucky Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
        </CommWrap>
        <CommWrap>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Last 100 Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Last Master Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
        </CommWrap>
        <CommonRow className="row">
          <div className="topTxt">
            <span>Egg Rank Reward</span>
          </div>
          <div className="bot">
            <span>10,000.00</span>
            <EggTokenIcon />
          </div>
        </CommonRow>
        <CommWrap>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Weekly Rank Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
          <CommonRow className="row">
            <div className="topTxt">
              <span>Monthly Rank Reward</span>
            </div>
            <div className="bot">
              <span>10,000.00</span>
              <EggTokenIcon />
            </div>
          </CommonRow>
        </CommWrap>
      </RewardStatusWrap>
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
                    onMouseDown={handleMouseDownRepeatPassword}
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
          <BtnWrap>
            <BuyBtn
              className="confirm"
              isCancel={loading}
              disabled={loading}
              onClick={handleOpenEgg}
            >
              {loading ? 'Loading...' : '确定'}
            </BuyBtn>
            <BuyBtn onClick={closeDialog}>{'取消'}</BuyBtn>
          </BtnWrap>
        </ModalMain>
      </CommonModal>
      <CommonModal visible={eggVisible} setVisible={setEggVisible} footer={<span></span>}>
        <ModalMain>
          {eggType === 'open' ? (
            <div>
              <div className="img">
                <Image src={openEggPng} alt="egg" />
              </div>
              <div className="title">当前您的所有龙蛋收益</div>
              <div className="countWrap">
                <span>10,000,00</span>
                <EggTokenIcon />
              </div>
              <div className="title">打开所有龙蛋可获得双倍收益</div>
              <div className="countWrap">
                <span>10,000,00</span>
                <EggTokenIcon />
              </div>
              <div className="txt">确认打开所有龙蛋？</div>
            </div>
          ) : (
            <div>
              <div className="img">
                <Image src={eggUpPng} alt="egg" />
              </div>
              <div className="title">当前您的所有龙蛋收益</div>
              <div className="countWrap">
                <span>10,000,00</span>
                <EggTokenIcon />
              </div>
              <div className="mid">
                <div className="box">
                  <span>10,000.00</span>
                  <EggTokenIcon />
                </div>
                <span className="equ">=</span>
                <div className="box">
                  <span>10,000</span>
                  <EggTokenIcon />
                </div>
              </div>
              <div className="title">当前您可升级</div>
              <div className="countWrap">
                <span>10,000,00</span>
                <EggTokenIcon />
              </div>
              <div className="txt">确认升级 ?</div>
            </div>
          )}
          <BtnWrap>
            <BuyBtn className="confirm" onClick={handleEggConfirm}>
              是
            </BuyBtn>
            <BuyBtn onClick={closeEggModal}>否</BuyBtn>
          </BtnWrap>
        </ModalMain>
      </CommonModal>
    </UserPanelWrap>
  )
}
export default UserPanel

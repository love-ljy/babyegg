import { useState, forwardRef, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { Button, IconButton } from '@mui/material'
import buyEggPng from '@imgs/buyegg.png'
import firstBuyPng from '@imgs/firstBuy.png'
import Image from 'next/image'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import MaticIcon from '@icons/matic.svg'
import congratulationPng from '@imgs/congratulation.png'
import congratulationsTxtPng from '@imgs/congratulationsTxt.png'
import detailedPng from '@imgs/detailed.png'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import BaseSelect from './BaseSelect'
import CommonModal from 'src/pages/egg/components/commonModal/commonModal'
import { useSelector } from 'react-redux'
import { selectWalletInfo,selectUserInfo,selectAuthToken, selectIsBindParent, selectGamingId } from '@store/user'
import { toast } from 'react-toastify'
import PasswordModal from '../PasswordModal/PasswordModal'
import {
  getCoin,
  eggIncomeReinvestment,
  createOrder,
} from '@utils/api'
import useStake from '@hooks/useStake'
import { useTranslation } from 'next-i18next'
import { formatUnits } from 'viem'
import useGetBalance from '@hooks/useGetBalance'
import useBabyLong from '@hooks/useBabyLong'
import { getDecimalAmount } from '@utils/formatterBalance'

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
`

const CountInput = styled(TextField)`
  input {
    color: #fff;
    text-indent: 1em;
    font-weight: 700;
    font-size: 18px;
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

const BuyEggWrap = styled.div`
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  border: 1px solid rgba(143, 13, 245, 1);
  box-shadow: inset 0px 0px 12.1px rgba(143, 13, 245, 1);
  padding: 25px 10px 25px 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  .buying {
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    align-self: flex-start;
    margin-bottom: 2px;
    margin-top: 2px;
  }
  .count {
    font-weight: 700;
  }
  .available {
    align-self: flex-start;
  }
  .detailed {
    display: flex;
    margin-top: 20px;
    img {
      margin-right: 10px;
    }
    .desc {
      color: rgba(255, 255, 255, 0.5);
      font-size: 10px;
      text-decoration: underline;
    }
  }
`

const AdornmentWrap = styled.div`
  display: flex;
  align-items: center;
  width: 140px;
`

const BuyNumStep = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 40vw;
  align-items: center;
  align-content: center;
  margin-top: 20px;
`
const BuyNumStepItem = styled.div`
  border: 1px solid #fff;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
`

const DescContent = styled.div`
  /* width: 78vw; */
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
  font-size: 12px;
  padding-bottom: 50px;
  &.firstBuy {
    display: flex;
    justify-content: center;
    font-size: 15px;
    img {
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }
`

const CongContent = styled.div`
  width: 60vw;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
  font-size: 13px;
  /* padding-bottom: 50px; */
  .cong {
    font-size: 22px;
    text-shadow:
      inset 0px 1px 0.6px rgba(255, 255, 255, 0.56),
      0px 3px 3.9px rgba(0, 0, 0, 0.36);
  }
  .countWrap {
    margin-top: 15px;
    width: 100%;
    /* height: 65px; */
    border-radius: 5px;
    background: rgba(8, 17, 33, 1);
    border: 1px solid rgba(143, 13, 245, 1);
    box-shadow: inset 0px 0px 12.1px rgba(143, 13, 245, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 29px 16px 29px;
    span {
      margin-right: 20px;
      font-size: 30px;
    }
  }
`

const DialogFooter = styled.div`
  width: 250px;
  height: 40px;
  border-radius: 32px;
  margin: 20px auto 0;
  background: linear-gradient(180deg, rgba(50, 32, 208, 1) 0%, rgba(246, 26, 126, 1) 100%);
  border: 1px solid rgba(255, 255, 255, 1);

  box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 15px 6px 15px;
`

const DialogTitle = styled.div`
  margin: 0 auto -10px;
`

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        thousandSeparator
        valueIsNumericString
        // prefix="$"
      />
    )
  }
)

const BuyEgg = () => {
  // @ts-ignore
  const { t } = useTranslation('common')
  const [coinType, setCoinType] = useState('2')
  const [descShow, setDescShow] = useState(false)
  const [buyShow, setBuyShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passVisible, setPassVisible] = useState(false)
  const [inputPassVisible, setInputPassVisible] = useState(false)
  const [firstBuyVisible, setFirstBuyVisible] = useState(false)
  const [buyNum, setBuyNum] = useState(30)
  const [coinList, setCoinList] = useState([])
  const [babyArgs, setBabyArgs] = useState<any>([])

  const isBindParent: any = useSelector(selectIsBindParent)
  const walletInfo = useSelector(selectWalletInfo)
  const userInfo: any = useSelector(selectUserInfo)
  const gamingId: any = useSelector(selectGamingId)
  const token = useSelector(selectAuthToken)

  const { userBalance } = useGetBalance()

  const {
    estimatedGas: stakeEstimatedGas,
    handleStake,
    isLoading: stakeLoading,
  } = useStake({
    value: BigInt(buyNum * 1e13),
    onSuccess() {
      toast.success('下单成功')
      userBalance.refetch()
    },
    onError(error, rawError) {
      console.log('stake error', rawError)
      toast.warn('下单失败')
      setLoading(false)
    },
  })

  const {
    estimatedGas: babyLongEstimatedGas,
    orderBabyLong,
    isLoading: babyLoading,
  } = useBabyLong({
    onSuccess() {
      toast.success('下单成功')
      userBalance.refetch()
    },
    onError(error, rawError) {
      console.log('babyLong rawError', rawError)
      toast.warn('下单失败')
    },
    args: babyArgs,
  })

  const handleBuy = async () => {
    if (!walletInfo) {
      toast.warn('请链接钱包')
      return
    }
    if (coinType === '2') {
      // usdt
      if (userInfo.pay_password) {
        // 需输入密码
        setInputPassVisible(true)
      } else {
        setFirstBuyVisible(true)
      }
    }
    if (coinType === '1') {
      // babyLong
      handleBabyLong()
    }
    if (coinType === '0') {
      // matic
      handleMatic()
    }
  }

  const handleMatic = () => {
    const estimatedGasInFloat = stakeEstimatedGas
      ? parseFloat(formatUnits(stakeEstimatedGas, walletInfo?.decimals))
      : null
    if (!estimatedGasInFloat) {
      toast.warn("Couldn't estimate gas")
      return
    }
    if (
      +formatUnits(BigInt(buyNum * 1e13), walletInfo?.decimals) + estimatedGasInFloat >
      walletInfo?.balance
    ) {
      toast.warn('Insufficient balance for gas')
      return
    }
    handleStake()
  }

  const handleBabyLong = async () => {
    setLoading(true)
    try {
      const res: any = await createOrder({
        type: 0,
        number: buyNum,
        id: gamingId,
      })
      if (res.code === 0) {
        const { r, v, s, id, type, amount, coin_token, sign_out_time } = res.data
        const bigAmount = getDecimalAmount(amount, 18)
        setBabyArgs([coin_token, bigAmount, type, id, sign_out_time, v, r, s])
        setTimeout(() => {
          console.log('handleBabyLong, babyLongEstimatedGas', babyLongEstimatedGas)
          const estimatedGasInFloat = babyLongEstimatedGas
            ? parseFloat(formatUnits(babyLongEstimatedGas, walletInfo?.decimals))
            : null
          if (!estimatedGasInFloat) {
            toast.warn("Couldn't estimate gas")
            setLoading(false)
            return
          }
          if (
            +formatUnits(BigInt(buyNum * 1e13), walletInfo?.decimals) + estimatedGasInFloat >
            walletInfo?.balance
          ) {
            toast.warn('Insufficient balance for gas')
            setLoading(false)
            return
          }
          orderBabyLong()
        }, 200)
      } else {
        toast.warn(res.msg)
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
    }
  }

  const closeDialog = () => {
    setBuyShow(false)
  }

  const openDescDialog = () => {
    setDescShow(true)
  }

  const passOK = async passParams => {
    handleReinvestment(passParams)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyNum(Number(event.target.value))
  }

  const selectChange = (option: any) => {
    setCoinType(option.value)
  }

  const handleReinvestment = async passParams => {
    try {
      // todo passLoading
      const res: any = await eggIncomeReinvestment({
        id: gamingId,
        password: passParams.pass,
      })
      if (res.code === 0) {
        setPassVisible(false)
        toast.success('下单成功')
        userBalance.refetch()
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


  const firstBuyClose = async () => {
    setFirstBuyVisible(false)
    setPassVisible(true)
  }

  const fetCoin = useCallback(async () => {
    try {
      const res: any = await getCoin({
        type: -1,
      })
      if (res.code === 0) {
        const options = res.data.map((item: any) => {
          return {
            label: item.name,
            value: item.type,
          }
        })
        setCoinList(options)
        setCoinType(options[0].value)
      } else {
        toast.warn('网络错误')
      }
    } catch (e) {
      console.log('e', e)
      toast.warn('网络错误')
    }
  }, [])

  useEffect(() => {
    if (walletInfo?.address && isBindParent&&userInfo.id&&token) {
      fetCoin()
    }
  }, [walletInfo?.address, isBindParent,userInfo,token])

  return (
    <BuyEggWrap>
      <div>
        <Image src={buyEggPng} alt="buyegg" />
      </div>
      <BuyNumStep>
        <IconButton onClick={() => setBuyNum(buyNum + 1)}>
          <AddIcon sx={{ color: '#fff' }} />
        </IconButton>
        <BuyNumStepItem>{buyNum}</BuyNumStepItem>
        <IconButton disabled={buyNum <= 0} onClick={() => buyNum > 0 && setBuyNum(buyNum - 1)}>
          <RemoveIcon sx={{ color: '#fff' }} />
        </IconButton>
      </BuyNumStep>
      <span className="buying">{t('Buying Methods')}</span>
      <CountInput
        value={buyNum}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
          endAdornment: (
            <AdornmentWrap>
              <InputAdornment position="start">
                <MaticIcon />
              </InputAdornment>
              <BaseSelect
                customStyle={{
                  marginRight: '20px',
                }}
                selectOptions={coinList}
                selectChange={selectChange}
              />
            </AdornmentWrap>
          ),
        }}
        variant="standard"
      />
      <div className="available">
        <span className="buying">{t('Current $Matic available')} :</span>
        <span className="count">{walletInfo?.balance?.toFixed(2)}</span>
      </div>
      <BuyBtn
        iscancel={stakeLoading || loading || babyLoading}
        disabled={stakeLoading || loading || babyLoading}
        onClick={handleBuy}
      >
        {stakeLoading || loading || babyLoading ? t('Loading...') : t('BUY')}
      </BuyBtn>
      <div className="detailed">
        <div>
          <Image width={15} height={15} src={detailedPng} alt="detailed" />
        </div>
        <span className="desc" onClick={openDescDialog}>
          {t('Detailed Description')}
        </span>
      </div>
      <CommonModal visible={descShow} setVisible={setDescShow}>
        <DescContent>
          <div>{t('Detailed Description')}: </div>
          <div>{t('Each Egg Costs 10 $Matic')}</div>
          <div className="minimum">{t('*Minimum initial purchase requirement')}: </div>
          <div className="matic">30 $Matic.</div>
        </DescContent>
      </CommonModal>
      <CommonModal
        visible={firstBuyVisible}
        setVisible={setFirstBuyVisible}
        onClose={firstBuyClose}
      >
        <DescContent className="firstBuy">
          <Image src={firstBuyPng} alt={'firstBuy'} />
          <div>
            {t('The first time you purchase a dragon egg, you need to use $Matic to unlock it.')}
          </div>
        </DescContent>
      </CommonModal>
      <CommonModal
        visible={buyShow}
        setVisible={setBuyShow}
        title={
          <DialogTitle>
            <div>
              <Image src={congratulationPng} width={187} height={160} alt="desc" />
            </div>
          </DialogTitle>
        }
        footer={
          <DialogFooter onClick={closeDialog}>
            <span>{t('receive now')}</span>
          </DialogFooter>
        }
      >
        <CongContent>
          <div>
            <Image src={congratulationsTxtPng} alt="txt" />
          </div>
          <div>{t('you have received $BabyLoong')}</div>
          <div className="countWrap">
            <span>10,000</span>
            <div>
              <MaticIcon />
            </div>
          </div>
        </CongContent>
      </CommonModal>
      <PasswordModal
        visible={passVisible}
        setVisible={setPassVisible}
        onOk={passOK}
        type={userInfo.pay_password ? 'setpass' : 'inputpass'}
      />
    </BuyEggWrap>
  )
}

export default BuyEgg

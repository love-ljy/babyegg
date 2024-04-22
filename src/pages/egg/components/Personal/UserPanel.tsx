import { useState, forwardRef } from 'react'
import styled from '@emotion/styled'
import { Box, Typography, Button } from '@mui/material'
import buyEggPng from '@imgs/buyegg.png'
import Image from 'next/image'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import prizepoolPng from '@imgs/prizepool.png'
import detailedPng from '@imgs/detailed.png'
import grandmasterPng from '@imgs/grandmaster.png'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Menu from '@mui/material/Menu'
import BaseSelect from './BaseSelect'

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
    img {
      margin-right: 24px;
    }
    .prograssWrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      .title {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
      }
      .masterWrap {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
const AdornmentWrap = styled.div`
  display: flex;
  align-items: center;
  width: 140px;
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

const coinList = [
  {
    label: 'Matic',
    value: 'Matic',
  },
  {
    label: 'BSC',
    value: 'BSC',
  },
]
const UserPanel = () => {
  const [values, setValues] = useState('')
  const [coinType, setCoinType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value)
  }
  
  const selectChange = (option: any) => {
    setCoinType(option.value)
  }

  const handleBuy = () => {}

  return (
    <UserPanelWrap>
      <div className="header">
        <div>
          <Image src={grandmasterPng} alt="grandmaster" />
        </div>
        <div className="prograssWrap">
          <div className="title">Title</div>
          <div className="masterWrap">
            <span className="master">Grandmaster</span>
            <span className="percent">100/100</span>
          </div>
          <div>进度条</div>
        </div>
      </div>
    </UserPanelWrap>
  )
}
export default UserPanel

import { type CSSProperties, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import arrowPng from '@imgs/arrow.png'
import useOnClickOutside from '@hooks/useClickOutside'
import Image from 'next/image'

const SelectWrap = styled.div`
  position: relative;
  min-width: 64px;
`

const CurrentData = styled.div((props: any) => {
  return {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50px',
    ...props.customStyle,
  }
})

const SelectModal = styled.div<{ open: boolean; mobile?: boolean }>`
  position: absolute;
  top: ${({ mobile }) => (mobile ? '1.5rem' : '30px')};
  right: 0;
  /* width: 100%; */
  background: rgba(8, 17, 33, 1);
  border-radius: 8px;
  padding: 4px;
  z-index: 11111 !important;
`

const Option = styled.div<{ active?: boolean; disabled?: boolean; mobile?: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 2px 10px;
  background: ${({ active }) => (active ? 'rgba(91, 0, 183, 1)' : 'rgba(8,17,33,1)')};
  border-radius: 4px;
  margin: 4px 0;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  color: #fff;
`

interface Props {
  customStyle?: CSSProperties
  selectOptions?: any
  selectChange?: (option: any) => void
  disabled?: boolean
}

const BaseSelect = ({ customStyle, selectOptions, selectChange, disabled }: Props) => {
  const selectRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [curr, setCurr] = useState<any>()
  const handleClick = () => {
    if (disabled) return
    setOpen(!open)
  }

  useOnClickOutside(selectRef, () => {
    setOpen(false)
  })

  const change = (d: any) => {
    setOpen(!open)
    setCurr(d)
    selectChange?.(d)
  }

  useEffect(() => {
    if (selectOptions?.length !== undefined && selectOptions?.length > 0) {
      setCurr(selectOptions[0])
    }
  }, [selectOptions])

  return (
    <SelectWrap ref={selectRef}>
      <CurrentData onClick={handleClick} customStyle={customStyle}>
        <Box
          sx={{
            userSelect: 'none',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '13px',
            marginRight: '6px',
          }}
        >
          {curr?.label ?? '-'}
        </Box>
        <Image width={10} height={10} src={arrowPng} alt="arrow" />
      </CurrentData>
      {open && (
        <SelectModal open={open}>
          {selectOptions?.map((option: any, i: number) => {
            return (
              <Option
                key={option.value}
                active={option.value === curr?.value}
                onClick={() => {
                  change(option)
                }}
              >
                <span>{option.label}</span>
              </Option>
            )
          })}
        </SelectModal>
      )}
    </SelectWrap>
  )
}

export default BaseSelect

import styled from '@emotion/styled'
import { Dialog, DialogContent } from '@mui/material'
import { CSSProperties } from '@mui/styled-engine'
import Image from 'next/image'
import closePng from '@imgs/close.png'
import { useTranslation } from 'next-i18next'
import LoadingAnimation from './LottieAnimation'

const CommonModalContainer = styled.div`
  .MuiDialog-paper {
    background-color: transparent;
  }
`

const DialogWrap = styled(Dialog)`
  .MuiDialog-paper {
    background-color: transparent;
    color: #fff;
  }
`

const DialogContentWrap = styled(DialogContent)`
  border-radius: 5px;
  /* background: linear-gradient(180deg, rgba(78, 23, 127, 1) 0%, rgba(28, 30, 78, 1) 100%); */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.34);
  &::-webkit-scrollbar {
    display: none;
  }
  .children {

  }
  .close {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 99px;
    height: 29px;
    border-radius: 39px;
    background: rgba(135, 135, 135, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 20px 6px 20px;
    img {
      margin-right: 10px;
    }
  }
`

type Props = {
  visible: boolean
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>
  styles?: CSSProperties
  titleStyles?: CSSProperties
  modalTitleImage?: string
  width?: number
  height?: number
  onClose?: any
  anmitJson:any
}

const LottieModal = (props: Props) => {
  const { visible, width, setVisible, height, anmitJson, onClose } = props
  const { t } = useTranslation('common')
  const close = () => {
    setVisible && setVisible(false)
    onClose && onClose()
  }
  return (
    <CommonModalContainer>
      <DialogWrap open={visible}>
        <DialogContentWrap>
          <div className="children">
                <LoadingAnimation width={width} height={height} anmitJson={anmitJson} />
          </div>
         
        </DialogContentWrap>
      </DialogWrap>
    </CommonModalContainer>
  )
}

export default LottieModal

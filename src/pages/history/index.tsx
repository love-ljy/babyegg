import { useEffect, useState, useCallback } from 'react'
import styled from '@emotion/styled'
import LeftArrowIcon from '@icons/leftArrow.svg'
import MaticIcon from '@icons/matic.svg'
import { Typography } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { getUserHistory } from '@utils/api'
import { useAccount } from 'wagmi'
import { selectIsBindParent, selectAuthToken } from '@store/user'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const InviteWrap = styled.div`
  position: relative;
`

const HistoryWrap = styled.div`
  padding: 0 20px;
`

const Item = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 5px;
  /* background: rgba(35, 29, 85, 1); */
  /* padding: 15px 14px 15px 14px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  .txt {
    color: rgba(255, 255, 255, 0.5);
  }
  .maticCount {
    display: flex;
    align-items: center;
    margin-right: 30px;
    color: rgba(166, 114, 255, 1);
    font-weight: 600;
    span {
      margin-right: 10px;
    }
  }
`

const Bg = styled.div`
  z-index: -1;
  position: absolute;
  top: -193px;
  width: 316px;
  height: 339px;
  opacity: 1;
  border-radius: 238px;
  transform: rotate(90deg);
  background: linear-gradient(
    90deg,
    rgba(141, 16, 192, 0.62) 0%,
    rgba(46, 141, 161, 0.62) 47.13%,
    rgba(9, 20, 124, 0.62) 100%
  );
  filter: blur(120.3px);
`

const Header = styled.div`
  height: 60px;
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  /* line-height: 60px; */
  padding: 0px 24px 0px 24px;
  font-size: 15px;
  color: rgba(255, 255, 255, 1);
  font-weight: 700;
  position: relative;
  .icon {
    position: absolute;
    left: 20px;
    top: 20px;
  }
`

const LastWrap = styled.div`
  display: flex;
  min-height: 480px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  /* border: 1px solid rgba(143, 13, 245, 1); */
  /* box-shadow: inset 0px 0px 12.1px rgba(143, 13, 245, 1); */
  padding: 25px 30px 25px;
  position: relative;
`

const Column = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  background: rgba(22, 34, 54, 1);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  padding: 2px;
  div {
    flex: 1 50%;
    text-align: left;
  }
`

const Source = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  .empty {
    color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* transform: translateY(50%); */
  }
`

const SourceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  font-size: 10px;
  color: rgba(255, 255, 255, 1);
  margin-top: 20px;
  .No {
    flex: 1 30%;
    text-align: left;
  }
  .address {
    flex: 1 70%;
    text-align: left;
  }
`

const CardItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: rgba(255, 255, 255, 1);
  padding: 5px 0;
  /* margin-top: 20px; */
`



interface MyType {
    ids: string[]
    team_num: number
    performances: string
    list: {
        username: string
        my_performance: string
    }[]
}
const CardWrap = styled.div`
    border-radius: 5px;
    margin: 20px 0;
    padding: 15px;
background: rgba(35, 29, 85, 1);
&>p:nth-of-type(1){
    text-decoration: underline;
}
`

interface cardProps {
    title: string
    created_at: string
    coin_name: string
    number: string
    state: string
    t: any
}


const History = () => {
    const router = useRouter()
    const { address } = useAccount()
    const { t } = useTranslation('common')
    const [expanded, setExpanded] = useState<string | false>('panel1')
    const [dataSource, setDataSource] = useState<MyType[]>()
    const isBindParent = useSelector(selectIsBindParent)
    const token = useSelector(selectAuthToken)

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }

    const goBack = () => {
        router.push('/egg')
    }

    const getUserInfoByTeam = useCallback(async () => {
        if (address && isBindParent && token) {
            try {
                const res: any = await getUserHistory()
                if (res.code === 0) {
                    setDataSource(res.data.list)
                } else {
                    toast.warn(res.msg)
                }
            } catch (e) {
                console.log('getUserInfoByTeam error', e)
                toast.warn('网络错误')
            }
        }
    }, [address, isBindParent, token])

    useEffect(() => {
        getUserInfoByTeam()
    }, [getUserInfoByTeam])

    return (
        <InviteWrap>
            <Bg></Bg>
            <Header>
                <div className="icon" onClick={goBack}>
                    <LeftArrowIcon />
                </div>
                <span>{t('history')}</span>
            </Header>
            <HistoryWrap>
                {dataSource &&
                    dataSource.length > 0 &&
                    dataSource.map((e: any, i) => {
                        const { title, created_at, coin_name, number, state} = e
                        return (
                            <>
                                <CardWrap>
                                    <Typography textAlign="left" color="#fff">
                                        {title}
                                    </Typography>
                                    <CardItem>
                                        <Typography>{t('time')}</Typography>
                                        <Typography>{created_at}</Typography>
                                    </CardItem>
                                    <CardItem>
                                        <Typography>{t('coin')}</Typography>
                                        <Typography>{coin_name}</Typography>
                                    </CardItem>
                                    <CardItem>
                                        <Typography>{t('amount')}</Typography>
                                        <Typography>{number}</Typography>
                                    </CardItem>
                                    <CardItem>
                                        <Typography>{t('status')}</Typography>
                                        <Typography>{state}</Typography>
                                    </CardItem>
                                </CardWrap>
                            </>
                        )
                    })}
            </HistoryWrap>
            {dataSource?.length === 0 && (
                <Typography color="#fff" className="empty">
                    No Data
                </Typography>
            )}
        </InviteWrap>
    )
}

export default History

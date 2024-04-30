import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import LeftArrowIcon from '@icons/leftArrow.svg'
import MaticIcon from '@icons/matic.svg'
import { Typography } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { useRouter } from 'next/router'
import { queryUserInfoByTeam } from '@utils/api'

const InviteWrap = styled.div`
  position: relative;
`

const HistoryWrap = styled.div`
  padding: 30px;
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

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }: any) => ({
  marginBottom: '10px',
  background: 'rgba(35, 29, 85, 1)',
  fontSize: '13px',
  color: '#fff',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(35, 29, 85, 1)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))


interface MyType {
  ids: string[];
  team_num: number;
  performances: string;
  list: {
    username: string;
    my_performance: string;
  }[];
}

const Invite = () => {
  const router = useRouter()
  const [expanded, setExpanded] = useState<string | false>('panel1')
  const [dataSource, setDataSource] = useState<MyType[]>()
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  const getUserInfo = async () => {
    const res: any = await queryUserInfoByTeam()
    if (res.code===0) {
      setDataSource(res.data)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  const goBack = () => {
    router.push('/egg')
  }

  return (
    <InviteWrap>
      <Bg></Bg>
      <Header>
        <div className="icon" onClick={goBack}>
          <LeftArrowIcon />
        </div>
        <span>您的推广记录</span>
      </Header>
      <HistoryWrap>
        {dataSource && dataSource?.length > 0 && dataSource?.map((e: any, i) => {
          return (
            <>
              <Accordion key={e?.team_num+i+'s'} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Item>
                    <div>{i+1} 代</div>
                    <div>
                      <span className="txt">人数: </span>
                      <span>{e?.team_num}</span>
                    </div>
                    <div className="maticCount">
                      <span>{e?.performances}</span> <MaticIcon />
                    </div>
                  </Item>
                </AccordionSummary>
                <AccordionDetails>
                  <LastWrap>
                    <div
                      style={{
                        width: '100%',
                      }}
                    >
                      <Column>
                        <div>No.</div>
                        <div>Address</div>
                      </Column>
                      <Source>
                        {e && e?.list && e?.list?.length ? (
                          e?.list.map((item: any) => {
                            return (
                              <SourceItem key={item?.username}>
                                <div className="No">{item?.my_performance}</div>
                                <div className="address">{item?.username}</div>
                              </SourceItem>
                            )
                          })
                        ) : (
                          <div className="empty">No Data</div>
                        )}
                      </Source>
                    </div>
                  </LastWrap>
                </AccordionDetails>
              </Accordion>
            </>
          )
        })}
      </HistoryWrap>
      {dataSource?.length===0&&<Typography color="#fff" className="empty">No Data</Typography>}
    </InviteWrap>
  )
}

export default Invite

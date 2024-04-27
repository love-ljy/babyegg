import styled from '@emotion/styled'
import CopyIcon from '@icons/copy.svg'
import invitePng from '@imgs/invite.png'
import MaticIcon from '@icons/matic.svg'
import { useSelector } from 'react-redux'
import { selectWalletInfo, selectUserInfo } from '@store/user'
import Image from 'next/image'
import { useRouter } from 'next/router'
const InvitationWrap = styled.div`
  border-radius: 5px;
  background: rgba(8, 17, 33, 1);
  border: 1px solid rgba(26, 0, 187, 1);
  box-shadow: inset 0px 0px 12.1px rgba(26, 0, 187, 1);
  padding: 25px 12px;
  .title {
    font-size: 15px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 4px;
  }
`
const Copy = styled.div`
  border-radius: 5px;
  background: rgba(0, 0, 0, 1);
  border: 1px solid rgba(26, 0, 187, 1);
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  .text {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
    text-align: left;
  }
`
const InvitationHistory = styled.div`
  display: flex;
  justify-content: center;
  font-size: 10px;
  text-decoration: underline;
  color: rgba(255, 255, 255, 0.5);
  span {
    margin-left: 10px;
  }
`
const CommonRow = styled.div`
  border-radius: 5px;
  background: rgba(0, 0, 0, 1);
  border: 1px solid rgba(26, 0, 187, 1);
  margin-bottom: 10px;
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
    .bot-r {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        margin-left: 6px;
      }
    }
  }
`
const Invitation = () => {
  const router = useRouter()
  const userInfo: any = useSelector(selectUserInfo)

  const toHistory = () => {
    router.push('invite')
  }

  return (
    <InvitationWrap>
      <div className="title">Your Invitation Link</div>
      <Copy>
        <span className="text">www.babyloongworld.com/2fw718sfg</span>
        <CopyIcon />
      </Copy>
      <CommonRow>
        <div className="topTxt">
          <span>当前您的推荐有效地址数量</span>
        </div>
        <div className="bot">
          <span>10,000.00</span>
        </div>
      </CommonRow>
      <CommonRow>
        <div className="topTxt">
          <span>当前您的累计推广所得奖励</span>
        </div>
        <div className="bot">
          <span>{userInfo.share_award || 0}</span>
          <div className="bot-r">
            <MaticIcon />
            <span className="topTxt">Matic</span>
          </div>
        </div>
      </CommonRow>
      <CommonRow>
        <div className="topTxt">
          <span>当前您的小区业绩总额</span>
        </div>
        <div className="bot">
          <span>{userInfo.share_award || 0}</span>
          <div className="bot-r">
            <MaticIcon />
            <span className="topTxt">Matic</span>
          </div>
        </div>
      </CommonRow>
      <CommonRow>
        <div className="topTxt">
          <span>当前您的小区新增业绩总额（每周）</span>
        </div>
        <div className="bot">
          <span>{userInfo.share_award || 0}</span>
          <div className="bot-r">
            <MaticIcon />
            <span className="topTxt">Matic</span>
          </div>
        </div>
      </CommonRow>
      <CommonRow>
        <div className="topTxt">
          <span>当前您的小区新增业绩总额（每月）</span>
        </div>
        <div className="bot">
          <span>{userInfo.share_award || 0}</span>
          <div className="bot-r">
            <MaticIcon />
            <span className="topTxt">Matic</span>
          </div>
        </div>
      </CommonRow>
      <InvitationHistory onClick={toHistory}>
        <Image src={invitePng} alt="invite" />
        <span>查看您的推广记录</span>
      </InvitationHistory>
    </InvitationWrap>
  )
}

export default Invitation

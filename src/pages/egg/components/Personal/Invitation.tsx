import styled from '@emotion/styled'
import CopyIcon from '@icons/copy.svg'
import invitePng from '@imgs/invite.png'
import MaticIcon from '@icons/matic.svg'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '@store/user'
import Image from 'next/image'
import { useRouter } from 'next/router'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

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
  // @ts-ignore
  const { t } = useTranslation('common')
  const router = useRouter()
  const userInfo: any = useSelector(selectUserInfo)

  const toHistory = () => {
    router.push('invite')
  }

  const copyLink = () => {
    copy(
      `${typeof window !== 'undefined' ? window?.location?.origin : ''}?invite=${userInfo?.invite}`
    )
    toast.success('复制成功')
  }

  return (
    <InvitationWrap>
      <div className="title">{t('Your Invitation Link')}</div>
      <Copy onClick={copyLink}>
        <span className="text">{`${typeof window !== 'undefined' ? window?.location?.origin : ''}?invite=${userInfo?.invite}`}</span>
        <CopyIcon />
      </Copy>
      <CommonRow>
        <div className="topTxt">
          <span>{t('Current Number of Your Valid Referral Addresses')}</span>
        </div>
        <div className="bot">
          <span>{userInfo?.true_son_num || 0}</span>
        </div>
      </CommonRow>
      <CommonRow>
        <div className="topTxt">
          <span>{t('Current Total Earnings from Your Referrals')}</span>
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
          <span>{t('Current Amount of Total Minor Group Sales')}</span>
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
          <span>{t('Current Amount of Your Weekly New Sales')}</span>
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
          <span>{t('Current Amount of Your Monthly New Sales')}</span>
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
        <span>{t('View your promotion history')}</span>
      </InvitationHistory>
    </InvitationWrap>
  )
}

export default Invitation

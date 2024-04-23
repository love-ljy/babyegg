import React from 'react'
import Router, { useRouter } from 'next/router'
import { Box, Typography, Button, Stack, Container } from '@mui/material'
import Image from 'next/image'
import Slider from 'react-slick'
import styled from '@emotion/styled'
import erji from '@imgs/erji.png'
import shoub from '@imgs/shb.png'
import Token from '@imgs/token.png'
import runlong from '@imgs/runlong.png'
import hatch from '@imgs/hatchegg.png'
import develop from '@imgs/develop.png'
import GameCard from './components/GameCard'
import grounp1 from '@imgs/Group_4.png'
import grounp2 from '@imgs/Group_5.png'
import grounp3 from '@imgs/Group_6.png'
import grounp4 from '@imgs/Group_7.png'
import grounp5 from '@imgs/Group_8.png'
import grounp6 from '@imgs/Group_9.png'
import { toast } from 'react-toastify'

const LayBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const SlideBox = styled(Box) <{ bg: string }>`
  width: 100%;
  position: relative;
  color: #fff;
  height: calc(100vh - 120px);

  background-image: ${({ bg }) => `url(${bg})`};
  background-repeat: no-repeat;
  background-size: cover; // 完全覆盖 div
`
const InfoBox = styled(Box)`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 57.59%, #000 100%);
`

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  width: 100%;
  text-align: left;
  padding: 20px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 57.59%, #000 100%);
`

const TitleBox = styled.div`
  font-family: Inter;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
`
const ProjectBox = styled.div`
  position: relative;
  height: 363px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  justify-content: center;
  margin: 60px 0;
`
const ProjectDes = styled.div`
  border-radius: 238px;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
      180deg,
      #000 0%,
      rgba(0, 0, 0, 0) 17%,
      rgba(0, 0, 0, 0) 78.5%,
      #000 100%
    ),
    linear-gradient(
      141deg,
      rgba(141, 16, 192, 0.74) -2.67%,
      rgba(64, 50, 151, 0.74) 46.7%,
      rgba(23, 37, 82, 0.74) 99.73%
    );
  filter: blur(10.949999809265137px);
  height: 363px;
  width: 100%;
  z-index: -1;
`
const LeftBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`
const RightBox = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`
const TokenDesc = styled.div`
  border-radius: 5px;
border: 1px solid #8F0DF5;
background: #000;
margin: 20px 0;
text-align: left;
padding: 5px 12px;
width: 100%;
`
const TokenTitle = styled.div`
  color: rgba(255, 255, 255, 0.50);
font-family: Inter;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const TokenContainer = styled.div`
  position: relative;
  height: 100%;
`
const TokenImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const TokenBg = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  transform: rotate(-90deg);
  flex-shrink: 0;
  border-radius: 238px;
background: linear-gradient(109deg, rgba(141, 16, 192, 0.62) 21.46%, rgba(46, 141, 161, 0.62) 54.77%, rgba(9, 20, 124, 0.62) 92.13%);
filter: blur(60.150001525878906px);
  width: 100%;
  height: 339px;
  z-index: -1;
`
const TokenBurn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`

const EcologyCard = styled.div`
margin-bottom: 40px;
background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 12.5%, rgba(0, 0, 0, 0.00) 83.5%, #000 100%), linear-gradient(141deg, rgba(141, 16, 192, 0.48) -2.67%, rgba(64, 50, 151, 0.48) 46.7%, rgba(23, 37, 82, 0.48) 99.73%);
`
const PartenerBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列，每列等宽 */
  grid-template-rows: auto auto auto; /* 三行，自适应内容高度 */
  gap: 20px; /* 行和列之间的间隔 */
  justify-content: center;
  padding: 20px;
  align-items: center;
  align-content: center;
  margin-bottom: 60px;
`
const slides = [
  {
    title: '踏上充满',
    name: '惊奇之旅',
    desc: '探索宝贝龙蛋的奥妙！',
    imageUrl: '/img/image1.png',
    path:'/egg',
    isComing:false
  },
  { title: '准备好，', name: '冲吖', desc: '让宝贝龙激情的释放速度', imageUrl: '/img/image2.png', path:'/egg',
  isComing:true },
  { title: '狂欢中', name: '', desc: '喂饱您的宝贝龙！', imageUrl: '/img/image3.png', path:'/egg',
  isComing:true },
]

const ecologyLits = [
  { title: '宝贝龙蛋孵化大赛', comingsoon: false, image: hatch, description: '玩家使用 $MATIC 购买 BabyLoong 蛋，这些蛋会在 24 小时内孵化并释放更多代币。 游戏提供奖励、双倍收入和资产积累。 最终奖池将分配给最后 100 名玩家，从而提高盈利的可能性。 这款创新游戏融合了 Polygon 链上的社交和战略元素，以实现财富增长。' },
  { title: '龙龙快跑', comingsoon: true, image: runlong, description: '“龙龙快跑”是一款激动人心的在线冲刺模拟游戏，参与者使用代币来预测比赛结果，猜对即可获得奖励。 最后一名 BabyLoong 的赌注将被销毁 5%，以增加悬念和价值，而 90% 的赌注将分配给表现最佳的赌注，另外 5% 的赌注将作为共享奖励。 该游戏融合了预测、策略和运气，以应对不可预测的比赛。' },
  { title: '宝贝龙养成记', comingsoon: true, image: develop, description: '在这款独特的饲养游戏中，玩家每天用代币喂养 BabyLoongs，从而增加奖金。 每个周期后，最大和最小的 BabyLoongs 都会领取奖品。 该游戏融合了培育和战略投资，带来引人入胜的体验。' }

]
const Parteners = [
  grounp1, grounp2, grounp3, grounp4, grounp5, grounp6
]

const Home: React.FC = () => {
  const router = useRouter();
  const HandleGoGame = (e:any)=>{
    if(!e.isComing){
      router.push(e.path)
    }else{
      toast('敬请期待')
    }
  }
  return (
    <LayBox>
      <Slider
        dots={true}
        accessibility={false}
        autoplay={true}
        adaptiveHeight={true}
        autoplaySpeed={3000}
        arrows={false}
      >
        {slides.map(e => {
          return (
            <InfoBox key={e.title}>
              <SlideBox bg={e.imageUrl}>
                <ContentBox>
                  <Box width="100%">
                    <TitleBox>{e.title}</TitleBox>
                    <TitleBox>{e.name}</TitleBox>
                    <Typography>{e.desc}</Typography>
                  </Box>
                </ContentBox>
              </SlideBox>
              <Stack flexDirection="row">
                <Button onClick={()=>{HandleGoGame(e)}} sx={{ margin: '30px 20px' }} fullWidth variant="contained">
                  探索游戏
                </Button>
              </Stack>
            </InfoBox>
          )
        })}
      </Slider>
      <ProjectBox>
        <ProjectDes />
        <LeftBox>
          <Image width="91" height={108} src={erji} alt="" />
        </LeftBox>
        <RightBox>
          <Image width="124" height={99} src={shoub} alt="" />
        </RightBox>
        <Typography fontSize="40px" color="#fff" fontWeight="bold">
          项目简介
        </Typography>
        <Typography fontSize="15px" color="#fff">
          ⻢蹄链上⾸创社会实验meme币，融合燃烧机制与丰富游戏⽣态。它不仅是散户的福⾳，也是⾲菜崛起的新篇章，旨在重燃⻢蹄链的辉煌，致敬伟⼤的meme精神。这标志着区块链与NFT游戏领域的⼀次创新⻜跃。
        </Typography>
      </ProjectBox>
      <Container sx={{ width: '100%' }}>
        <Typography fontSize="40px" color="#fff" fontWeight="bold">
          宝贝龙代币通证
        </Typography>
        <TokenContainer>
          <TokenBg />
          <TokenImg>
            <Image width="159" height={159} src={Token} alt="" />
          </TokenImg>
          <TokenDesc>
            <TokenTitle>总供应</TokenTitle>
            <Typography fontSize="12px" fontWeight="bold" color="#fff">12,800,000,000</Typography>
          </TokenDesc>
          <TokenDesc>
            <TokenTitle>合约</TokenTitle>
            <Typography fontSize="12px" fontWeight="bold" color="#fff">0x8cf572c204f3294267b0bfff180d0cea5ec3e903</Typography>
          </TokenDesc>
          <TokenDesc>
            <TokenTitle>底池燃烧</TokenTitle>
            <Typography fontSize="12px" fontWeight="bold" color="#fff">0.375%/ 小时</Typography>
          </TokenDesc>

          <TokenDesc>
            <TokenTitle>税收奖励池</TokenTitle>
            <Typography fontSize="12px" fontWeight="bold" color="#fff">5%</Typography>
          </TokenDesc>
          <TokenDesc>
            <TokenTitle>税收奖励池</TokenTitle>
            <TokenBurn>
              <div>
                <Typography fontSize="12px" fontWeight="bold" color="#fff">2% - 符文持有者 </Typography>
                <Typography fontSize="12px" fontWeight="bold" color="#fff">2% - 社区贡献者</Typography>
              </div>
              <div>
                <Typography fontSize="12px" fontWeight="bold" color="#fff">0.5% - 底池回流
                </Typography>
                <Typography fontSize="12px" fontWeight="bold" color="#fff">0.5% - 市场营销</Typography>
              </div>
            </TokenBurn>
          </TokenDesc>
          <TokenDesc>
            <TokenTitle>底池锁仓1年</TokenTitle>
            <Typography sx={{ wordBreak: 'break-all' }} fontSize="12px" fontWeight="bold" color="#fff">https://www.pinksale.finance/pinklock/polygon/record/
              1002383</Typography>
          </TokenDesc>
        </TokenContainer>
       
      </Container>
      <Typography my={2} fontSize="40px" color="#fff" fontWeight="bold">游戏生态</Typography>
      <EcologyCard>
          {ecologyLits.map(e => {
            return (
              <GameCard key={e.title} title={e.title} image={e.image} description={e.description} comingsoon={e.comingsoon} />
            )
          })}
        </EcologyCard>
        <Typography my={2} fontSize="40px" color="#fff" fontWeight="bold">游戏生态</Typography>
        <PartenerBox>
          {
            Parteners.map((e,i) => {
              return (
                // <PartenerCard key={e.title} title={e.title} image={e.image} />
               <Box key={i+'2s'} margin="0 auto">
                 <Image width={140} src={e}   alt=""/>
               </Box>
              )
            })
          }
        </PartenerBox>
    </LayBox>
  )
}

export default Home

import React from 'react'
import { Box, Typography, Button, Stack, Container } from '@mui/material'
import Image from 'next/image'
import Slider from 'react-slick'
import styled from '@emotion/styled'
import erji from '@imgs/erji.png'
import shoub from '@imgs/shb.png'
import Token from '@imgs/token.png'

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
  transform: rotate(-270deg);
  flex-shrink: 0;
  border-radius: 238px;
background: linear-gradient(109deg, rgba(141, 16, 192, 0.62) 21.46%, rgba(46, 141, 161, 0.62) 54.77%, rgba(9, 20, 124, 0.62) 92.13%);
filter: blur(60.150001525878906px);
  width: 100%;
  /* height: 339px; */
  z-index: -1;
`

const slides = [
  {
    title: '踏上充满',
    name: '惊奇之旅',
    desc: '探索宝贝龙蛋的奥妙！',
    imageUrl: '/img/image1.png',
  },
  { title: '准备好，', name: '冲吖', desc: '让宝贝龙激情的释放速度', imageUrl: '/img/image2.png' },
  { title: '狂欢中', name: '', desc: '喂饱您的宝贝龙！', imageUrl: '/img/image3.png' },
]

const Home: React.FC = () => {
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
                <Button sx={{ margin: '30px 20px' }} fullWidth variant="contained">
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
      <Container sx={{width:'100%'}}>
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
            <Typography color="#fff">12,800,000,000</Typography>
          </TokenDesc>
          <TokenDesc>
            <TokenTitle>总供应</TokenTitle>
            <Typography color="#fff">12,800,000,000</Typography>
          </TokenDesc>
          <TokenDesc>
            <TokenTitle>总供应</TokenTitle>
            <Typography color="#fff">12,800,000,000</Typography>
          </TokenDesc>
          
          <TokenDesc>
            <TokenTitle>总供应</TokenTitle>
            <Typography color="#fff">12,800,000,000</Typography>
          </TokenDesc>
          <TokenDesc>
            <TokenTitle>总供应</TokenTitle>
            <Typography color="#fff">12,800,000,000</Typography>
          </TokenDesc>
        </TokenContainer>
        
      </Container>
    </LayBox>
  )
}

export default Home

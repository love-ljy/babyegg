import React, { useState } from 'react'
import {
  Box,
  Typography,
  Drawer,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Image from 'next/image'
import logo from '@imgs/logo_big.png'
import Router, { useRouter } from 'next/router'
import styled from '@emotion/styled'
import LinkIcon from '@icons/link.svg'
import HomeIcon from '@icons/home.svg'
import NftIcon from '@icons/nft.svg'
import LinkActiveIcon from '@icons/link_a.svg'
import HomeActiveIcon from '@icons/home_a.svg'
import NftActiveIcon from '@icons/nft_a.svg'
import LiveIcon from '@imgs/live.png'
import RechargeIcon from '@icons/recharge.svg'
import RunIcon from '@imgs/run.png'
import recharge from '@imgs/recharge.png'

interface DrawProps {
  open: boolean
  onClose: () => void
}

const MenuButton = styled(ListItemButton)<{ isactive?: number }>`
  border-radius: 10px;
  padding: 3px 16px;
  background: ${({ isactive }) =>
    isactive
      ? 'linear-gradient(90deg, #3220D0 0.91%, #F61A7E 102.54%, rgba(0, 0, 0, 0.00) 122.05%);'
      : 'none'};
`

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  transform: translate(0, 12%);
`

const config = [
  { name: 'Home', icon: <HomeIcon />, activeIcon: <HomeActiveIcon />, path: '/' },
  { name: 'NFT', icon: <NftIcon />, activeIcon: <NftActiveIcon />, path: '/nft' },
  { name: '连线', icon: <LinkIcon />, activeIcon: <LinkActiveIcon />, path: '/link' },
]

const config2 = [
  { name: '宝贝龙蛋孵化大赛', icon: <Image src={recharge} width="35" height="35" alt='' />, activeIcon: <Image src={recharge} width="35" height="35" alt='' />, path: '/' },
  { name: '龙龙快跑', icon: <Image src={LiveIcon} width="35" height="35" alt='' />, activeIcon: <Image src={LiveIcon} width="35" height="35" alt='' />, path: '/nft' },
  { name: '宝贝龙养成记', icon:<Image src={RunIcon} width="35" height="35" alt='' />, activeIcon: <Image src={RunIcon} width="35" height="35" alt='' />, path: '/link' },
]

const DrawerMenu: React.FC<DrawProps> = ({ open, onClose }) => {
  const { pathname } = useRouter()
  const toggleDrawer = (path:string) => {
    Router.push(path);
    onClose()
  }
  return (
    <React.Fragment>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <LogoBox>
          <Image width="132" height={101} src={logo} alt="" />
        </LogoBox>
        <Box p="20px">
          <List>
            {config.map((text, index) => (
              <ListItem key={text.name} disablePadding sx={{ marginBottom: '10px' }}>
                <MenuButton onClick={()=>{toggleDrawer(text.path)}} isactive={pathname === text.path ? 1 : 0}>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    {pathname === text.path ? text.activeIcon : text.icon}
                  </ListItemIcon>
                  <Typography
                    fontSize="15px"
                    fontWeight={500}
                    color={pathname === text.path ? '#fff' : '#878787'}
                  >
                    {text.name}
                  </Typography>
                </MenuButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: '#fff', margin: '30px 0' }} />
          <List>
            <Typography textAlign="left" color="#F21A80;" fontSize="12px">
              Trending Games
            </Typography>
            {config2.map((text, index) => (
              <ListItem key={text.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    {pathname === text.path ? text.activeIcon : text.icon}
                    {/* <Image width="35" height={35} src={recharge} alt="" /> */}
                  </ListItemIcon>
                  <Typography fontSize="15px" fontWeight={500} color={'#878787'}>
                    {text.name}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}

export default DrawerMenu

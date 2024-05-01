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
import Link from 'next/link';
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
import { useTranslation } from 'next-i18next'
import RunIcon from '@imgs/run.png'
import recharge from '@imgs/recharge.png'
import enImg from '@imgs/en.png'
import zhImg from '@imgs/zh.png'

import { alpha } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

interface DrawProps {
  open: boolean
  onClose: () => void
}
const PinkSwitch = styled(Switch)(({ }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], 0.2),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
  '& .MuiSwitch-track': {
    backgroundColor: "#fff",
  },
}));

const LanguageBox = styled.div`
    display: grid;
    grid-template-columns: 1fr;   
    align-items: center;
    gap: 10px;
    width: 30vw;
    margin-left: 10px;
  `
const LangItem = styled.div<{active:boolean}>`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  align-items: center;
  border: 1px solid ${({active})=>active?'#F61A7E':"#878787"};
`
const LangDot = styled.div<{active:boolean}>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background:${({active})=>active?'#04f80b':"#878787"};
`

const MenuButton = styled(ListItemButton) <{ isactive?: number }>`
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
  { name: 'WhiteList', icon: <LinkIcon />, activeIcon: <LinkActiveIcon />, path: '/link' },
]

const config2 = [
  { name: 'The Egg Hatchathon', path: '/egg', icon: <Image src={recharge} width="35" height="35" alt='' />, activeIcon: <Image src={recharge} width="35" height="35" alt='' /> },
  { name: 'BabyLoong Dash', path: '/nft', icon: <Image src={LiveIcon} width="35" height="35" alt='' />, activeIcon: <Image src={LiveIcon} width="35" height="35" alt='' />  },
  { name: 'BabyLoong Raising Saga', icon: <Image src={RunIcon} width="35" height="35" alt='' />, activeIcon: <Image src={RunIcon} width="35" height="35" alt='' />, path: '/link' },
]

const DrawerMenu: React.FC<DrawProps> = ({ open, onClose }) => {
  const { pathname } = useRouter()
  const { t } = useTranslation('common')
  const router = useRouter();
  const { locales, locale: currentLocale } = router;
  const toggleDrawer = (path: string) => {
    Router.push(path);
    onClose()
  }
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
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
                <MenuButton onClick={() => { toggleDrawer(text.path) }} isactive={pathname === text.path ? 1 : 0}>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    {pathname === text.path ? text.activeIcon : text.icon}
                  </ListItemIcon>
                  <Typography
                    fontSize="15px"
                    fontWeight={500}
                    color={pathname === text.path ? '#fff' : '#878787'}
                  >
                    {t(text.name)}
                  </Typography>
                </MenuButton>
              </ListItem>
            ))}
          </List>
          
          
            <LanguageBox>
              <Link href={router.asPath} onClick={onClose} locale={ 'en'}>
                <LangItem active={currentLocale==='en'}>
              <Image src={enImg} width={20} height={20} alt='' />
              <LangDot active={currentLocale==='en'}/>
              </LangItem>
              </Link>
              <Link href={router.asPath} onClick={onClose} locale={'zh' }>
              <LangItem active={currentLocale==='zh'}>
              <Image src={zhImg} width={20} height={20} alt='' />
              <LangDot active={currentLocale==='zh'}/>
              </LangItem>
              </Link>
            </LanguageBox>
       

          <Divider sx={{ borderColor: '#fff', margin: '30px 0' }} />
          <List>
            <Typography textAlign="left" color="#F21A80;" fontSize="12px">
              {t('Trending Games')}
            </Typography>
            {config2.map((text, index) => (
              <Link  onClick={onClose} href={text.path}>
              <ListItem key={text.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    {pathname === text.path ? text.activeIcon : text.icon}
                  </ListItemIcon>
                  <Typography fontSize="15px" fontWeight={500} color={pathname === text.path ?'#fff':'#878787'}>
                    {t(text.name)}
                  </Typography>
                </ListItemButton>
              </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}

export default DrawerMenu

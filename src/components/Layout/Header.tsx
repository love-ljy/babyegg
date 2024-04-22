import {useState} from 'react';
import Image from "next/image";
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';
import {ConnectButton} from './ConnectWallet';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@icons/menu.svg';
import logo from '@imgs/logo.png'
import DrawerMenu from './Draw'

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
 

export default function HomeAppBar() {
  const [isOpen,setIsOpen] = useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
          <LogoBox>
          <IconButton
            onClick={() => setIsOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
           <MenuIcon/>
           {/* <Image width="64" height={38} src={menu} alt="" /> */}
          </IconButton>
          <Image width="64" height={38} src={logo} alt="" />
          </LogoBox>
          <ConnectButton>链接钱包</ConnectButton>
          {/* <Button color="inherit">链接钱包</Button> */}
        </Toolbar>
      </AppBar>
      <DrawerMenu open={isOpen} onClose={() => setIsOpen(false)}/>
    </Box>
  );
}

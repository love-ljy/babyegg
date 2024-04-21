import * as React from 'react';
import Image from "next/image";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@icons/menu.svg';
import logo from '@imgs/logo.png'

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
 

export default function HomeAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
          <LogoBox>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Image width="64" height={38} src={logo} alt="" />
          </LogoBox>
          <Button color="inherit">链接钱包</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
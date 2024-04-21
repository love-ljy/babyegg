import React from "react";
import {Container,Box} from '@mui/material';
import styled from "@mui/material";
import HomeAppBar from './Header'



interface Props {
    children?: React.ReactNode;
  }
  const Layout:React.FC<Props> = ({children}) => {
    return (
        <Box>
            <HomeAppBar/>
            <Container>{children}</Container>
        </Box>
    )
}


export default Layout
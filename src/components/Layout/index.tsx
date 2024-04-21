import React from "react";
import {Container} from '@mui/material';
import styled from '@emotion/styled';
import HomeAppBar from './Header'
import Footer from './Footer'

const LayBox = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`


interface Props {
    children?: React.ReactNode;
  }
  const Layout:React.FC<Props> = ({children}) => {
    return (
        <LayBox>
            <HomeAppBar/>
            <Container sx={{padding:0}}>{children}</Container>
            <Footer/>
            
        </LayBox>
    )
}

export default Layout

import React from "react";
import {Container,Box} from '@mui/material';
import styled from "@mui/material";
import HomeAppBar from './Header'



const Layout = (props: any) => {
    return (
        <Container>
            <HomeAppBar/>
            <Box>{props.children}</Box>
        </Container>
    )
}


export default Layout
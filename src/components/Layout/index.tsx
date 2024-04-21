import React from 'react'
import { Container, Box } from '@mui/material'
import styled from '@mui/material'
import HomeAppBar from './Header'
import Footer from './Footer'

interface Props {
  children?: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <HomeAppBar />
      {children}
      <Footer />
    </Box>
  )
}

export default Layout

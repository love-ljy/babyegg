import React from 'react'
import { Container } from '@mui/material'
import styled from '@emotion/styled'
import HomeAppBar from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'

const LayBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const HideNav = ['/invite']?.some(x => x === router.pathname)
  const HideFooter = ['/invite']?.some(x => x === router.pathname)

  return (
    <LayBox>
      {!HideNav && <HomeAppBar />}
      <Container sx={{ padding: 0 }}>{children}</Container>
      {!HideFooter && <Footer />}
    </LayBox>
  )
}

export default Layout

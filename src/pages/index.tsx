import { GetStaticProps } from 'next'
import { loadCatalog } from '@i8n'
import Home from './home'
export default function Index() {
  return <Home />
}

export const getStaticProps: GetStaticProps = async ctx => {
  const translation = await loadCatalog(ctx.locale!)
  return {
    props: {
      translation,
    },
  }
}

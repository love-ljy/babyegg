import styled from '@emotion/styled'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const PaginationWrap = styled(Pagination)`
  .MuiPaginationItem-root {
    color: #fff;
  }
  .Mui-selected {
    background: rgba(91, 0, 183, 1);
  }
`

const CommonPage = (props) => {
  const {count,page,handleChange} = props
  return (
    <Stack spacing={2}>
      <PaginationWrap count={count} page={page} siblingCount={0} onChange={handleChange} shape="rounded" color="secondary" />
    </Stack>
  )
}

export default CommonPage

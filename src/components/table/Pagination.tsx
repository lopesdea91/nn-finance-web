import { Box } from "@mui/material"
import { useMemo } from "react"
import { AppButtonGroup, AppButtonIcon, AppSelect } from "@/components/base"
import { _limitApi } from "@/types/enum"

interface Props {
  handleChangePage: (newPage: number) => void
  handleChangeRowsPerPage: (newLimit: _limitApi) => void
  search: { limit: number, page: number, total: number }
}
export const Pagination = (props: Props) => {
  const { handleChangePage, handleChangeRowsPerPage, search } = props

  const val = String(search.limit)

  const lastPage = useMemo(() => {
    return Math.ceil(search.total / search.limit)
  }, [search.total, search.limit])

  return (
    <Box
      sx={{
        width: 'min-content',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        pt: 2,
        '& .MuiInputBase-root': {
          height: '30px'
        }
      }}
    >
      <AppSelect
        label="Limite"
        options={[
          { id: '15', description: '15' },
          { id: '30', description: '30' },
          { id: '50', description: '50' },
        ]}
        value={val}
        onChange={e => handleChangeRowsPerPage(e.target.value as _limitApi)}
      />
      <AppButtonGroup>
        <AppButtonIcon
          variant='arrowLeft'
          disabled={search.page === 1}
          onClick={() => handleChangePage(search.page - 1)}
        />
        <AppButtonIcon
          variant='arrowRight'
          disabled={search.page === lastPage}
          onClick={() => handleChangePage(search.page + 1)}
        />
      </AppButtonGroup>
    </Box>
  )
}
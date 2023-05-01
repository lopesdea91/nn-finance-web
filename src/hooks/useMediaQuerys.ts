import { useMediaQuery } from '@mui/material'

export const useMediaQuerys = () => {
  const minTable = useMediaQuery('(min-width: 426px)')
  const minDesktop = useMediaQuery('(min-width: 768px)')

  return {
    minTable,
    minDesktop
  }
}
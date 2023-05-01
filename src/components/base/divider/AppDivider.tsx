import { Divider, DividerProps } from '@mui/material'


export const AppDivider = (props: DividerProps) => {
  return (
    <Divider sx={{ my: 1 }} {...props} />
  )
}

export default AppDivider
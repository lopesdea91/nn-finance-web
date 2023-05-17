import React from "react"
import { Box, BoxProps } from "@mui/system"

type Props = {
  children: React.ReactNode
  onSubmit: HTMLFormElement['onSubmit']
  sx?: BoxProps['sx']
  id?: HTMLFormElement['id']
}
const AppForm = ({ children, onSubmit, sx, ...rest }: Props) => {
  return (
    <Box sx={{ mb: 3, ...sx }}>
      <form onSubmit={onSubmit} {...rest}>
        {children}
      </form>
    </Box>
  )
}

AppForm.displayName = 'AppForm'

export { AppForm }


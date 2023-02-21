import React from 'react'
import { Box, Typography, TypographyProps } from '@mui/material'

type Props = TypographyProps & {
  children: React.ReactNode
  contentEnd?: React.ReactNode
}

export const AppTitle = ({ children, contentEnd, ...rest }: Props) => {
  return (
    <Box sx={{
      ml: 'auto',
      display: "flex",
      flexWrap: 'wrap',
      alignItems: "center"
    }}
    >
      <Typography sx={{ mb: 0 }} {...rest}>
        {children}
      </Typography>

      {contentEnd &&
        <Box sx={{ ml: 'auto' }} >{contentEnd}</Box>}
    </Box>
  )
}
export default AppTitle

import React from 'react'
import { Box, Typography, TypographyProps } from '@mui/material'

type Props = TypographyProps & {
  children: React.ReactNode
  contentEnd?: React.ReactNode
}
export const AppTitle = ({ children, contentEnd, sx, ...rest }: Props) => {
  return (
    <Box sx={{
      display: "flex",
      flexWrap: 'wrap',
      alignItems: "center",
      p: 1,
      mb: 2,
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0px 1px 4px 0px  rgba(0, 0, 0, 0.05)',
      ...sx
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

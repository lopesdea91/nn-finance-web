import { Box, BoxProps } from "@mui/material"

interface AppTabPanelProps {
  children: React.ReactNode
  value: number
  index: number
  keepAlive?: boolean
  sx?: BoxProps['sx']
}
export const AppTabPanel = (props: AppTabPanelProps) => {
  const { children, value, index, keepAlive, sx, ...rest } = props

  return (keepAlive !== undefined && value !== index)
    ? null
    : (
      <Box
        role="tabpanel"
        className="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...rest}
        sx={{ p: 1, ...sx }}
      >
        {children}
      </Box>
    )
}
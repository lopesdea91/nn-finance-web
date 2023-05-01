import { Tab, TabProps } from "@mui/material"

interface AppTabProps extends TabProps {
  index: number
}
export const AppTab = ({ label, index, sx, ...props }: AppTabProps) => {
  return (
    <Tab
      aria-controls={`tabpanel-${index}`}
      id={`tab-${index}`}
      label={label}
      {...props}
      sx={{
        minHeight: 'unset',
        lineHeight: 1,
        ...sx
      }}
    />
  )
}

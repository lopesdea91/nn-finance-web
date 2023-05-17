import { Tabs, TabsProps } from "@mui/material"

interface AppTabsProps extends TabsProps {
  handleChangeTabs: (value: number) => void
}
export const AppTabs = ({ handleChangeTabs, ...props }: AppTabsProps) => {
  const handleChange = (event: React.SyntheticEvent, value: number) => {
    handleChangeTabs(value)
  }
  return <Tabs
    {...props}
    onChange={handleChange}
    sx={{
      minHeight: 'unset',
    }}
  />
}
import React from 'react'
import { FormControlLabel, FormControlLabelProps, Switch } from '@mui/material'

type Props = {
  label?: string
  value: boolean
  onChange: (id: string) => void
  error?: string | undefined | any
  disabled?: boolean
  labelPlacement?: FormControlLabelProps['labelPlacement']
}
const AppSwitch = (props: Props) => {
  const { label, error, value, onChange, ...rest } = props

  return (
    <FormControlLabel
      sx={{ minHeight: 40 }}
      label={label}
      {...rest}
      control={
        <Switch
          size="small"
          checked={value}
          onChange={() => onChange(value ? '0' : '1')}
        />
      }
    />
  )
}

AppSwitch.displayName = 'AppSwitch'

export { AppSwitch }

import { FormControlLabel, Switch, SwitchProps } from '@mui/material'
import React from 'react'

type Props = SwitchProps & {
  label?: string
  error?: string | undefined | any
  value: boolean
  onChange: (id: number) => void
  disabled?: boolean
}

export const AppSwitch = (props: Props) => {

  return (
    <FormControlLabel
      sx={{
        minHeight: 40
      }}
      control={
        <Switch
          size="small"
          checked={props.value}
          onChange={() => props.onChange(props.value ? 0 : 1)}
        />
      }
      label={props.label}
    />
  )
}

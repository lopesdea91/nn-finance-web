import React from 'react'
import { Select, SelectProps, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material'

type Options = { id: number | string, description: string }

type Props = SelectProps & {
  label?: string
  text?: string
  error?: string | undefined | any
  optionEmpty?: boolean
  options: Options[]
}
const AppSelect = React.forwardRef((props: Props, ref) => {
  const { label, text, error, options, optionEmpty, ...rest } = props
  return (
    <FormControl fullWidth error={!!error}>
      {label &&
        <InputLabel id={label} size='small'>{label}</InputLabel>
      }

      <Select
        inputProps={{
          'data-testid': 'app-select'
        }}
        labelId={label || "simple-select-label"}
        label={label}
        error={!!error}
        size='small'
        ref={ref}
        {...rest}
      >
        {optionEmpty && <MenuItem value="">Selecione</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option.description} value={option.id || ''}>{option.description}</MenuItem>
        ))}
      </Select>

      {error &&
        <FormHelperText>{error}</FormHelperText>
      }
    </FormControl >
  )
})

AppSelect.displayName = 'AppSelect'

export { AppSelect }
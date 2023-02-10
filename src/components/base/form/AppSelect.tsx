import { Select, SelectProps, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material'

type Options = { id: number | string, description: string }

type Props = SelectProps & {
  label?: string
  text?: string
  error?: string | undefined | any
  optionEmpty?: boolean
  options: Options[]
}

export const AppSelect = ({ children, label, text, error, options, optionEmpty, ...rest }: Props) => {
  return (
    <FormControl fullWidth error={!!error}>
      {label &&
        <InputLabel id={label} size='small'>{label}</InputLabel>
      }

      <Select
        labelId={label || "simple-select-label"}
        label={label}
        error={!!error}
        size='small'
        {...rest}
      >
        {optionEmpty && <MenuItem value="">Selecione</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option.description} value={option.id || ''}>{option.description}</MenuItem>
        ))}
      </Select>

      {!error &&
        <FormHelperText>{error}</FormHelperText>
      }
    </FormControl >
  )
}
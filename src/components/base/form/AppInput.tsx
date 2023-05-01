import { FormControl, TextField, TextFieldProps } from '@mui/material'

type Props = {
  labelProps: {
    label?: string
  }
  inputProps: {
    error?: string
    type?: HTMLInputElement['type']
    value?: HTMLInputElement['value']
    disabled?: HTMLInputElement['disabled']
    onChange?: TextFieldProps['onChange']
    step?: HTMLInputElement['step']
  }
  multiline?: TextFieldProps['multiline']
  rows?: TextFieldProps['rows']
}
const AppInput = (props: Props) => {
  const { labelProps, inputProps, ...restProps } = props
  const { error, ...restInput } = inputProps

  return (
    <FormControl fullWidth error={!!error} sx={{ py: 0.15 }}>
      <TextField
        inputProps={{
          'data-testid': 'app-input',
        }}
        className="shadow-sm"
        type="text"
        label={labelProps.label}
        fullWidth
        error={!!error}
        helperText={error}
        size='small'
        {...restInput}
        {...restProps}
      />
    </FormControl>
  )
}

AppInput.displayName = 'AppInput'

export { AppInput }


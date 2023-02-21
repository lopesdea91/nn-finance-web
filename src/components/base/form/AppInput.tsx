import { FormControl, TextField, TextFieldProps } from '@mui/material'

type Props = TextFieldProps & {
  label?: string
  text?: string
  error?: string | undefined
  value: string | number | undefined
}

export const AppInput = ({ label, text, error, ...rest }: Props) => {

  return (
    <FormControl fullWidth error={!!error} sx={{ pt: 0.25 }}>
      <TextField
        className="shadow-sm"
        type="text"
        label={label}
        fullWidth
        error={!!error}
        helperText={error}
        size='small'
        {...rest}
      />

    </FormControl>
  )
};

export default AppInput 
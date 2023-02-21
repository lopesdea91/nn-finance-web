import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, TextFieldProps } from '@mui/material'

type Options = { id: number | string, description: string }

type Props = {
  label?: string
  error?: string | undefined
  value: string | number | undefined
  options: Options[]
  onChange: (id: number | string) => void
  disabled?: boolean
}

export const AppRadio = (props: Props) => {
  return (
    <FormControl fullWidth error={!!props.error} sx={{ pt: 0.25 }}>
      <FormLabel id={props.label}>{props.label}</FormLabel>
      <RadioGroup
        row
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 16,
          },
        }}
        aria-labelledby={props.label}
        value={props.value}

      >
        {props.options.map((option) => (
          <FormControlLabel
            key={option.description}
            label={option.description}
            value={option.id}
            control={
              <Radio disabled={!!props.disabled} onChange={({ target }) => props.onChange(target.value)} />
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
};

export default AppRadio 
import React from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

type Options = { id: number | string, description: string }

type Props = {
  label?: string
  error?: string | undefined
  value: string | number | undefined
  options: Options[]
  onChange: (id: number | string) => void
  disabled?: boolean
}
const AppRadio = React.forwardRef((props: Props, ref) => {
  return (
    <FormControl fullWidth error={!!props.error} sx={{ pt: 0.25 }}>
      {props.label && <FormLabel id={props.label}>{props.label}</FormLabel>}
      <RadioGroup
        row
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 16,
          },
          gap: 1
        }}
        aria-labelledby={props.label || ''}
        value={props.value}
        ref={ref}
      >
        {props.options.map((option) => (
          <FormControlLabel
            key={option.description}
            label={option.description}
            value={option.id}
            control={
              <Radio
                disabled={!!props.disabled}
                onChange={({ target }) => props.onChange(target.value)}
              />
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
});

AppRadio.displayName = 'AppRadio'

export { AppRadio }

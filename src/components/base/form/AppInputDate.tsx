import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from '@mui/material';

type Props = {
  label?: string
  text?: string
  error?: string | undefined
  value: string | number | undefined
  onChange: (args: string) => void
  disabled?: boolean
}

export const AppInputDate = (props: Props) => {
  const [value, setValue] = useState<Dayjs | null>(
    props.value ? dayjs(`${props.value}T00:00:00`) : dayjs()
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    props.onChange(newValue ? newValue.format('YYYY-MM-DD') : '')
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label={props.label}
        inputFormat="MM/DD/YYYY"
        value={value}
        disabled={props.disabled}
        renderInput={(params) => <TextField size='small' {...params} />}
        onChange={handleChange}
      />
    </LocalizationProvider>
  )
}

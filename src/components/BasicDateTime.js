import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function BasicDateTimePicker() {
  const [value, setValue] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        ampm={false}
        renderInput={(props) => <TextField name="datetime" {...props} fullWidth />}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}

      />
    </LocalizationProvider>
  );
}
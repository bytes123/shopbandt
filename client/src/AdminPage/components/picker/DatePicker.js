import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker as DatePickerWrapper } from "@mui/lab";

function DatePicker({ selectedDate, onSelectedDate }) {
  let minDate = new Date("2022/06/01");
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack>
        <DatePickerWrapper
          label="Chọn ngày"
          renderInput={(params) => <TextField {...params} />}
          value={selectedDate}
          onChange={onSelectedDate}
          inputFormat="dd/MM/yyyy"
          minDate={minDate}
          maxDate={Date.now()}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default DatePicker;

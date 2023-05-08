import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Calendar() {
  const [startDay, setStartDay] = useState(dayjs());
  const [endDay, setEndDay] = useState(dayjs().add(1, 'day'));
  const [totalDate, setTotalDate] =useState(1);

  const startDayHandle = (newValue) => {
    setStartDay(newValue);
    setTotalDate(endDay.diff(newValue, 'day') + 1);
  }

  const endDayHanlde = (newValue) => {
    setEndDay(newValue);
    setTotalDate(newValue.diff(startDay, 'Day') + 1)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="start"
          value={startDay}
          onChange={startDayHandle}
          minDate={startDay}
        />
        <DatePicker
          label="end"
          value={endDay}
          onChange={endDayHanlde}
          minDate={startDay}
          maxDate={dayjs().add(1,'month')}
        />
      </DemoContainer>
         <div>Total days: {totalDate}</div>
         {[...Array(totalDate)].map((_, i) => {
        const scheduleDay = startDay.add(i, 'day');
        return (
          <div key={scheduleDay.toString()}>
            Schedule for {scheduleDay.format('YYYY-MM-DD')}
          </div>
        );
      })}

    </LocalizationProvider>
  );
}

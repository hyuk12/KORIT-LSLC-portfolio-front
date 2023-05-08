import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import React from 'react';

export default function Calendar(props) {
  const { startDay, endDay, totalDate, onStartDayChange, onEndDayChange } = props;

  const resetDay = () => {
    onStartDayChange(startDay);
    onEndDayChange(endDay);
  }

  const startDayHandle = (newValue) => {
    onStartDayChange(newValue);
  }

  const endDayHanlde = (newValue) => {
    onEndDayChange(newValue);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="start"
          value={startDay}
          onMonthChange={false}
          onChange={startDayHandle}
          minDate={dayjs()}
          maxDate={dayjs().add(3,'month')}
        />
        <DatePicker
          label="end"
          value={endDay}
          onMonthChange={false}
          onChange={endDayHanlde}
          minDate={startDay}
          maxDate={startDay.add(1,'month')}
        />
      </DemoContainer>
      <div>Total days: {totalDate}</div>
      {Array.from({ length: totalDate }, (_, i) => {
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


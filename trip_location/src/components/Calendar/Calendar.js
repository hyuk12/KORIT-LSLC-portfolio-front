/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import SubButton from '../Button/SubButton';
import VerticalTabs from '../Tab/Tab';

const calendarContainer = css`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px; 
`;

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
      <div>Total days: {totalDate}</div>
      <div css={calendarContainer}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label="start"
            value={startDay}
            onMonthChange={false}
            onChange={startDayHandle}
            minDate={dayjs()}
            maxDate={dayjs().add(3, 'month')}
            />
          <DatePicker
            label="end"
            value={endDay}
            onMonthChange={false}
            onChange={endDayHanlde}
            minDate={startDay}
            maxDate={startDay.add(1, 'month')}
            />
        </DemoContainer>
        <SubButton/>
        <VerticalTabs scheduleDays={Array.from({ length: totalDate }, (_, i) => startDay.add(i, 'day'))} />
      </div>
    </LocalizationProvider>
  );
  
}
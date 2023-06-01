/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from "axios";
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useMutation } from "react-query";

const calendarContainer = css`
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const Total=css`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

export default function CoustomCalendar(props) {
  const { startDay, endDay, totalDate, onStartDayChange, onEndDayChange, userInfo } = props;
  const [scheduleData, setScheduleData] = useState([]);

  const startDayHandle = (newValue) => {
    onStartDayChange(newValue);
  }

  const endDayHandle = (newValue) => {
    onEndDayChange(newValue);
  }


  useEffect(() => {
    const totalDate = endDay.diff(startDay, 'day') + 1;

    const generatedData = Array.from({ length: totalDate }, (_, i) => {
      const date = startDay.clone().add(i, 'day').format('YYYY-MM-DD');
      const id = i+1;
      return {
        id: id,
        date: date,
        userId: userInfo.userId
      };
    });

    setScheduleData(generatedData);
  }, [startDay, endDay]);

  localStorage.setItem("scheduleData", JSON.stringify(scheduleData));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div id='calendar'>
        <div css={Total}>Total days: {totalDate}</div>
        <div css={calendarContainer}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="start"
              value={startDay}
              onChange={startDayHandle}
              minDate={dayjs()}
              maxDate={dayjs().add(3, 'month')}
              />
            <DatePicker
              label="end"
              value={endDay}
              onChange={endDayHandle}
              minDate={startDay}
              maxDate={startDay.add(1, 'month')}
              />
          </DemoContainer>
        </div>
      </div>
    </LocalizationProvider>
  );
  
}
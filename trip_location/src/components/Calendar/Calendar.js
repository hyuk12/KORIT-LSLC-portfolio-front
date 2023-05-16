/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import VerticalTabs from '../Tab/Tab';
import { constSelector } from 'recoil';

const calendarContainer = css`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px; 
`;
const Total=css`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

export default function Calendar(props) {
  const { startDay, endDay, totalDate, onStartDayChange, onEndDayChange, markerData } = props;
  const [scheduleData, setScheduleData] = useState([]);
  const resetDay = () => {
    onStartDayChange(startDay);
    onEndDayChange(endDay);
  }

  const startDayHandle = (newValue) => {
    onStartDayChange(newValue);
  }

  const endDayHandle = (newValue) => {
    onEndDayChange(newValue);
  }
  // console.log(paths)

  useEffect(() => {
    
    const totalDate = endDay.diff(startDay, 'day') + 1;
  
    const generatedData = Array.from({ length: totalDate }, (_, i) => {
      const date = startDay.clone().add(i, 'day').format('YYYY-MM-DD');
      console.log(markerData);
      const locationByDate = markerData.map((marker) => {
      const location = marker.location.find((loc) => loc.date === date);
        if (!!location) {
          return {
            addr: location.addr,
            lat: location.lat,
            lng: location.lng,
          };
        } else {
          return {
            addr: '',
            lat: null,
            lng: null,
          };
        }
      });
    
      return {
        id: i + 1,
        date: date,
        location: locationByDate,
      };
    });
    // console.log(generatedData);
    setScheduleData(generatedData);
  }, [startDay, endDay, markerData]);
  console.log(scheduleData);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div id='calendar'>
        <div css={Total}>Total days: {totalDate}</div>
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
              onChange={endDayHandle}
              minDate={startDay}
              maxDate={startDay.add(1, 'month')}
              />
          </DemoContainer>
          <VerticalTabs 
            // scheduleDays={Array.from({ length: totalDate }, (_, i) => startDay.add(i, 'day'))}
            // coordinates={paths}
            scheduleData={scheduleData}
            />
        </div>
      </div>
    </LocalizationProvider>
  );
  
}
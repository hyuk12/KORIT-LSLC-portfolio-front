/** @jsxImportSource @emotion/react */
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import axios from "axios";
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useMutation} from "react-query";
import VerticalTabs from '../Tab/Tab';
import {calendarContainer, Total} from "./styles/CalendarStyles";


export default function Calendar(props) {
  const { startDay, endDay, totalDate, onStartDayChange, onEndDayChange, markerData, userInfo } = props;
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

      const markerItem = markerData.find((item) => item.id === id);
      const location = markerItem ? markerItem.location : [{ addr: '', lat: null, lng: null }];

      return {
        id: id,
        date: date,
        location: location,
        userId: userInfo.userId
      };
    });

    setScheduleData(generatedData);
  }, [startDay, endDay, markerData]);

  useEffect(() => {
    const updatedData = scheduleData.map((schedule) => {
      const markerItem = markerData.find((item) => item.id === schedule.id);
      const location = markerItem ? markerItem.location : [{ addr: '', lat: null, lng: null }];

      if (markerItem) {
        return {
          ...schedule,
          location: location,
        };
      }

      return schedule;
    });

    setScheduleData(updatedData);
  }, [markerData]);
  localStorage.setItem("scheduleData", JSON.stringify(scheduleData));

  const requestData = useMutation(async (updatedScheduleData) => {

    const option = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem("accessToken")}`
      }
    }
    try {
      const response = await axios.post("http://localhost:8080/api/v1/travel/plan/save", updatedScheduleData, option)

      window.location.replace(`/user/${userInfo.userId}`)
      return response;
    }catch (error) {
      return error;
    }

  }, {
    onSuccess: (response) => {
      localStorage.removeItem("scheduleData");
    }
  })

  const submitPlanHandler = () => {
    const partyData = JSON.parse(localStorage.getItem("partyData"));
    const scheduleData = JSON.parse(localStorage.getItem("scheduleData"));
  
    const updatedScheduleData = scheduleData.map((schedule) => {
      return {
        ...schedule,
        partyData: partyData.partyData,
      };
    });
    requestData.mutate(updatedScheduleData);
    localStorage.removeItem("partyData");
  };
  
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
          <VerticalTabs scheduleData={scheduleData}/>
        </div>
          <button onClick={submitPlanHandler}>일정 확정하기 </button>
      </div>
    </LocalizationProvider>
  );
  
}
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import VerticalTabs from '../Tab/Tab';
import {useMutation, useQuery} from "react-query";
import axios from "axios";

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

export default function Calendar(props) {
  const { startDay, endDay, totalDate, onStartDayChange, onEndDayChange, markerData } = props;
  const [scheduleData, setScheduleData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    userId: '',
    email:'',
    profileImg:''
  })
  const principal = useQuery(["principal"], async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: {accessToken}});
    return response;
  }, {

    onSuccess: (response) => {
      setUserInfo({
        userId: response.data.userId,
        email: response.data.email,
        profileImg: response.data.postsImgUrl
      })
    }
  });

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



  const requestData = useMutation(async (scheduleData) => {

    const option = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem("accessToken")}`
      }
    }
    try {
      const response = await axios.post("http://localhost:8080/api/v1/travel/plan", scheduleData, option)

      window.location.replace(`/user/${userInfo.userId}`)
      return response;
    }catch (error) {

    }

  }, {
    onSuccess: (response) => {
      localStorage.removeItem("scheduleData");
    }
  })

  const submitPlanHandler = () => {
    requestData.mutate(localStorage.getItem("scheduleData"));
  }

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
          <button onClick={submitPlanHandler}>일정 확정하기 </button>
        </div>
      </div>
    </LocalizationProvider>
  );
  
}
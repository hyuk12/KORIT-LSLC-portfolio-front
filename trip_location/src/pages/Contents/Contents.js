/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import Map from '../../components/contents/Map/Map';


const container = css`
  margin-top: 64px;
`;

const sidebar=css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: white;
  box-shadow: 0 4px 8px 0;
  height: 100%;
`;

const calendar = css`
  height: 100%;
`;

const main = css`
  position: relative;
`;

const rightsidebar = css`
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 0 4px 8px 0;
  background-color: white;
  height: 100%;
  z-index: 3;
`;


const Title =css`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const resetButton= css`
  
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

`;

const group = css`

  text-align: center;
`;
const Contents = ({ destinationTitle }) => {
  const [serchParams, setSearchParams] = useSearchParams();
  const [startDay, setStartDay] = useState(dayjs());
  const [endDay, setEndDay] = useState(dayjs().add(1, 'day'));
  const [totalDate, setTotalDate] =useState(1);
  const [paths, setPaths] = useState([]);

  const startDayHandle = (newValue) => {
    setStartDay(newValue);
    setTotalDate(endDay.diff(newValue, 'day') + 1);
  }

  const endDayHandle = (newValue) => {
    setEndDay(newValue);
    setTotalDate(newValue.diff(startDay, 'Day') + 1)
  }

  const resetDay = () => {
    setStartDay(dayjs());
    setEndDay(dayjs().add(1,'day'));
    setTotalDate(1);
  }
  
  const [dataStructor, setDataStructor] = useState({
    date: '',
    locationData: [],
  });
  const [newDataStructor, setNewDataStructor] = useState({
    date: '',
    locationData: [],
  });

  useEffect(() => {
    const selectedSchedule = localStorage.getItem('selectedSchedule');
    const markers = localStorage.getItem('markers');
  
    if (selectedSchedule && markers) {
      let parsedSchedule;
      let parsedMarkers;
  
      try {
        parsedSchedule = JSON.parse(selectedSchedule);
        parsedMarkers = JSON.parse(markers);
      } catch (error) {
        console.error('Error parsing JSON data:', error);
        // Handle the parsing error here, such as setting default values
        return;
      }
  
      setNewDataStructor({
        date: parsedSchedule,
        locationData: parsedMarkers,
      });
      setDataStructor([newDataStructor]);
      localStorage.setItem('dataStructor', JSON.stringify(dataStructor));
    }
  }, [dataStructor,newDataStructor]);
  

  return (
    
    <div css={container}>
      <div css={main}>
        <Map destinationTitle={serchParams.get("destinationTitle")} paths={paths} setPaths={setPaths}/>
        <div css={sidebar}>
            <div css={Title}>{serchParams.get("destinationTitle")}</div>
            <button css={resetButton} onClick={resetDay}>Reset Start Day</button>
            <Calendar 
              css={calendar}
              startDay={startDay}
              endDay={endDay}
              totalDate={totalDate}
              onStartDayChange={startDayHandle}
              onEndDayChange={endDayHandle}
              paths={paths}
            />

            <div css={group}>
              여긴 친구 추가 
            </div>
        </div>
        <div css={rightsidebar}>여긴 추천장소가 들어갈 자리</div>
      </div>
    </div>

  );
};

export default Contents;
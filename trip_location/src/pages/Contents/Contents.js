/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import Map from '../../components/contents/Map/Map';
import AddUserModal from '../../components/contents/Modal/AddUserModal';


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

const submitPlanButton =css`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Contents = ({ destinationTitle }) => {
  const [serchParams, setSearchParams] = useSearchParams();
  const [startDay, setStartDay] = useState(dayjs());
  const [endDay, setEndDay] = useState(dayjs().add(1, 'day'));
  const [totalDate, setTotalDate] =useState(1);
  const [paths, setPaths] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

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
  
  const submitPlanHandle = (e)=>{
    

    localStorage.removeItem('scheduleData');
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }
  return (
    <>
      <div css={container}>
        <div css={main}>
          <Map destinationTitle={serchParams.get("destinationTitle")} paths={paths} setPaths={setPaths}/>
          <div css={sidebar}>
              <div css={Title}>{serchParams.get("destinationTitle")}</div>
              <div>친구아바타</div>
              <button css={resetButton} onClick={resetDay}>Reset Start Day</button>
              <Calendar 
                css={calendar}
                startDay={startDay}
                endDay={endDay}
                totalDate={totalDate}
                onStartDayChange={startDayHandle}
                onEndDayChange={endDayHandle}
                markerData={paths}
              />
          </div>
          <div css={rightsidebar}>여긴 추천장소가 들어갈 자리</div>
        </div>
      </div>
      <AddUserModal
      isOpen={isModalOpen}
      onClose={closeModal}
      destination={{ image: 'image-url', title: 'Destination Title', englishing: 'Englishing' }}
    />
    </>

  );
};

export default Contents;


/*
[
  {
    id:1,
    date:'일자',
    location:
    [
      {
        addr
        lat
        lng

      }

    ]
  
  }
]
*/
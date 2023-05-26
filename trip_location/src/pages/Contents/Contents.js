/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import Map from '../../components/contents/Map/Map';
import AddUserModal from '../../components/contents/Modal/AddUserModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authenticationState } from '../../store/atoms/AuthAtoms';
import { useQuery } from 'react-query';
import axios from 'axios';


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
  width: 35%;
  height: 100%;
`;

const calendar = css`
  max-width: 40%;
  height: 100%;
`;

const main = css`
  position: relative;
`;


const Title =css`
  margin-top: 30px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const avatarBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  height: 15vh;
`;

const resetButton= css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

`;




const Contents = () => {
  const [serchParams, setSearchParams] = useSearchParams();
  const [startDay, setStartDay] = useState(dayjs());
  const [endDay, setEndDay] = useState(dayjs().add(1, 'day'));
  const [totalDate, setTotalDate] =useState(1);
  const [paths, setPaths] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const authState = useRecoilValue(authenticationState);

  const principal = useQuery(["principal"], async () => {
    const accessToken = localStorage.getItem("accessToken");
    if(!accessToken) {
      return null;
    }
    const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: {accessToken}});
    return response;
  }, {
    enabled: authState.isAuthenticated,
  });

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
  
  // const submitPlanHandle = (e)=>{
  //   localStorage.removeItem('scheduleData');
  // }
  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <div css={container}>
        <div css={main}>
          <Map destinationTitle={serchParams.get("destinationTitle")} paths={paths} setPaths={setPaths}/>
          <div css={sidebar}>
              <div css={Title}>{serchParams.get("destinationTitle")}</div>
              <div css={avatarBox}>
                친구아바타
                <button onClick={openModal}>Open Modal</button>
              </div>
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
        </div>
      </div>
      <AddUserModal
      isOpen={isModalOpen}
      onClose={closeModal}
      destination={{ image: 'image-url', title: serchParams.get("destinationTitle"), englishing: 'Englishing' }}
      />
    </>

  );
};

export default Contents;
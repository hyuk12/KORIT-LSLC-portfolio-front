/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import Map from '../../components/contents/Map/Map';
import AddUserModal from '../../components/contents/Modal/AddUserModal';
import { useRecoilValue } from 'recoil';
import { authenticationState } from '../../store/atoms/AuthAtoms';
import { useQuery } from 'react-query';
import axios from 'axios';


const container = css`
  margin-top: 64px;
  width: 1920px;
  height: auto;
`;

const sidebar=css`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  background-color: white;
  box-shadow: 0 4px 8px 0;
  width: 550px;
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

const addFriendButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  max-width: 80px;
  max-height: 80px;
`;


const Contents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [refresh, setRefresh] = useState(true);
  const [startDay, setStartDay] = useState(dayjs());
  const [endDay, setEndDay] = useState(dayjs().add(1, 'day'));
  const [totalDate, setTotalDate] =useState(2);
  const [paths, setPaths] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userInfo, setUserInfo] = useState({
    userId: '',
    email:'',
    profileImg:''
  })
  const principal = useQuery(["principal"], async () => {
    // const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get('http://localhost:8080/api/v1/user/principal', { headers: { Authorization: localStorage.getItem("accessToken") }});
    return response;
  }, {
    enabled: refresh,
    onSuccess: (response) => {
      setUserInfo({
        userId: response.data.userId,
        email: response.data.email,
        name: response.data.name,
        phone: response.data.phone,
        profileImg: response.data.postsImgUrl
      });
      setRefresh(false);
    }
  });

  const startDayHandle = (newValue) => {
    setStartDay(newValue);
    setTotalDate(endDay.diff(newValue, 'day') + 1);
  }

  const endDayHandle = (newValue) => {
    setEndDay(newValue);
    setTotalDate(newValue.diff(startDay, 'day') + 1)
  }

 const resetDay = () => {
  setStartDay(dayjs());
  setEndDay(dayjs().add(1, 'day'));
  const newTotalDate = dayjs().add(1, 'day').diff(dayjs(), 'day') + 1;
  setTotalDate(newTotalDate);
};

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
          <Map destinationTitle={searchParams.get("destinationTitle")} paths={paths} setPaths={setPaths}/>
          <div css={sidebar}>
              <div css={Title}>{searchParams.get("destinationTitle")}</div>
              <div css={avatarBox}>
                <button css={addFriendButton} onClick={openModal}>친구 추가</button>
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
                userInfo={userInfo}
              />
          </div>
        </div>
      </div>
      <AddUserModal
      isOpen={isModalOpen}
      onClose={closeModal}
      destination={{ image: 'image-url', title: searchParams.get("destinationTitle"), englishing: 'Englishing' }}
      userInfo={userInfo}
      />
    </>

  );
};

export default Contents;
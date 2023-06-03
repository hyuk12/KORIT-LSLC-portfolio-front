/** @jsxImportSource @emotion/react */
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import Map from '../../components/contents/Map/Map';
import AddUserModal from '../../components/contents/Modal/AddUserModal';
import {useQuery} from 'react-query';
import axios from 'axios';
import {addFriendButton,Title, avatarBox, calendar, container, main, resetButton, sidebar} from "./styles/ContentStyles";


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
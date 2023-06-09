/** @jsxImportSource @emotion/react */
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import Map from '../../components/contents/Map/Map';
import AddUserModal from '../../components/contents/Modal/AddUserModal';
import {useQuery} from 'react-query';
import axios from 'axios';
import {addFriendButton,Title, avatarBox, imgIcon,calendar, container, main, resetButton, sidebar, addFriendIcon} from "./styles/ContentStyles";
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';


const Contents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [refresh, setRefresh] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [startDay, setStartDay] = useState(dayjs());
  const [endDay, setEndDay] = useState(dayjs().add(1, 'day'));
  const [totalDate, setTotalDate] =useState(2);
  const [paths, setPaths] = useState([]);
  const [partyData, setPartyData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    userId: '',
    email:'',
    name:'',
    phone:'',
    profileImg:''
  })

  const principal = useQuery(["principal"], async () => {
    // const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get('http://43.202.21.26/api/v1/user/principal', { headers: { Authorization: localStorage.getItem("accessToken") }});
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
          <Map destinationTitle={searchParams.get("destinationTitle")} paths={paths} setPaths={setPaths} 
          isOpen={isModalOpen}
          onClose={closeModal}/>
          <div css={sidebar}>
              <div css={Title}>{searchParams.get("destinationTitle")}</div>
              <div css={avatarBox}>
                {Array.isArray(partyData) ? (
                  partyData.map((user) => (
                    <img css={imgIcon} key={user.userId} src={user.profileImg} alt={user.profileImg} />
                  ))
                  ) : (
                    <img css={imgIcon} src={userInfo.profileImg} alt={userInfo.profileImg} />
                )}
                <button css={addFriendButton} onClick={openModal}>
                  <GroupAddRoundedIcon css={addFriendIcon}/>
                </button>
              </div>
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
      updatePartyData={(updatedPartyData) => setPartyData(updatedPartyData)}
      />
    </>

  );
};

export default Contents;
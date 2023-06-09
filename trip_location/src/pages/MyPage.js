/** @jsxImportSource @emotion/react */
import axios from "axios";
import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {useNavigate} from "react-router-dom";
import MyReviewList from '../components/ReviewList/MyReviewList';
import TravelList from '../components/TravelList/TravelList';
import {
  container,
  imgContainer,
  imgStyle,
  main,
  mainContents,
  ModifyButton,
  modifyButtons,
  myPlanAndReview,
  planAndReviewContainer
} from "./styles/HomeAndMyPageStyles";

const MyPage = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const [checkType,setCheckType] = useState(true);
  const [ reviewDataList, setReviewDataList ] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [allTravelList, setAllTravelList] = useState([]);
  const [travelCount, setTravelCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const [regionInfo, setRegionInfo] = useState([
    {
      regionId: '',
      regionName:'',
      regionImgUrl:'',
    }
  ])

  const [myTravelList, setMyTravelList] = useState([
    {
      travelId: '',
      scheduleDate: [],
      travelName:'',
    },
  ]);

  const [userInfo, setUserInfo] = useState({
    email: '',
    userId: '',
    profileImg: ''
  });

  const principal = useQuery(["principal"], async () => {
    const response = await axios.get('http://43.202.21.26/api/v1/user/principal', { headers: { Authorization: localStorage.getItem("accessToken") } });
    return response;
  }, {
    enabled: refresh,
    onSuccess : (response) => {
      setUserInfo({
        email: response.data.email,
        userId: response.data.userId,
        name: response.data.name,
        profileImg: response.data.postsImgUrl
      })
      setRefresh(false);
    }
  });

  const travelList = useQuery(['travelList'], async () => {

    const option = {
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`
      }
    }
    try {
      const response = await axios.get('http://43.202.21.26/api/v1/travel/plan/list',option)
      return response;
    }catch (error) {
      alert('여행 일정이 없습니다.')
      return error;
    }
  }, {
    onSuccess: (response) => {
      setAllTravelList([...response.data]);
      setTravelCount(response.data.length);
    }
  });

  const review = useQuery(['review'], async () => {
    try {
      const option = {
        headers : {
          'Authorization' : `${localStorage.getItem('accessToken')}`
        }
      }
      const response = await axios.get(`http://43.202.21.26/api/v1/review/mylist`, option)
      return response;
    } catch (error) {
      return error;
    }
  }, {
    onSuccess : (response) => {
      if(response.status === 200){
        setReviewDataList([...response.data.data]);
        setReviewCount(response.data.data.length);
      }

    }
  });

  useEffect(() => {
    setAllTravelList(allTravelList);

    const extractedMyTravelList = allTravelList.map((item) => {
      const firstLocation = item.schedules[0].locations[0];
      const travelName = firstLocation && firstLocation.addr ? firstLocation.addr : getNextAddress(item.schedules);
      return {
        travelId: item.travelId,
        scheduleDate: item.schedules.map((schedule) => schedule.scheduleDate),
        travelName: travelName,
      };
    });
    setMyTravelList(extractedMyTravelList);

    const extractedSchedules = allTravelList.map((item) => item.schedules);
    setSchedules(extractedSchedules);

    const regionInfoList = allTravelList.map((item) => {
      const region = item.regions[0];
      return {
        regionId: region?.regionId,
        regionName: region?.regionName,
        regionImgUrl: region?.regionImgUrl
      };

    })
    setRegionInfo(regionInfoList);

  }, [setAllTravelList, allTravelList]);

  const getNextAddress = (schedules) => {
    for (let i = 1; i < schedules.length; i++) {
      const firstLocation = schedules[i].locations[0];
      if (firstLocation && firstLocation.addr) {
        return firstLocation.addr;
      }
    }
    return '';
  };

  const myPlanChangeHandler = (flag) => {
    setCheckType(flag);
  }

  return (
    <div css={container}>
      <main css={main}>
        <div css={imgContainer}>
          <img css={imgStyle} src={userInfo.profileImg} alt=""/>
        </div>
        <div>{userInfo.email || '이메일 로딩 중...'}</div>
        <div css={modifyButtons}>
          <ModifyButton onClick={() => navigate(`/user/modify/${principal?.data?.data?.userId || ''}`)}>회원정보 수정</ModifyButton>
          <ModifyButton onClick={() => navigate(`/user/modify/password/${principal?.data?.data?.userId || ''}`)}>비밀번호 변경</ModifyButton>
        </div>
        <div css={mainContents}>
          <div css={myPlanAndReview} onClick={() => myPlanChangeHandler(true)}>
            <span>나의 일정</span>
            <span>{travelCount}</span>
          </div>
          <div css={myPlanAndReview} onClick={() => myPlanChangeHandler(false)}>
            <span>나의 리뷰</span>
            <span>{reviewCount}</span>
          </div>
        </div>
        <div css={planAndReviewContainer}>
          {checkType ?(<TravelList userInfo={userInfo} myTravelList={myTravelList} regionInfo={regionInfo} reviewDataList={reviewDataList} />):(<MyReviewList reviewDataList={reviewDataList} userInfo={userInfo}/>)}
        </div>
      </main>
    </div>
  );
};

export default MyPage;
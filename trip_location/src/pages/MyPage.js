/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MyReviewList from '../components/ReviewList/MyReviewList';
import TravelList from '../components/TravelList/TravelList';
import { authenticationState } from "../store/atoms/AuthAtoms";


const container = css`
  display: flex;
  margin-top: 64px;
  width: 100%;
  height: 100vh;
`;

const main = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const imgContainer = css`
  margin-bottom: 20px;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: rgba(0,0,0,0.8);
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const imgStyle = css`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const modifyButtons = css`

`;

const ModifyButton = styled(Button)`
  margin: 20px 10px;
  border-radius: 0;
  width: 110px;
  background-color: #0BD0AF;
  color: #FFFFFF;
  font-weight: 600;

  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD;
  }
`;

const mainContents = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  
`;

const myPlanAndReview = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  border: 1px solid #dbdbdb;
  width: 40%;
  height: 100px;
  cursor: pointer;
`;

const planAndReviewContainer =css`
  display: flex;
  align-content:flex-start; 
  flex-direction:column; 
  flex-wrap:wrap; 
  overflow:auto;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const authState = useRecoilValue(authenticationState);
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
  const [ reviewDataList, setReviewDataList ] = useState([]);
  const [travelCount, setTravelCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [checkType,setCheckType] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: '',
    userId: '',
    profileImg: ''
  });

  const [schedules, setSchedules] = useState([]);
  const [allTravelList, setAllTravelList] = useState([]);

  const principal = useQuery(["principal"], async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get('http://localhost:8080/api/v1/auth/principal', { params: { accessToken } });
    return response;
  }, {
    enabled: authState.isAuthenticated,
    onSuccess : (response) => {
      setUserInfo({
        email: response.data.email,
        userId: response.data.userId,
        name: response.data.name,
        profileImg: response.data.postsImgUrl
      })

    }
  });

  const travelList = useQuery(['travelList'], async () => {
    const params = {
      userId: userInfo.userId !== '' ? parseInt(userInfo.userId) : 0
    }
    const option = {
      params,
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`
      }
    }
    try {
      const response = await axios.get('http://localhost:8080/api/v1/travel/plan/list',option)
      // console.log(response);
      return response;
    }catch (error) {
      alert('여행 일정이 없습니다.')
      return error;
    }
  }, {
    onSuccess: (response) => {
      setAllTravelList([...response.data]);
      setTravelCount(response.data.length);
    },
    enabled: userInfo.userId !== '',
  })



  const review = useQuery(['review'], async () => {
    try {
      const userId = userInfo.userId !== '' ? parseInt(userInfo.userId) : 0;
      const option = {
        headers : {
          'Authorization' : `${localStorage.getItem('accessToken')}`
        }
      }
      const response = await axios.get(`http://localhost:8080/api/v1/review/${userId}`, option)
      console.log(response.data.data)
      return response;
    } catch (error) {
      return error;
    }
  }, {
    onSuccess : (response) => {
      setReviewDataList([...response.data.data]);
      setReviewCount(response.data.data.length);
    },
    enabled: userInfo.userId !== '',
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
    console.log(allTravelList)

    const regionInfoList = allTravelList.map((item) => {
      const region = item.regions[0];
      return {
        regionId: region?.regionId,
        regionName: region?.regionName,
        regionImgUrl: region?.regionImgUrl
      };

    })
    setRegionInfo(regionInfoList);
    console.log(regionInfoList)

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
          {checkType ?(<TravelList userInfo={userInfo} myTravelList={myTravelList} regionInfo={regionInfo}  />):(<MyReviewList reviewDataList={reviewDataList} userInfo={userInfo}/>)}
        </div>
      </main>
    </div>
  );
};

export default MyPage;
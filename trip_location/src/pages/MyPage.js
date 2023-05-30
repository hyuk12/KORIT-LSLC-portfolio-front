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
  const [travelCount, setTravelCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [checkType,setCheckType] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: '',
    userId: '',
    profileImg: ''
  });

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
      setCheckType(false);
      setTimeout(() => {
      setCheckType(true);
      }, 100);
    }
  });

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
          {checkType ?(<TravelList setTravelCount={setTravelCount} userInfo={userInfo} />):(<MyReviewList setReviewCount={setReviewCount} userInfo={userInfo}/>)}
        </div>
      </main>
    </div>
  );
};

export default MyPage;
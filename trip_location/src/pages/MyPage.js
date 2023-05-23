/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from "@emotion/react";
import {Button} from "@mui/material";
import styled from "@emotion/styled";
import {useQuery} from "react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import TravelList from '../components/TravelList/TravelList';
import MyReviewList from '../components/ReviewList/MyReviewList';

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
  const [checkType,setCheckType] = useState("myplan");
  const [userInfo, setUserInfo] = useState({
    email: '',
    userId: '',
    profileImg: ''
  })

  const principal = useQuery(["principal"], async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get('http://localhost:8080/api/v1/auth/principal', { params: { accessToken } });
    return response;
  }, {
    onSuccess : (response) => {
      setUserInfo({
        email: response.data.email,
        userId: response.data.userId,
        profileImg: response.data.postsImgUrl
      })
    }
  });

  const myPlanChangeHandler = (type) => {
    setCheckType(type);
  }

  return (
    <div css={container}>
      <main css={main}>
        <div css={imgContainer}>
          <img css={imgStyle} src={userInfo.profileImg} alt=""/>
        </div>
        <div>{principal?.data?.data?.email || '이메일 로딩 중...'}</div>
        <div css={modifyButtons}>
          <ModifyButton onClick={() => navigate(`/user/modify/${principal?.data?.data?.userId || ''}`)}>수정하기</ModifyButton>
          <ModifyButton onClick={() => navigate(`/user/modify/password/${principal?.data?.data?.userId || ''}`)}>비밀번호 변경</ModifyButton>
        </div>
        <div css={mainContents}>
          <div css={myPlanAndReview} onClick={() => myPlanChangeHandler('myPlan')}>
            <span>나의 일정</span>
            <span>0</span>
          </div>
          <div css={myPlanAndReview} onClick={() => myPlanChangeHandler('myReview')}>
            <span>나의 리뷰</span>
            <span>0</span>
          </div>
        </div>
        <div css={planAndReviewContainer}>
          {checkType === 'myPlan'?(<TravelList/>):(<MyReviewList/>)}
        </div>
      </main>
    </div>
  );
};

export default MyPage;
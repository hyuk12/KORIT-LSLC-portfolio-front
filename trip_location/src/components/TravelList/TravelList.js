/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";

const cardContainer =css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    width: 300px;
    height: 300px;
    `;
const cardImgContainer =css`
    border: 1px solid #dbdbdb;
    overflow: hidden;
    width: 100%;
    height: 200px;
    
    `;
const cardMain =css`
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #dbdbdb;
    width: 100%;
    height: 100px;
    
    `;

const travelTitle =css`
    display: flex;
    align-items: center;
    border: 1px solid #dbdbdb;
    width: 50px;
`;
const travelText=css`
    display: flex;
    flex-direction: column;
`;

const TravelList = () => {
    const [userInfo, setUserInfo] = useState({
        userId:'',
        name:'',
    });
    const [regionInfo, setRegionInfo] = useState([
        {
            regionName:'',
        }
    ])
    const [myTravelList, setMyTravelList] = useState([
        {
            travelId: '',
            scheduleDate: ''
        }
    ]);

    const principal = useQuery(['principal'], async () => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: accessToken});
        return response;
    }, {
        onSuccess: (response) => {
            setUserInfo({
                userId: response.data.userId,
                name: response.data.name,
            });
        }
    })

    console.log(userInfo);

    const travelList = useQuery(['travelList'], async () => {
        const params = {
            userId: userInfo.userId,
        }
        const option = {
            params,
            headers: {
                Authorization: `${localStorage.getItem('accessToken')}`
            }
        }
        try {
            const response = await axios.get('http://localhost:8080/api/v1/travel/plan/list',option)
            console.log(response);
            return response;
        }catch (error) {
            alert('여행 일정이 없습니다.')
        }
    }, {
        onSuccess: (response) => {
           setRegionInfo({
            // regionName: response.data.locations
           })
        //    console.log(regionInfo);
        }
    })
    const regionImg = useQuery(['regionImg'], async()=>{
        const params = {
            travelName: TravelList.locations
        }
        const option = {
            headers:{
                Authorzation : `${localStorage.getItem('accessToken')}`
            }
        }
        const response = await axios.get('http://localhost:8080/api/v1/travel/plan/region', option);
        return response;
    })

    useEffect(()=>{
        setUserInfo(userInfo);
    },[userInfo])


  

  
    return (
        <div css={cardContainer}>
            <div css={cardImgContainer}>이미지
                {/* <img src={} alt={}> region에서 이미지 가져옴*/}
            </div>
            <div css={cardMain}>
                <div css={travelTitle}>
                    제주도
                </div>
                <div css={travelText}>
                    <div>{userInfo.name}</div>
                    <div>2</div>
                    <div>3</div>
                </div>
            </div>
        </div>
    );
};

export default TravelList;
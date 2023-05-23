/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, {useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";

const myTravelContainer = css`
    margin-top: 64px;
`;
const travelContainer =css`

`;

const TravelList = () => {
    const [userInfo, setUserInfo] = useState({userId: ''});
    // const [regionInfo, setRegionInfo] = useState([
    //     {
            
    //     }
    // ])
    // const [myTravelList, setMyTravelList] = useState([
    //     {
    //         travelId: '',
    //         scheduleDate: ''
    //     }
    // ]);

    // const principal = useQuery(['principal'], async () => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: accessToken});
    //     return response
    // }, {
    //     onSuccess: (response) => {
    //         setUserInfo({
    //             userId: response.data.userId
    //         })
    //     }
    // })

    // const travelList = useQuery(['travelList'], async () => {
    //     const params = {
    //         userId: userInfo.userId
    //     }
    //     const option = {
    //         headers: {
    //             Authorization: `${localStorage.getItem('accessToken')}`
    //         }
    //     }
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/v1/travel/plan/list')
    //     }catch (error) {
    //         alert('여행 일정이 없습니다.')
    //     }
    // }, {
    //     onSuccess: (response) => {

    //     }
    // })
    return (
        <div>
            tevelList
        </div>
    );
};

export default TravelList;
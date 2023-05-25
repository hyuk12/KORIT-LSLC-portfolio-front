import React, {useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {authenticationState} from "../../store/atoms/AuthAtoms";


const TravelList = () => {
    const authState = useRecoilValue(authenticationState);
    const [userInfo, setUserInfo] = useState({userId: ''});
    const [regionInfo, setRegionInfo] = useState([
        {

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
        return response
    }, {
        enabled: authState.isAuthenticated,
        onSuccess: (response) => {
            setUserInfo({
                userId: response.data.userId
            })
        }
    })

    const travelList = useQuery(['travelList'], async () => {
        const params = {
            userId: userInfo.userId
        }
        const option = {
            headers: {
                Authorization: `${localStorage.getItem('accessToken')}`
            }
        }
        try {
            const response = await axios.get('http://localhost:8080/api/v1/travel/plan/list')
        }catch (error) {
            alert('여행 일정이 없습니다.')
        }
    }, {
        onSuccess: (response) => {

        }
    })
    return (
        <div>

        </div>
    );
};

export default TravelList;
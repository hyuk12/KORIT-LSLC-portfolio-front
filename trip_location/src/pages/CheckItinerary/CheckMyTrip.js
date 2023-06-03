/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {
    buttonContainer,
    buttonStyle, footerButtonContainer, footerStyle,
    mainStyle,
    mapContainer, tripLocationItem,
    tripLocationList,
    viewContainer, indexStyle, addressStyle, locationContainer, dayButtonStyle
} from "./styles/CheckPageStyles";

const { kakao } = window;

const CheckMyTrip = () => {
    const [travelPlan, setTravelPlan] = useState({schedules: []});
    const [userInfo , setUserInfo] = useState({userId: ''})
    const [isEditable, setIsEditable] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDate, setSelectedDate] = useState(0);
    const [ schedules, setSchedules ] = useState([]);

    const myTravelInfo = useQuery(['info'], async () => {
        try {
                const response = await axios.get('http://localhost:8080/api/v1/travel/plan/info', {
                    params: {
                        travelId: searchParams.get('id'),
                    },
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`
                    }
                })
                console.log(response.data);
                return response;
        }catch (error) {

        }
    }, {
        onSuccess: (response) => {

            setSchedules([ ...response.data.schedules ]);
        }
    })
    let map = null;


    useEffect(() => {

        if(!!schedules) {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(37.5522, 126.570667),
                level: 8
            }
            const map = new kakao.maps.Map(container, options);

            // If the myTravelInfo query is successful
            if (!!schedules && schedules.length > 0 && schedules[selectedDate].locations.length > 0) {
                const { lat, lng } = schedules[selectedDate].locations[0];

                // Create a new LatLng object using the lat and lng
                const position = new kakao.maps.LatLng(lat, lng);

                // Update the center of the map
                map.setCenter(position);


                // 스케쥴의 해당 선택 일차의 경로를 반복을 돌려 마커를 찍는다.
                schedules[selectedDate].locations.forEach((location, index) => {
                    const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);

                    location.id = index;
                    // 마커를 맵위에 그린다.
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        map: map,
                        draggable: isEditable

                    });

                    const geometry = (lat, lng, updateLocation) => {
                        let geocoder = new kakao.maps.services.Geocoder();
                        let coord = new kakao.maps.LatLng(lat, lng);
                        const callBack = (result, status) => {
                            if(status === kakao.maps.services.Status.OK) {
                                console.log(result[0].address.address_name);
                                console.log(location.addr)
                                updateLocation(result[0].address.address_name);
                            }
                        }
                        geocoder.coord2Address(coord.getLng(), coord.getLat(), callBack);
                    }
                    let locationToUpdate = {};

                    kakao.maps.event.addListener(marker, 'dragend', () => {
                        let latlng = marker.getPosition();
                        console.log(latlng.getLat());
                        console.log(latlng.getLng());

                        setSchedules(prevSchedules => {
                            const newSchedules = [...prevSchedules];
                            const scheduleToUpdate = schedules[selectedDate];
                            if(!locationToUpdate || !scheduleToUpdate.locations) {
                                console.error("오류났다")
                                return newSchedules;
                            }
                            locationToUpdate = scheduleToUpdate.locations.find(location => location.id === index);

                            if (!locationToUpdate) {
                                console.error("Cannot find the location to update");
                                return newSchedules;
                            }
                            locationToUpdate.lat = latlng.getLat();
                            locationToUpdate.lng = latlng.getLng();

                            return newSchedules;
                        });

                        const updateLocation = (newAddr) => {
                            setSchedules(schedules => {
                                if(!locationToUpdate) {
                                    console.error("오류났다")
                                    return schedules;
                                }
                                locationToUpdate.addr = newAddr;
                                return schedules;
                            })
                        }

                        geometry(latlng.getLat(), latlng.getLng(), updateLocation);
                    });
                });
            }
        }
    }, [myTravelInfo, schedules, isEditable])

    const updateTravelInfo = useMutation(async (travelPlan) => {
        const travelId = parseInt(searchParams.get('id'));
        const option = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('accessToken')}`
            }
        }
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/travel/plan/update/${travelId}`, travelPlan, option);
            window.location.replace(`/user/${searchParams.get('userId')}`);
            return response;
        }catch (error) {

        }
    },)

    const clickDateHandler = (date) => {
        setSelectedDate(date);
    }

    const editHandler = () => {
        setIsEditable(true);
    }

    const saveHandler = () => {
        setIsEditable(false);
        const updatedTravelPlan = {...travelPlan, schedules: schedules}
        setTravelPlan(updatedTravelPlan);
        updateTravelInfo.mutate(updatedTravelPlan);
    }

    return (
        <div css={viewContainer}>
            <div css={buttonContainer}>
                {schedules.map((_, index) => (
                        <button
                            css={dayButtonStyle}
                            key={index}
                            onClick={() => clickDateHandler(index)}
                        >
                            DAY{index + 1}
                        </button>
                ))}
            </div>
            <main css={mainStyle}>
                <div css={tripLocationList}>
                    {myTravelInfo.isLoading || !schedules[selectedDate] ? "" :
                        Array.from(new Set(schedules[selectedDate].locations.map(location => location.addr)))
                            .map((locationAddr, index) => (
                                <div key={index} css={tripLocationItem}>
                                    <div css={indexStyle}>STEP {index + 1}&nbsp;&nbsp;</div>
                                    <div css={addressStyle}>{locationAddr}</div>
                                </div>
                            ))}
                </div>
                <div css={footerStyle}>
                    <div css={footerButtonContainer}>
                        <button css={buttonStyle} onClick={editHandler} style={{display: isEditable ? 'none' : 'block'}}>수정</button>
                        <button css={buttonStyle} onClick={saveHandler} style={{display: isEditable ? 'block' : 'none'}}>저장</button>
                        <button css={buttonStyle} onClick={() => window.location.replace(`/user/${searchParams.get("userId")}`)}>취소</button>
                    </div>
                </div>
            </main>
            <div css={mapContainer}>
                <div id="map" style={{
                    width: "100%",
                    height: "100%"
                }} />
            </div>
        </div>

    );
};

export default CheckMyTrip;


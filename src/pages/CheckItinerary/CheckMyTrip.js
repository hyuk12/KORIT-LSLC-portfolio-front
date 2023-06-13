/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {
    buttonContainer,
    buttonStyle, footerButtonContainer, footerStyle,
    mainStyle,
    mapContainer, tripLocationItem,
    tripLocationList,
    viewContainer, indexStyle, addressStyle, dayButtonStyle, itemIconStyle, itemContainer, scheduleDate, selectedButtonStyle,
    customOverlayStyle
} from "./styles/CheckPageStyles";

const { kakao } = window;

const CheckMyTrip = () => {
    const [travelPlan, setTravelPlan] = useState({schedules: []});
    const [userInfo , setUserInfo] = useState({userId: ''})
    const [isEditable, setIsEditable] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDate, setSelectedDate] = useState(0);
    const [ schedules, setSchedules ] = useState([]);
    const tripLocationListRef = useRef(null);
    const [selectedButton, setSelectedButton] = useState(0);

    const myTravelInfo = useQuery(['info'], async () => {
        try {
                const response = await axios.get('http://43.202.21.26/api/v1/travel/plan/info', {
                    params: {
                        travelId: searchParams.get('id'),
                    },
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`
                    }
                })
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

                    const customOverlayStyleString = `
                        position: absolute;
                        top: -90px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: white;
                        color: black;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-weight: 600;
                        font-size: 14px;
                        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                    `;
                    const content = `<div style="${customOverlayStyleString}">${index + 1}</div>`;
                    // 마커를 맵위에 그린다.

                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        map: map,
                        draggable: isEditable

                    });

                    const customOverlay = new kakao.maps.CustomOverlay({
                        position: markerPosition,
                        content: content,
                        yAnchor: 0.9
                    });

                    customOverlay.setMap(map);

                    const geometry = (lat, lng, updateLocation) => {
                        let geocoder = new kakao.maps.services.Geocoder();
                        let coord = new kakao.maps.LatLng(lat, lng);
                        const callBack = (result, status) => {
                            if(status === kakao.maps.services.Status.OK) {
                                updateLocation(result[0].address.address_name);
                            }
                        }
                        geocoder.coord2Address(coord.getLng(), coord.getLat(), callBack);
                    }
                    let locationToUpdate = {};

                    kakao.maps.event.addListener(marker, 'dragend', () => {
                        let latlng = marker.getPosition();

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
            const response = await axios.put(`http://43.202.21.26/api/v1/travel/plan/update/${travelId}`, travelPlan, option);
            window.location.replace(`/user/${searchParams.get('userId')}`);
            return response;
        }catch (error) {

        }
    },)

    const clickDateHandler = (date) => {
        setSelectedDate(date);

        // Day 버튼을 클릭하면 상단으로 스크롤 이동 및 포커싱
        tripLocationListRef.current.scrollTo({ top: 0, behavior: "smooth" });
        tripLocationListRef.current.focus();
    }

    const editHandler = () => {
        setIsEditable(true);
    }

    const saveHandler = () => {
        setIsEditable(false);
        const updatedTravelPlan = {...travelPlan, schedules: schedules};
        setTravelPlan(updatedTravelPlan);
        updateTravelInfo.mutate(updatedTravelPlan);
    }

    return (
        <div css={viewContainer}>
            <div css={buttonContainer}>
                {schedules.map((_, index) => (
                        <button
                            css={[dayButtonStyle, selectedButton === index && selectedButtonStyle]}
                            key={index}
                            onClick={() => {
                                setSelectedButton(index);
                                clickDateHandler(index);
                            }}
                        >
                            DAY{index + 1}
                        </button>
                ))}
            </div>
            <main css={mainStyle}>
                <div css={tripLocationList} ref={tripLocationListRef}>
                    {/* 여행 날짜 표시 */}
                    {myTravelInfo.isLoading || !schedules[selectedDate] ? "" :
                        <div css={scheduleDate}>{schedules[selectedDate].scheduleDate}</div>
                    }
                    {/* 여행 경로 표시 */}
                    {myTravelInfo.isLoading || !schedules[selectedDate] ? "" :
                        Array.from(new Set(schedules[selectedDate].locations.map(location => location.addr)))
                            .map((locationAddr, index, arr) => (
                                <div key={index} css={itemContainer}>
                                    <div  css={tripLocationItem}>
                                        <div css={indexStyle}>STEP {index + 1}&nbsp;&nbsp;</div>
                                        <div css={addressStyle}>{locationAddr}</div>
                                    </div>
                                    <div css={itemIconStyle}>
                                        {
                                            index === arr.length - 1
                                            ? <></>
                                            : <>▼</>
                                            
                                        }
                                    </div>
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


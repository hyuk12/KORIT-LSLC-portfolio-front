/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from 'react';
import {css} from "@emotion/react";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";

const { kakao } = window;

const viewContainer = css`
  display: flex;
  margin-top: 64px;
  width: 1920px;
  height: 862px;

`;

const mapContainer = css`
  display: flex;
  flex-direction: column;  
  width: 100%;
  height: 100%;
    
`;

const buttonContainer = css`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  width: 100%;
  height: 214px;
  
`;

const buttonStyle = css`

  width: 150px;
  height: 50px;
`;

const mainStyle = css`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
`;

const tripLocationList = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 648px;

  border: 1px solid black;

  &::-webkit-scrollbar {
    width: 3px;
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #f8f7fb;
    opacity: .4;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }
  
`;

const tripLocationItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 180px;
  border: 1px solid black;
`;

const footerStyle = css`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: 214px;
`;

const footerButtonContainer = css`

  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const CheckMyTrip = () => {
    const navigate = useNavigate();
    const [markers, setMarkers] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDate, setSelectedDate] = useState(0);
    const [ schedules, setSchedules ] = useState([]);
    // const usePrevious = (value) => {
    //     const ref = useRef();
    //     useEffect(() => {
    //         ref.current = value;
    //     });
    //     return ref.current;
    // }

    // const prevIsEditable = usePrevious(isEditable);

    const principal = useQuery(['principal'], async () => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('https://localhost:8080/api/v1/auth/principal', {params: {accessToken: accessToken}});

        return response;
    }, {

    });

    const myTravelInfo = useQuery(['info'], async () => {
        try {
            if (!principal.isLoading){
                const response = await axios.get('http://localhost:8080/api/v1/travel/plan/info', {
                    params: {
                        userId: principal.data.data.userId,
                        travelId: searchParams.get('id'),
                    },
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`
                    }
                })
                return response;
            }
        }catch (error) {

        }
    }, {
        onSuccess: (response) => {
            setSchedules([ ...response.data.schedules ]);
        },
        enabled: !!principal.isSuccess,
    })
    let map = null;

    // const updateSchedules = useMutation(async () => {
    //     const option = {
    //         headers: {
    //             Authorization: `${localStorage.getItem('accessToken')}`
    //         }
    //     }
    //     try {
    //         const response = await axios.put('http://localhost:8080/api/v1/travel/plan/update', schedules, option);
    //         return response;
    //     }catch (error) {
    //         console.log(error);
    //     }
    // });

    useEffect(() => {

        if(!!schedules) {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(37.5522, 126.570667),
                level: 8
            }
            map = new kakao.maps.Map(container, options);

            // If the myTravelInfo query is successful
            if (!!schedules && schedules.length > 0 && schedules[selectedDate].locations.length > 0) {
                const { lat, lng } = schedules[selectedDate].locations[0];

                // Create a new LatLng object using the lat and lng
                const position = new kakao.maps.LatLng(lat, lng);

                // Update the center of the map
                map.setCenter(position);

                // Loop over all locations to create markers
                const createdMarkers = schedules[selectedDate].locations.map((location) => {
                    const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);

                    // Create a marker and add it to the map
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        map: map,
                    });
                    return marker;
                });
                setMarkers(createdMarkers);
            }

        }
    }, [myTravelInfo, schedules])



    // useEffect(() => {
    //     if (isEditable) {
    //         markers.forEach((marker) => {
    //             marker.setDraggable(true);
    //             kakao.maps.event.addListener(marker, 'dragend', () => {
    //                 const newPosition = marker.getPosition();
    //                 const lat = newPosition.lat();
    //                 const lng = newPosition.lng();
    //                 setSchedules(schedules.map((schedule) => {
    //                     schedule.locations = schedule.locations.map(location => {
    //                         location.lat = lat;
    //                         location.lng = lng;
    //                     });
    //                     return schedule;
    //                 }))
    //             })
    //         })
    //     } else if(!isEditable && prevIsEditable) {
    //         markers.forEach((marker) => {
    //             marker.setDraggable(false);
    //             kakao.maps.event.removeListener(marker, 'dragend');
    //         });
    //         // updateSchedules.mutate();
    //     }
    // }, [isEditable]);


    const clickDateHandler = (date) => {
        setSelectedDate(date);
    }

    const saveHandler = () => {
        setIsEditable(false);
    }

    return (
        <div css={viewContainer}>
            <div css={mapContainer}>
                <div id="map" style={{
                    width: "100%",
                    height: "648px"
                }} />
                <div css={buttonContainer}>
                    {schedules.map((_, index) => (
                            <button
                                css={buttonStyle}
                                key={index}
                                onClick={() => clickDateHandler(index)}
                            >
                                {index + 1}일차
                            </button>
                    ))}
                </div>
            </div>
            <main css={mainStyle}>

                <div css={tripLocationList}>
                    {myTravelInfo.isLoading || !schedules[selectedDate] ? "" :
                        Array.from(new Set(schedules[selectedDate].locations.map(location => location.addr)))
                            .map((locationAddr, index) => (
                                <div key={index} css={tripLocationItem}>
                                    <div>{locationAddr}</div>
                                </div>
                            ))}
                </div>
                <div css={footerStyle}>
                    <div css={footerButtonContainer}>
                        <button css={buttonStyle} onClick={() => setIsEditable(true)} style={{display: isEditable ? 'none' : 'block'}}>수정</button>
                        <button css={buttonStyle} onClick={saveHandler} style={{display: isEditable ? 'block' : 'none'}}>저장</button>
                        <button css={buttonStyle} onClick={() => navigate(`/user/${principal.data.data.userId}`, {replace: true})}>취소</button>
                    </div>
                </div>
            </main>
        </div>

    );
};

export default CheckMyTrip;


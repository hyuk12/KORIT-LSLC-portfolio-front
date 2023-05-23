/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import {css} from "@emotion/react";
import {useQuery} from "react-query";
import axios from "axios";
import {useSearchParams} from "react-router-dom";

const { kakao } = window;

const viewContainer = css`
  display: flex;
  margin-top: 64px;
  width: 1920px;
  height: 1080px;

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
  height: 30%;
  
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
  height: 80%;

  border: 1px solid black;
  
`;

const tripLocationItem = css`
  width: 70%;
  height: auto;
  border: 1px solid black;
`;

const footerStyle = css`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: 20%;
`;

const footerButtonContainer = css`

  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const CheckMyTrip = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDate, setSelectedDate] = useState(0);
    const [ schedules, setSchedules ] = useState([]);

    const principal = useQuery(['principal'], async () => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('https://localhost:8080/api/v1/auth/principal', {params: accessToken});
        return response;
    }, {
        // onSuccess: (response) => {
        // }
    });

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
                level: 9
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
                schedules[selectedDate].locations.forEach(location => {
                    const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);

                    // Create a marker and add it to the map
                    const marker = new kakao.maps.Marker({
                        position: markerPosition,
                        map: map,
                    });
                });
            }

        }
    }, [myTravelInfo, schedules])

    const clickDateHandler = (date) => {
        setSelectedDate(date);
    }

    return (
        <div css={viewContainer}>
            <div css={mapContainer}>
                <div id="map" style={{
                    width: "100%",
                    height: "60%"
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
                    {myTravelInfo.isLoading ? "" : schedules[selectedDate].locations.map((location, index) => (
                        <div key={index} css={tripLocationItem}>{location.addr}</div>
                    ))}
                </div>
                <div css={footerStyle}>
                    <div css={footerButtonContainer}>
                        <button css={buttonStyle} disabled>확인</button>
                        <button css={buttonStyle} disabled>취소</button>
                    </div>
                </div>
            </main>
        </div>

    );
};

export default CheckMyTrip;


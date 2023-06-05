/** @jsxImportSource @emotion/react */
import axios from "axios";
import dayjs from "dayjs";
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "react-query";
import {useSearchParams} from "react-router-dom";
import CoustomCalendar from "../../components/Calendar/CoustomCalendar";
import AddUserModal from "../../components/contents/Modal/AddUserModal";
import {
    buttonContainer,
    buttonStyle, footerButtonContainer, footerStyle,
    mainStyle,
    mapContainer,
    resetButton, tripLocationItem, tripLocationList,
    viewContainer
} from "./styles/CheckPageStyles";

const { kakao } = window;

const CheckCopyTrip = () => {
    const [travelPlan, setTravelPlan] = useState({schedules: []});
    const [refresh, setRefresh] = useState(true);
    const [userInfo , setUserInfo] = useState({userId: ''})
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [startDay, setStartDay] = useState(dayjs());
    const [endDay, setEndDay] = useState(dayjs().add(1, 'day'));
    const [totalDate, setTotalDate] =useState(2);
    const [selectedDate, setSelectedDate] = useState(0);
    const [scheduleData, setScheduleData] = useState([]);
    const [ schedules, setSchedules ] = useState([]);
    const [partyData, setPartyData] = useState([]);

    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/user/principal', { headers: { Authorization: localStorage.getItem("accessToken") } });
        return response;
      }, {
        enabled: refresh,
        onSuccess : (response) => {
          setUserInfo({
            userId: response.data.userId,
            name: response.data.name,
            email: response.data.email,
            profileImg: response.data.postsImgUrl
          })
          setRefresh(false);
        }
      });

    const copyReviewInfo = useQuery(['info'], async () => {
        try {
                const response = await axios.get('http://localhost:8080/api/v1/travel/plan/info/copy', {
                    params: {
                        reviewId: searchParams.get('reviewId'),
                        travelId: searchParams.get('travelId'),
                    },
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`
                    }
                })

                return response;
        }catch (error) {
            return error;
        }
    }, {
        onSuccess: (response) => {

            setSchedules([ ...response.data.schedules ]);
        }
    })

    let map = null;

    const openModal = () => {
        setIsModalOpen(!isModalOpen);
      };
      
    const closeModal = () => {
        setIsModalOpen(!isModalOpen);
    };


      const startDayHandle = (newValue) => {
        setStartDay(newValue);
        setTotalDate(endDay.diff(newValue, 'day') + 1);
      }
      
      const endDayHandle = (newValue) => {
        setEndDay(newValue);
        setTotalDate(newValue.diff(startDay, 'day') + 1);
      }
      

    const resetDay = () => {
        setStartDay(dayjs());
        setEndDay(dayjs().add(1, 'day'));
        const newTotalDate = dayjs().add(1, 'day').diff(dayjs(), 'day') + 1;
        setTotalDate(newTotalDate);
    };

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
                                console.error("오류")
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
                                    console.error("오류")
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
    }, [copyReviewInfo, schedules, isEditable])

    
    
    
    const updateTravelInfo = useMutation(async (travelPlan) => {
        const travelId = parseInt(searchParams.get('travelId'));
        const option = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('accessToken')}`
              }
            }
            try {
              const response = await axios.put(`http://localhost:8080/api/v1/travel/plan/update/${travelId}`, travelPlan, option);
              window.location.replace(`/user/${userInfo.userId}`);
              return response;
            }catch (error) {
              return error;
            }
          },)
          
    

    const requestData = useMutation(async (updatedScheduleData) => {
        const option = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem("accessToken")}`
          }
        }
        try {
          const response = await axios.post("http://localhost:8080/api/v1/travel/plan/save", updatedScheduleData, option)
    
          window.location.replace(`/user/${userInfo.userId}`)
          return response;
        }catch (error) {
          return error;
        }
    
      }, {
        onSuccess: (response) => {
          localStorage.removeItem("scheduleData");
          localStorage.removeItem("partyData");
        }
      })

    const submitPlanHandler = () => {
      const partyData = JSON.parse(localStorage.getItem("partyData"));
      const getScheduleData = JSON.parse(localStorage.getItem("scheduleData"));
      

      
      const updatedScheduleData = getScheduleData.map((scheduleDate,index) => {

        const locations = schedules.map((item) => item.locations);

        return {
          id:scheduleDate.id,
          date: scheduleDate.date,
          location: locations[index],
          partyData: partyData.partyData,
        };
      });

      requestData.mutate(updatedScheduleData);
    };

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
            <button css={resetButton} onClick={resetDay}>Reset Start Day</button>
            <CoustomCalendar
                startDay={startDay}
                endDay={endDay}
                totalDate={totalDate}
                onStartDayChange={startDayHandle}
                onEndDayChange={endDayHandle}
                userInfo={userInfo}
            />
             <button css={buttonStyle} onClick={openModal}>친구 추가</button>
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
                    {copyReviewInfo.isLoading || !schedules[selectedDate] ? "" :
                        Array.from(new Set(schedules[selectedDate].locations.map(location => location.addr)))
                            .map((locationAddr, index) => (
                                <div key={index} css={tripLocationItem}>
                                    <div>{locationAddr}</div>
                                </div>
                            ))}
                </div>
                <div css={footerStyle}>
                    <div css={footerButtonContainer}>
                        <button css={buttonStyle} onClick={editHandler} style={{display: isEditable ? 'none' : 'block'}}>수정</button>
                        <button css={buttonStyle} onClick={saveHandler} style={{display: isEditable ? 'block' : 'none'}}>저장</button>
                        <button css={buttonStyle} onClick={() => window.location.replace(`/user/${searchParams.get("userId")}`)}>취소</button>
                        <button css={buttonStyle} onClick={submitPlanHandler}>일정저장</button>
                    </div>
                </div>
                
            </main>
            <AddUserModal
            isOpen={isModalOpen}
            onClose={closeModal}
            destination={{ image: 'image-url', title: searchParams.get("destinationTitle"), englishing: 'Englishing' }}
            userInfo={userInfo}
            updatePartyData={(updatedPartyData) => setPartyData(updatedPartyData)}
            />
        </div>

    );
};

export default CheckCopyTrip;


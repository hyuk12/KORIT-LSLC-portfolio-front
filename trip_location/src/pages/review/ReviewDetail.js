/** @jsxImportSource @emotion/react */
import axios from "axios";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {useNavigate, useSearchParams} from "react-router-dom";
import Rating from '@mui/material/Rating';
import {
  viewContainer, mapContainer,
  mapMove, buttonMove, scheduleButton,
  mapList, locList, myLocation,
  reviewMove, reviewContainer, titleAndSaveContainer,
  reviewTitle, rating, saveButton,
  photoContainer, photo, writeReviewContainer
} from "./styles/ReivewStyles";

const { kakao } = window;

const ReviewDetail = () => {
  const navigate = useNavigate();
  const [ reviewData, setReviewData ] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ schedules, setSchedules ] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [ value, setValue ] = useState(0);
  const [sendReviewData, setSendReviewData] = useState({
    review: "", // text
    title: "",  // string
    travelId: "",  // string
    userId: "",
    rating: ''// string
  });

  const travelInfoReview = useQuery(['infoReview'], async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/travel/plan/info/review', {
        params: {
          travelId: searchParams.get('id'),
        }
      });
      setSendReviewData((prevData) => ({
        ...prevData,
        travelId: searchParams.get('id'),
      }));

      return response;
    }catch (error) {
      console.error(error);
    }
  }, {
    onSuccess: (response) => {
      setSchedules([ ...response.data.schedules ]);
    }
  })

  const getReviewDetails = useQuery(['getReviewDetails'], async () => {
    try {

      const response = await axios.get(`http://localhost:8080/api/v1/review/list/${searchParams.get('reviewId')}`)
      return response;
    }catch (error) {

    }
  }, {

    onSuccess: (response) => {
      if(response.status === 200) {
        setSendReviewData({
          review: response.data.data.reviewContents,
          title: response.data.data.reviewTitle,
          rating: parseInt(response.data.data.reviewRating),
          userId: parseInt(response.data.data.userId),
          travelId: parseInt(searchParams.get('id')),
        })
        setReviewData(response.data.data);
      }
    },
    enabled: !reviewData
  })

  console.log(reviewData);
useEffect(() => {
  if (!!schedules && schedules.length > 0 && schedules[selectedDate]?.locations?.length > 0) {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5522, 126.570667),
      level: 8,
      draggable: false
    };
    const map = new kakao.maps.Map(container, options);
    const bounds = new kakao.maps.LatLngBounds();


    schedules[selectedDate].locations.forEach((location, index) => {
      const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        map: map
      });
      bounds.extend(markerPosition);
      console.log(schedules)
    });

    map.setBounds(bounds);
  }

}, [schedules, selectedDate]);

  const handleLocationUpdate = (locations) => {
    setSendReviewData((prevData) => {
      return {
        ...prevData,
        coordinates: locations.map((location) => ({
          lat: location.lat,
          lng: location.lng,
        })),
      };
    });
  };

  const handleTitleChange = (event) => {    // 리뷰의 제목 저장
    const updatedData = { ...sendReviewData, title: event.target.value };
    setSendReviewData(updatedData);
  };

  const handleReviewChange = (event) => {   // 리뷰의 내용 저장
    const updatedData = { ...sendReviewData, review: event.target.value };
    setSendReviewData(updatedData);
  };

  const clickDateHandler = (date) => {
    setSelectedDate(date);

    if (!!schedules && schedules.length > 0 && schedules[date]?.locations?.length > 0) {
      const locations = schedules[date].locations;
      handleLocationUpdate(locations);
    }
  };
  const reviewRePlanClickHandle = () => {
    navigate(`/user/trip/replan?reviewId=${searchParams.get('reviewId')}&travelId=${searchParams.get('id')}`)
  }

    return (
      <div css={viewContainer}>
        <div css={mapContainer}>
          <div css={mapMove}>
            <div css={buttonMove}>
            {schedules.map((_, index) => (
              <button
                css={scheduleButton}
                key={index}
                onClick={() => clickDateHandler(index)}>
                {index + 1}일차
              </button>
                ))}
            </div>
            <div css={mapList}>
            <div id="map" style={{
                    width: "550px",
                    height: "450px",
                }} />
            </div>
          </div>
          <div css={reviewMove}>
            <div css={locList}>
              {schedules[selectedDate]?.locations?.map((location) => (
                <div css={myLocation} key={location.locationId}>
                  {location.addr}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div css={reviewContainer}>
          <div css={titleAndSaveContainer}>
            <input disabled={true} css={reviewTitle} type="text" value={getReviewDetails.isLoading ? '' : sendReviewData.title} onChange={handleTitleChange} />
            <div css={rating}>
            <Rating
                disabled={true}
              name="rating"
              value={getReviewDetails.isLoading ? '' : sendReviewData.rating}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
              </div>
            <button css={saveButton} onClick={reviewRePlanClickHandle}>경로 가져오기</button>
          </div>
          <div css={photoContainer}>
            {!getReviewDetails.isLoading && reviewData && reviewData.reviewImgUrls && reviewData.reviewImgUrls.map((data, index) => {
              return <img key={index} css={photo} src={data} alt={`${index}`}/>
            })}
          </div>
          <div>
            <textarea disabled={true} css={writeReviewContainer} name="" id="" cols="113" rows="16" value={getReviewDetails.isLoading ? '' : sendReviewData.review} onChange={handleReviewChange}></textarea>
         </div>
        </div>
      </div>
    );
};

export default ReviewDetail;


/** @jsxImportSource @emotion/react */
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import {useNavigate, useSearchParams} from "react-router-dom";
import Rating from '@mui/material/Rating';
import {
  getRouteButton, getRouteButtonIcon
} from "./styles/ReivewStyles";
import {
  locList,
  mapList,
  myLocation, photo, photoContainer, rating, reviewContainer, reviewMapContainer, reviewTitle, saveButton,
  scheduleButton, titleAndSaveContainer,
  reviewPageContainer, writeReviewContainer, dayButtonContainer, selectedButtonStyle, viewContainer,
  tripLocationItem, indexStyle, addressStyle, itemIconStyle, reviewContentsInput
} from "../CheckItinerary/styles/CheckPageStyles";
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';

const { kakao } = window;

const ReviewDetail = () => {
  const navigate = useNavigate();
  const [ reviewData, setReviewData ] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ schedules, setSchedules ] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [ value, setValue ] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const tripLocationListRef = useRef(null);
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

        const customOverlay = new kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          yAnchor: 0.9
        });

        customOverlay.setMap(map);
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
    
    tripLocationListRef.current.scrollTo({ top: 0, behavior: "smooth" });
    tripLocationListRef.current.focus();

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
        <div css={reviewPageContainer}>
          <div css={dayButtonContainer}>
            {schedules.map((_, index) => (
              <button
                css={[scheduleButton, selectedButton === index && selectedButtonStyle]}
                key={index}
                onClick={() => {
                  setSelectedButton(index);
                  clickDateHandler(index);
                }}
              >
                DAY {index + 1}
              </button>
                ))}
          </div>
          <div css={reviewMapContainer}>
            <div css={mapList}>
              <div id="map" style={{
                    width: "95%",
                    height: "95%",
              }} />
            </div>
            <div css={locList} ref={tripLocationListRef}>
              {schedules[selectedDate]?.locations?.map((location, index, arr) => (
                <div css={myLocation} key={location.locationId}>
                  <div css={tripLocationItem} >
                      <div css={indexStyle}>STEP {index + 1}</div>
                      <div css={addressStyle}>{location.addr}</div>
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
            <button css={getRouteButton} onClick={reviewRePlanClickHandle}>
              <AddLocationAltRoundedIcon css={getRouteButtonIcon}/>
            </button>
          </div>
          <div css={photoContainer}>
            {!getReviewDetails.isLoading && reviewData && reviewData.reviewImgUrls && reviewData.reviewImgUrls.map((data, index) => {
              return <img key={index} css={photo} src={data} alt={`${index}`}/>
            })}
          </div>
          <div css={writeReviewContainer}>
            <textarea disabled={true} css={reviewContentsInput} name="" id="" value={getReviewDetails.isLoading ? '' : sendReviewData.review} onChange={handleReviewChange}></textarea>
         </div>
          </div>
        </div>
      </div>
    );
};

export default ReviewDetail;


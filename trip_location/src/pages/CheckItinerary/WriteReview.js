/** @jsxImportSource @emotion/react */
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {useNavigate, useSearchParams} from "react-router-dom";
import Rating from '@mui/material/Rating';
import {
    buttonMove,
    locList,
    mapContainer,
    mapList,
    myLocation, photo, photoContainer, rating, reviewContainer, reviewTitle, saveButton,
    scheduleButton, titleAndSaveContainer,
    viewContainer, writeReviewContainer
} from "./styles/CheckPageStyles";
import {mapMove, reviewMove} from "../review/styles/ReivewStyles";

const { kakao } = window;

const WriteReview = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ schedules, setSchedules ] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [ imgFiles, setImgFiles ] = useState([]);
  const fileId = useRef(1);
  const [ value, setValue ] = useState(0);

  const [sendReviewData, setSendReviewData] = useState({
  review: "", // text
  title: "",  // string
  travelId: "",  // string
  userId: ""  // string
  });

  const travelInfo = useQuery(['info'], async () => {
    try {
            const response = await axios.get('http://localhost:8080/api/v1/travel/plan/info', {
                params: {
                    userId: searchParams.get('userId'),
                    travelId: searchParams.get('id'),
                },
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            });
            setSendReviewData((prevData) => ({
              ...prevData,
              userId: searchParams.get('userId'),
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



  const addFileHandle = (e) => {
    const newImgFiles = [];

    for(const file of e.target.files) {
      const fileData = {
        id: fileId.current,
        file
      }
      fileId.current += 1;
      newImgFiles.push(fileData);
    }

    setImgFiles([...imgFiles, ...newImgFiles]);

    e.target.value = null;
  }

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

  const saveReview = useMutation(async (reviewData) => {
      try{

          console.log(reviewData.review);
          console.log(reviewData.title);
          const formData = new FormData();
          formData.append('review', reviewData.review);
          formData.append('title', reviewData.title);
          formData.append('travelId', reviewData.travelId);
          formData.append('userId', reviewData.userId);
          formData.append('rating', value);

          imgFiles.forEach(imgFile => {
            formData.append('imgFiles', imgFile.file);
          })

          const option = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${localStorage.getItem('accessToken')}`
            }
          }
          console.log(formData.get('imgFile'))
          const response = await axios.post('http://localhost:8080/api/v1/review/save', formData, option);
          return response
      }catch(error) {

      }
  }, {
    onSuccess: (response) => {
      if(response.status === 200) {
        navigate(`/user/${searchParams.get('userId')}`);
      }

    }
  })

  const saveClickHandler = () => {
    saveReview.mutate(sendReviewData);
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
            <input css={reviewTitle} type="text" value={sendReviewData.title} onChange={handleTitleChange} />
            <div css={rating}>
            <Rating
              name="rating"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
              </div>
            <button css={saveButton} onClick={saveClickHandler}>리뷰 저장하기</button>
          </div>
          <div css={photoContainer} onClick={() => document.getElementById("imageInput").click()}>
            <input hidden={true} id="imageInput" type="file" multiple={true} onChange={addFileHandle} accept={".jpg,.png"} />
            {imgFiles.length > 0 &&
                imgFiles.map((imgFile, index) => (
                    <img key={index} css={photo} src={URL.createObjectURL(imgFile.file)} alt={`Preview ${index}`} />
                ))}
          </div>
          <div>
            <textarea css={writeReviewContainer} name="" id="" cols="113" rows="16" value={sendReviewData.review} onChange={handleReviewChange}></textarea>
         </div>
        </div>
      </div>
    );
};

export default WriteReview;


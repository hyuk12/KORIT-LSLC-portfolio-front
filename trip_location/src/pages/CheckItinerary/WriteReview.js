/** @jsxImportSource @emotion/react */
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {useNavigate, useSearchParams} from "react-router-dom";
import Rating from '@mui/material/Rating';
import {
    locList,
    mapList,
    myLocation, photo, photoContainer, rating, reviewContainer, reviewMapContainer, reviewTitle, saveButton,
    scheduleButton, titleAndSaveContainer,
    reviewPageContainer, writeReviewContainer, dayButtonContainer, selectedButtonStyle, viewContainer,
    tripLocationItem, indexStyle, addressStyle, itemIconStyle, reviewSaveButton, fileInputBox, fileInputButton, reviewContentsInput
} from "./styles/CheckPageStyles";
import RateReviewOutlined from '@mui/icons-material/RateReviewOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const { kakao } = window;

const WriteReview = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ schedules, setSchedules ] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [ imgFiles, setImgFiles ] = useState([]);
  const fileId = useRef(1);
  const [ value, setValue ] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);
  const tripLocationListRef = useRef(null);

  const [sendReviewData, setSendReviewData] = useState({
  review: "", // text
  title: "",  // string
  travelId: "",  // string
  userId: ""  // string
  });

  const travelInfo = useQuery(['info'], async () => {
    try {
            const response = await axios.get('http://43.202.21.26/api/v1/travel/plan/info', {
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
    const titleValue = event.target.value;
    if(titleValue.length <= 20) {
      const updatedData = { ...sendReviewData, title: titleValue };
      setSendReviewData(updatedData);
    }
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

  const saveReview = useMutation(async (reviewData) => {
      try{
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

          const response = await axios.post('http://43.202.21.26/api/v1/review/save', formData, option);
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
    if (sendReviewData.review && sendReviewData.title && value && imgFiles.length > 0) {
      saveReview.mutate(sendReviewData);
    } else {
      alert('모든 부분을 작성해주세요');
    }
  }

  const removeImage = (removeIndex) => {
      setImgFiles(prevImgFiles =>
          prevImgFiles.filter((imgFile, index) => index !== removeIndex)
      );
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
              <input css={reviewTitle} type="text" value={sendReviewData.title} placeholder="제목" onChange={handleTitleChange} />
              <div css={rating}>
                <Rating
                  name="rating"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
              <button css={saveButton} onClick={saveClickHandler}>
                <RateReviewOutlined css={reviewSaveButton}/>
              </button>
            </div>
            <div css={photoContainer} >
              <div onClick={() => document.getElementById("imageInput").click()} css={fileInputBox}>
                <AddRoundedIcon css={fileInputButton}/>
                <input hidden={true} id="imageInput" type="file" multiple={true} onChange={addFileHandle} accept={".jpg, .png, .jpeg"} ></input>
              </div>
                {imgFiles.length > 0 &&
                    imgFiles.map((imgFile, index) => (
                        <img
                            key={index}
                            css={photo}
                            src={URL.createObjectURL(imgFile.file)}
                            alt={`Preview ${index}`}
                            onClick={() => removeImage(index)} // onClick 핸들러 추가
                        />
                    ))
                }
            </div>
            <div css={writeReviewContainer}>
              <textarea css={reviewContentsInput} placeholder="- 직접 경험한 솔직한 리뷰를 남겨주세요. &#13;&#10;- 사진을 1개 이상 첨부해주세요." name="" id="" value={sendReviewData.review} onChange={handleReviewChange}></textarea>
            </div>
          </div>
        </div>
      </div>
    );
};

export default WriteReview;


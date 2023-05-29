/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";


const { kakao } = window;

const viewContainer = css`
  display: flex;
  margin-top: 64px;
  width: 1920px;
  height: 862px;
`;

const mapContainer = css`
  flex-direction: column;
  padding-top: 64px;
  margin: 100px 20px 0px 150px;
  width: 600px;
  border: 1px solid black;
`;
  
const mapMove = css`
  
`;

const buttonMove = css`
  height: 1px;
`;

const scheduleButton = css`
    position: relative ;
    bottom: 65px;
    right: 50px;
    display: block; 
    height: 100px;
    line-height: 100px;
    
`;

const mapList = css`
    margin: -50px 0px 0px 15px;
    right: 50px;
    width: 400px;
    height: 400px;
`;

const locList = css`
    margin: 15px 0px 0px 15px;
    width: 400px;
    height: 400px;
    max-height: 400px;
    overflow-y: auto;
    padding-top: 40px;
    `;

const myLocation = css`
  text-align: left;
  font-size: 22px;
  text-decoration: underline;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const reviewMove = css`
  
`;

const reviewContainer = css`
    width: 1100px;
`;

const titleAndSaveContainer = css`
    margin-top: 64px;
    width: 100%;
    padding: 10px 10px 10px 0;
`;

const reviewTitle = css`
    width: 500px;
    height: 80px;
    font-size: 30px;
`;

const saveButton = css`
    position: relative;
    align-items: center;
    top: 30px;
    left: 450px;
`;

const photoContainer = css`
    display: flex;
    align-items: center;
    margin: 15px 0 25px 0;
    padding: 10px;
    width: 100%;
    max-width: 1100px;
    height: 300px;
    overflow-x: auto;
    white-space: nowrap;
    border: 1px solid black;
`;
    
const photo = css`
    justify-content: space-around;
    align-items: center;
    margin: 5px;
    border: 1px solid black;
    width: 300px;
    height: 100% ;
`;

const writeReviewContainer = css`
  width: 100%;
  height: 350px;
  padding: 10px;
  font-size: 19px;
`;


const WriteReview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ schedules, setSchedules ] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);

  const [sendReviewData, setsendReviewData] = useState({
    coordinates: [],
    locations: [],
    title: "",
    images: [],
    review: ""
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
            })

            return response;
    }catch (error) {

    }
}, {
    onSuccess: (response) => {
        setSchedules([ ...response.data.schedules ]);
    }
})
  
useEffect(() => {
  if(!!schedules) {
      const container = document.getElementById('map');
      const options = {
          center: new kakao.maps.LatLng(37.5522, 126.570667),
          level: 8,
          draggable: false
      }
      const map = new kakao.maps.Map(container, options);

      // If the myTravelInfo query is successful
      if (!!schedules && schedules.length > 0 && schedules[selectedDate].locations.length > 0) {
          const bounds = new kakao.maps.LatLngBounds();
          // 스케쥴의 해당 선택 일차의 경로를 반복을 돌려 마커를 찍는다.
          schedules[selectedDate].locations.forEach((location, index) => {
              const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
              console.log(location.addr)  //뿌려야할 주소
              location.id = index;
              // 마커를 맵위에 그린다.
              const marker = new kakao.maps.Marker({
                  position: markerPosition,
                  map: map

              });
              bounds.extend(markerPosition);
          });
          map.setBounds(bounds);
      }
  }
}, [travelInfo, schedules])   

const handleImageUpload = (event) => {
  const files = event.target.files;
  const imageUrls = [];

  const readImages = (fileIndex) => {
    if (fileIndex >= files.length) {
      setPreviewImages([...imageUrls]);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      imageUrls.push(reader.result);
      readImages(fileIndex + 1);
    };

    reader.readAsDataURL(files[fileIndex]);
  };

  readImages(0);
};


const clickDateHandler = (date) => {
  setSelectedDate(date);
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
            <input css={reviewTitle} type="text" />
            <button css={saveButton}>리뷰 저장하기</button>
          </div>
          <div css={photoContainer}>
            <input type="file" multiple={true} onChange={handleImageUpload} accept={".jpg,.png"} />
            {previewImages.length > 0 &&
            previewImages.map((previewImage, index) => (
            <img key={index} css={photo} src={previewImage} alt={`Preview ${index}`} />
            ))} 
          </div>
          <div>
            <textarea css={writeReviewContainer} name="" id="" cols="113" rows="16"></textarea>
         </div>
        </div>
      </div>
    );
};

export default WriteReview;


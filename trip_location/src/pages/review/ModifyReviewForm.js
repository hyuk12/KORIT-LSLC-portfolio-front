/** @jsxImportSource @emotion/react */
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {useMutation, useQuery} from "react-query";
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

const ModifyReviewForm = () => {
    const navigate = useNavigate();
    const [ reviewData, setReviewData ] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [ schedules, setSchedules ] = useState([]);
    const [selectedDate, setSelectedDate] = useState(0);
    const [ imgFiles, setImgFiles ] = useState([]);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const fileId = useRef(1);
    const [ value, setValue ] = useState(0);
    const [sendReviewData, setSendReviewData] = useState({
        review: "", // text
        title: "",  // string
        travelId: "",  // string
        userId: "",  // string
        rating: ''
    });

    const travelInfoReview = useQuery(['infoReview'], async () => {
        try {
            const option = {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                },
                params: {
                    travelId: parseInt(searchParams.get('id')),
                }
            }
            const response = await axios.get('http://localhost:8080/api/v1/travel/plan/info/review', option);
            setSendReviewData((prevData) => ({
                ...prevData,
                travelId: parseInt(searchParams.get('id')),
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
            const option = {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axios.get(`http://localhost:8080/api/v1/review/list/${searchParams.get('reviewId')}`, option)
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

    const reviewUpdate = useMutation(async (updateData) => {
        try {
            const option = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            }

            const formData = new FormData();
            formData.append('title', updateData.title);
            formData.append('travelId', parseInt(updateData.travelId));
            formData.append('userId', parseInt(updateData.userId));
            formData.append('rating', parseInt(updateData.rating));
            formData.append('review', updateData.review);

            imgFiles.forEach(imgFile => {
                formData.append('imgFiles', imgFile.file);
            })

            const response = await axios.put(`http://localhost:8080/api/v1/review/${searchParams.get('reviewId')}`, formData, option);
            return response
        }catch (error) {

        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                navigate("/home");
            }
        }
    })

    const reviewDelete = useMutation(async (deleteId) =>  {
        try {
            const option = {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axios.delete(`http://localhost:8080/api/v1/review/${deleteId}`, option);
            
            return response
        }catch (error) {

        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                navigate('/home', {replace: true});
            }
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

      if (newImgFiles.length > 0) {
            setIsImageSelected(true);
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

    const handleRatingChange = (event, newValue) => {    // 리뷰의 별점 저장
        const updatedData = { ...sendReviewData, rating: newValue };
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
        reviewUpdate.mutate(sendReviewData);
    }

    const reviewDeleteClickHandle = () => {
        if (window.confirm("정말로 삭제 하시겠습니까?")) {
            reviewDelete.mutate(parseInt(searchParams.get('reviewId')));
        }
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
                    <input css={reviewTitle} type="text" value={getReviewDetails.isLoading ? '' : sendReviewData.title} onChange={handleTitleChange} />
                    <div css={rating}>
                        <Rating
                            name="rating"
                            value={getReviewDetails.isLoading ? 0 : parseInt(sendReviewData.rating)}
                            onChange={handleRatingChange}
                        />

                    </div>
                    <button css={saveButton} onClick={reviewRePlanClickHandle}>리뷰 수정하기</button>
                    <button css={saveButton} onClick={reviewDeleteClickHandle}>리뷰 삭제하기</button>
                </div>
                <div css={photoContainer} onClick={() => document.getElementById("imageInput").click()}>
                    <input hidden={true} id="imageInput" type="file" multiple={true} onChange={addFileHandle} accept={".jpg,.png"} />
                    <div>
                        {isImageSelected && imgFiles.length > 0 &&
                            imgFiles.map((imgFile, index) => (
                                <img key={index} css={photo} src={URL.createObjectURL(imgFile.file)} alt={`Preview ${index}`} />
                            ))}
                        {!isImageSelected && !getReviewDetails.isLoading && reviewData && reviewData.reviewImgUrls && reviewData.reviewImgUrls.map((data, index) => {
                            return <img key={index} css={photo} src={data} alt={`${index}`}/>
                        })}
                    </div>
                </div>

                <div>
                    <textarea css={writeReviewContainer} name="" id="" cols="113" rows="16" value={getReviewDetails.isLoading ? '' : sendReviewData.review} onChange={handleReviewChange}></textarea>
                </div>
            </div>
        </div>
    );
};

export default ModifyReviewForm;


/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@mui/material';
import {useQuery} from "react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {carouselStyle, largeText, paperStyle, popularImg, reviewPaperStyle, smallText, textOverlay} from "./styles/MainStyles";


const PopularReviewList = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [ popularReview, setPopularReview ] = useState([]);
    const itemPerSlide = 1;
    const reviewListChunks = [];

    const reviewListByRating = useQuery(['list'], async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/review/list');

            return response.data
        }catch (error) {
            console.error('Failed to fetch reviews', error);
        }
    }, {
        onSuccess: (data) => {
            const groupedReviews = [];
            if (data) {
                for (let i = 0; i < data.length; i += 2) {
                    groupedReviews.push(data.slice(i, i + 2));
                }
            }
            setPopularReview([...groupedReviews, [
                {
                    reviewId: 'all',
                    reviewImgUrl: 'default.png',
                    regionName : '전체 리뷰 보러 가기',
                    regionEngName: ''
                }
            ]]);
        }
    })

    for (let i = 0; i < popularReview.length; i += itemPerSlide) {
        // destinationChunks.push(popularRegions.slice(i, i + itemPerSlide));
        const chunk = popularReview.slice(i, i + itemPerSlide);
        if (chunk.length < itemPerSlide && i + itemPerSlide >= popularReview.length) {
            chunk.push(popularReview[0]); // 변경: 짝수로 떨어지지 않는 경우 첫 번째 요소를 추가
        }
        reviewListChunks.push(chunk);
    }

    const handleImageClick = (review) => {
        navigate('/review/list');
    };



    const createIndicators = (length) => {
        const indicators = [];
        for (let i = 0; i < length; i++) {
            indicators.push(
                <button
                    key={i}
                    onClick={() => {
                        // Carousel의 setActiveIndex를 사용하여 인디케이터 클릭 시 해당 슬라이드로 이동
                        setActiveIndex(i);
                    }}
                    className={i === activeIndex ? "active" : ""}
                ></button>
            );
        }
        return indicators;
    };

    return (
        <>
            <Carousel
                autoPlay={false}
                swipe={true}
                indicators={createIndicators(reviewListChunks.length)}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                animation={"slide"}
                css={carouselStyle}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
            >
                {reviewListByRating.isLoading ? '' : popularReview.map((group, groupIndex) => (

                    <div key={groupIndex}>
                        {group.map((review, index) => (
                            <Paper
                                key={index}
                                onClick={() => handleImageClick(review)}
                                css={reviewPaperStyle}
                            >
                                {review.reviewImgUrl !== 'default.png' ?
                                    <img
                                        css={popularImg}
                                        src={review.reviewImgUrl}
                                        alt={review.reviewImgUrl}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    :
                                    <div css={textOverlay}>
                                        <div css={largeText}>
                                            {review.regionName}
                                        </div>
                                        <div css={smallText}>
                                            {review.regionEngName}
                                        </div>
                                    </div>
                                }
                                <div css={textOverlay} style={{display: 'none'}}>
                                    <div css={largeText}>
                                        {review.regionName}
                                    </div>
                                    <div css={smallText}>
                                        {review.regionEngName}
                                    </div>
                                </div>
                            </Paper>
                        ))}
                    </div>
                ))}
            </Carousel>
        </>
    );
};

export default PopularReviewList;

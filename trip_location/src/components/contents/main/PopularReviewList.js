/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from "@emotion/react";
import Modal from "../Modal/Modal";
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@mui/material';
import {useQuery} from "react-query";
import axios from "axios";

const carouselStyle = css`
  width: 100%;
`;

const paperStyle = css`
  position: relative;
  margin: 0 10px;
  width: calc(100% / 3 - 20px);
  height: 350px;
  cursor: pointer;
  display: inline-block;
`;

const popularImg = css`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const textOverlay = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
  color: white;
  font-size: 1.5rem;
  pointer-events: none;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  text-align: center;
`;

const largeText = css`
  font-size: 2rem;
`;

const smallText = css`
  font-size: 1rem;
`;


const PopularReviewList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [ popularReview, setPopularReview ] = useState([]);
    const itemPerSlide = 3;
    const reviewListChunks = [];

    const reviewListByRating = useQuery(['list'], async () => {
        try {
            const option = {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axios.get('http://localhost:8080/api/v1/review/list', option);
            console.log(response);
            return response
        }catch (error) {

        }
    }, {
        onSuccess: (response) => {
            setPopularReview([...response.data])
        }
    })



    for (let i = 0; i < popularReview.length; i += itemPerSlide) {
        // destinationChunks.push(popularRegions.slice(i, i + itemPerSlide));
        const chunk = popularReview.slice(i, i + itemPerSlide);
    }

    const handleImageClick = (destination) => {
        setSelectedDestination(destination);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                cycleNavigation={true}
                animation={"slide"}
                css={carouselStyle}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
            >
                {reviewListByRating.isLoading ? '' : popularReview.map((review, index) => (
                    <div key={index}>

                        <Paper
                            key={review.reviewId}
                            onClick={() => handleImageClick(review)}
                            css={paperStyle}
                        >
                            <img css={popularImg} src={review.reviewImgUrl} alt={review.reviewImgUrl}/>
                            <div css={textOverlay}>
                                <div css={largeText}>
                                    {review.regionName}
                                </div>
                                <div css={smallText}>
                                    {review.regionEngName}
                                </div>
                            </div>
                        </Paper>

                    </div>
                ))}

            </Carousel>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                destination={selectedDestination}
            />
        </>
    );
};

export default PopularReviewList;

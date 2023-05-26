/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from "@emotion/react";
import Modal from "../Modal/Modal";
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@mui/material';

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


const PopularDestinations = ({ destination }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const popularRegions = ['제주', '여수', '부산', '경주', '서울', '강릉', '울릉', '거제', '인천'];
    const itemPerSlide = 3;
    const destinationChunks = [];

    for (let i = 0; i < popularRegions.length; i += itemPerSlide) {
        // destinationChunks.push(popularRegions.slice(i, i + itemPerSlide));
        const chunk = popularRegions.slice(i, i + itemPerSlide);
        const filterData = destination.filter((data) => chunk.includes(data.regionName));
        destinationChunks.push(filterData);
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
                indicators={createIndicators(destinationChunks.length)}
                cycleNavigation={true}
                animation={"slide"}
                css={carouselStyle}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
            >
                {destinationChunks.map((chunk, index) => (
                    <div key={index}>
                        {chunk.map((destination) => (
                            <Paper
                                key={destination.id}
                                onClick={() => handleImageClick(destination)}
                                css={paperStyle}
                            >
                                <img css={popularImg} src={destination.regionImgUrl} alt={destination.regionName}/>
                                <div css={textOverlay}>
                                    <div css={largeText}>
                                        {destination.regionName}
                                    </div>
                                    <div css={smallText}>
                                        {destination.regionEngName}
                                    </div>
                                </div>
                            </Paper>
                        ))}
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

export default PopularDestinations;

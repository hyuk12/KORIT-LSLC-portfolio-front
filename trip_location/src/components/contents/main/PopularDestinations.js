/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@mui/material';
import {carouselStyle, largeText, paperStyle, popularImg, smallText, textOverlay} from "./styles/MainStyles";


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
                    key={`indicator-${i}`}
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
                {destinationChunks.map((chunk, chunkIndex) => (
                    <div key={`chunk-${chunkIndex}`}>
                        {chunk.map((destination, destinationIndex) => (
                            <Paper
                                key={destination.id ? `chunk-${chunkIndex}-destination-${destination.id}` : `chunk-${chunkIndex}-destinationIndex-${destinationIndex}`}
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

/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from "@emotion/react";
import busan from '../../../images/haeundae.jpg';
import jeju from '../../../images/forest-jeju.jpg';
import yeosu from '../../../images/yeosu.jpg';
import gyeongju from '../../../images/gyeongju.jpg';
import seoul from '../../../images/seoul.jpg';
import gangneung from '../../../images/gangneung.jpg';
import Modal from "../Modal/Modal";
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const destinations = [
    {
        id: 1,
        image: jeju,
        alt: "제주도",
        title: "제주도 산림욕",
    },
    {
        id: 2,
        image: yeosu,
        alt: "여수",
        title: "여수 해수욕장",
    },
    {
        id: 3,
        image: busan,
        alt: "부산",
        title: "부산 해운대 해수욕장",
    },
    {
        id: 4,
        image: gyeongju,
        alt: "경주",
        title: "경주 동궁과 월지",
    },
    {
        id: 5,
        image: seoul,
        alt: "서울",
        title: "서울 남산타워",
    },
    {
        id: 6,
        image: gangneung,
        alt: "강릉",
        title: "강릉 경포대 해수욕장",
    },
    {
        id: 7,
        image: gyeongju,
        alt: "경주",
        title: "경주 동궁과 월지",
    },
    {
        id: 8,
        image: seoul,
        alt: "서울",
        title: "서울 남산타워",
    },
    {
        id: 9,
        image: gangneung,
        alt: "강릉",
        title: "강릉 경포대 해수욕장",
    },
];

const carouselStyle = css`
  width: 100%;
`;

const paperStyle = css`
  position: relative;
  width: calc(100% / 3);
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
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  color: white;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;




const PopularDestinations = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const itemPerSlide = 3;
    const destinationChunks = [];

    for (let i = 0; i < destinations.length; i += itemPerSlide) {
        destinationChunks.push(destinations.slice(i, i + itemPerSlide));
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
                                <img css={popularImg} src={destination.image} alt={destination.alt} />
                                <div css={textOverlay}>{destination.title}</div>
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

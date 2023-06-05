/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@mui/material';
import {carouselStyle, largeText, paperStyle, popularImg, smallText, textOverlay} from "./styles/MainStyles";
import {useQuery} from "react-query";
import axios from "axios";


const PopularDestinations = ({ destination }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [ popularRegions, setPopularRegions ] = useState([]);
    const defaultDestinations = ['제주', '여수', '부산', '경주', '서울', '강릉', '울릉', '거제', '인천'];
    const itemPerSlide = 3;
    const destinationChunks = [];

    const popularLocationData = useQuery(['popularLocationData'], async () => {
        try {
            const response = await axios.get('http://localhost:8080/locations/popular');
            return response
        }catch (error) {
            alert('Error getting')
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                const newPopularRegions = response.data.map(item => ({regionNames: item.regionName,  travelCount: item.travelCount}));
                setPopularRegions(newPopularRegions);
            }
        }
    });

    // popularRegions에 데이터가 있는 경우
    if (popularRegions.length > 0) {
        for (let i = 0; i < popularRegions.length; i += itemPerSlide) {
            const chunk = popularRegions.slice(i, i + itemPerSlide);
            const filterData = destination.filter(data => chunk.some(item => item.regionNames === data.regionName));
            destinationChunks.push(filterData);
        }
    }
// popularRegions에 데이터가 없는 경우
    else {
        for (let i = 0; i < defaultDestinations.length; i += itemPerSlide) {
            const chunk = defaultDestinations.slice(i, i + itemPerSlide);
            const filterData = destination.filter(data => chunk.some(item => item === data.regionName));
            destinationChunks.push(filterData);
        }
    }

    // for (let i = 0; i < popularRegions.length; i += itemPerSlide) {
    //     const chunk = popularRegions.slice(i, i + itemPerSlide);
    //     const filterData = destination.filter(data => chunk.some(item => item.regionNames === data.regionName));
    //     destinationChunks.push(filterData);
    // }

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

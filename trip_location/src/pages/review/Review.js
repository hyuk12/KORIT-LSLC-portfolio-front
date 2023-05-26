/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from "@emotion/react";
import Carousel from "react-material-ui-carousel";
import {useQuery} from "react-query";
import axios from "axios";
import {useSearchParams} from "react-router-dom";

const { kakao } = window;

const reviewContainer = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 100px;
  width: 1920px;
  height: 862px;
  
`;

const mapContainer = css`
  border: 1px solid #dbdbdb;
  width: 500px;
  height: 100%;
`;

const contentsContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid #dbdbdb;
  width: 900px;
  height: 100%;
`;

const contentsHeader = css`
  border: 1px solid #dbdbdb;
  height: 7%;
  width: 100%;
`;

const mainContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
`;

const imgContainer = css`
  border: 1px solid #dbdbdb;
  width: 100%;
  height: 30%;
`;

const reviewArticle = css`
  margin-top: 20px;
  border: 1px solid #dbdbdb;
  width: 100%;
  height: 60%;

`;

const Review = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const reviewImg = [];
    const itemPerSlide = 1;
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

    // for (let i = 0; i < popularRegions.length; i += itemPerSlide) {
    //     const chunk = popularRegions.slice(i, i + itemPerSlide);
    //     reviewImg.push(filterData);
    // }

    const reviewData = useQuery(['reviewData'], async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/review/${searchParams.get('reviewId')}`)
            return response;
        }catch (error) {

        }
    }, {

    })
    return (
        <div css={reviewContainer}>
            <div css={mapContainer}>
                <button disabled>1일차</button>
                <button disabled>2일차</button>
                <div>
                    맵
                </div>
                <div>location</div>
            </div>
            <div css={contentsContainer}>
                <header css={contentsHeader}>
                    <h2>title</h2>
                </header>
                <main css={mainContainer}>
                    <div css={imgContainer}>
                        {/*<Carousel*/}
                        {/*    autoPlay={false}*/}
                        {/*    swipe={true}*/}
                        {/*    indicators={createIndicators(destinationChunks.length)}*/}
                        {/*    cycleNavigation={true}*/}
                        {/*    animation={"slide"}*/}
                        {/*    css={carouselStyle}*/}
                        {/*    setActiveIndex={setActiveIndex}*/}
                        {/*    activeIndex={activeIndex}*/}
                        {/*></Carousel>*/}
                    </div>
                    <div css={reviewArticle}>
                        글쓴거
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Review;
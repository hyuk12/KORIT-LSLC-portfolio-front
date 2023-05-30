/** @jsxImportSource @emotion/react */
import React, {useEffect, useMemo, useState} from 'react';
import { css } from "@emotion/react";
import {Container, Paper, Typography} from '@mui/material';
import cityNight from '../images/city_night.jpg';
import building from '../images/building.jpg';
import PopularDestinations from '../components/contents/main/PopularDestinations';
import styled from "@emotion/styled";
import LocationCard from "../components/contents/main/LocationCard";
import { useQuery } from 'react-query';
import axios from 'axios';
import PopularReviewList from "../components/contents/main/PopularReviewList";


const MainWrapper = styled.main`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
`;

const SectionWrapper = styled.div`
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 100px;
  min-height: 100vh;
  width: 100%;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgba(128, 128, 128, 0.8);
  color: #fff;
  margin: 20px auto;
  border: none;
  min-width: 80%;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
`;

const StyleTitleTypography = styled(Typography)`
  margin-top: 40px;
  margin-bottom: 10px;
  text-align: center;
`;

const StyleSubTitleTypography = styled(Typography)`
  margin-bottom: 30px;
  color: #808080;
  text-align: center;
`;

const footerContainer = css`
    height: 300px;
`;


const Home = () => {

    const images = useMemo(() => [cityNight, building], []);
    const [ regions, setRegions ] = useState([
        {
            destination : ''
        }
    ]);

    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => {
                const currentIndex = images.indexOf(prevImage);
                return images[(currentIndex + 1) % images.length];
            });
        }, 5000); // 이미지 변경 시간 5초
        return () => {
            clearInterval(interval);
        };
    }, [images]);

    const cardData = useQuery(['cardData'], async () => {
        const response = await axios.get('http://localhost:8080/post');
        console.log(response)
        return response.data;
    }, );

    const { data: destination, isLoading } = cardData;

    if (isLoading) {
        return (<div>is Loading...</div>)
    }

    return (
        <MainWrapper>
            <SectionWrapper>
                <StyledPaper elevation={0} style={{ backgroundImage: `url(${currentImage})` }} />
            </SectionWrapper>
            <SectionWrapper>
                <Container>
                    <StyleTitleTypography  variant="h4" component="h2">
                        최신 후기
                    </StyleTitleTypography>
                    <StyleSubTitleTypography variant="subtitle1" component="p">
                        POPULAR REVIEW
                    </StyleSubTitleTypography>
                    <PopularReviewList destination={destination} />
                </Container>
            </SectionWrapper>
            <SectionWrapper>
                <Container>
                    <StyleTitleTypography  variant="h4" component="h2">
                        인기 여행지
                    </StyleTitleTypography>
                    <StyleSubTitleTypography variant="subtitle1" component="p">
                        POPULAR DESTINATIONS
                    </StyleSubTitleTypography>
                    <PopularDestinations destination={destination} />
                </Container>
            </SectionWrapper>
            <SectionWrapper>
                <StyleTitleTypography  variant="h4" component="h2">
                    어디로 여행을 떠나시나요?
                </StyleTitleTypography>
                <StyleSubTitleTypography variant="subtitle1" component="p">
                    여행지를 검색하거나 목록에서 직접 선택해주세요.
                </StyleSubTitleTypography>
                <LocationCard destination={destination}/>
                <footer css={footerContainer} />
            </SectionWrapper>

        </MainWrapper>
    );
};

export default Home;

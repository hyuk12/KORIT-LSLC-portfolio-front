/** @jsxImportSource @emotion/react */
import React, {useEffect, useMemo, useState} from 'react';
import {Container} from '@mui/material';
import cityNight from '../images/city_night.jpg';
import building from '../images/building.jpg';
import PopularDestinations from '../components/contents/main/PopularDestinations';
import LocationCard from "../components/contents/main/LocationCard";
import {useQuery} from 'react-query';
import axios from 'axios';
import PopularReviewList from "../components/contents/main/PopularReviewList";
import {
    footerContainer,
    MainWrapper,
    SectionWrapper,
    StyledPaper,
    StyleSubTitleTypography,
    StyleTitleTypography
} from "./styles/HomeAndMyPageStyles";


const Home = () => {

    const images = useMemo(() => [cityNight, building], []);
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
                        LATEST REVIEWS
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

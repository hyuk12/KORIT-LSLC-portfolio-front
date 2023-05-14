import React, {useEffect, useMemo, useState} from 'react';
import {Container, Grid, Paper, TextField, Typography} from '@mui/material';
import {css} from '@emotion/react';
import cityNight from '../images/city_night.jpg';
import building from '../images/building.jpg';
import SearchIcon from '@mui/icons-material/Search';
import PopularDestinations from '../components/contents/main/PopularDestinations';
import styled from "@emotion/styled";
import LocationCard from "../components/contents/main/LocationCard";
import {useRecoilState} from "recoil";
import {authenticatedState} from "../atoms/Auth/AuthAtoms";


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

const Home = () => {
    const [authState, setAuthState] = useRecoilState(authenticatedState);
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

    return (
        <MainWrapper>
            <SectionWrapper>
                <StyledPaper elevation={0} style={{ backgroundImage: `url(${currentImage})` }} />
            </SectionWrapper>
            <SectionWrapper>
                <Container>
                    <StyleTitleTypography  variant="h4" component="h2">
                        인기 여행지
                    </StyleTitleTypography>
                    <StyleSubTitleTypography variant="subtitle1" component="p">
                        POPULAR DESTINATIONS
                    </StyleSubTitleTypography>
                    <PopularDestinations />
                </Container>
            </SectionWrapper>
            <SectionWrapper>
                <StyleTitleTypography  variant="h4" component="h2">
                    어디로 여행을 떠나시나요?
                </StyleTitleTypography>
                <StyleSubTitleTypography variant="subtitle1" component="p">
                    여행지를 검색하거나 목록에서 직접 선택해주세요.
                </StyleSubTitleTypography>
                <LocationCard/>
            </SectionWrapper>
            <SectionWrapper>
                <footer>

                </footer>
            </SectionWrapper>

        </MainWrapper>
    );
};

export default Home;

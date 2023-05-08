import React, {useEffect, useMemo, useState} from 'react';
import {Container, Grid, Paper, TextField, Typography} from '@mui/material';
import {css} from '@emotion/react';
import cityNight from '../images/city_night.jpg';
import building from '../images/building.jpg';
import SearchIcon from '@mui/icons-material/Search';
import PopularDestinations from '../components/contents/main/PopularDestinations';
import Nav from "../components/Nav/Nav";
import styled from "@emotion/styled";
import LocationCard from "../components/contents/main/LocationCard";
import busan from '../images/haeundae.jpg';
import jeju from '../images/forest-jeju.jpg';
import yeosu from '../images/yeosu.jpg';
import gyeongju from '../images/gyeongju.jpg';

const cardData = [
    {
        image: jeju,
        title: 'Jeju',
        description: '제주도',
    },
    {
        image: busan,
        title: 'Busan',
        description: '부산',
    },
    {
        image: yeosu,
        title: 'Yeosu',
        description: '여수',
    },
    {
        image: gyeongju,
        title: 'Gyeongju',
        description: '경주',
    },
    {
        image: jeju,
        title: 'Jeju',
        description: '제주도',
    },
    {
        image: busan,
        title: 'Busan',
        description: '부산',
    },
    {
        image: yeosu,
        title: 'Yeosu',
        description: '여수',
    },
    {
        image: gyeongju,
        title: 'Gyeongju',
        description: '경주',
    },
    // ... 추가 카드 데이터
];

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

const contents = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
  min-width: 80%;
`;

const searchContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const searchField = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
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

const StyleInput = styled(TextField)`
  margin-bottom: 50px;
  width: 100%;
`;

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
                <Container>
                    <div css={searchContainer}>
                        <StyleTitleTypography  variant="h4" component="h2">
                            어디로 여행을 떠나시나요?
                        </StyleTitleTypography>
                        <StyleSubTitleTypography variant="subtitle1" component="p">
                            여행지를 검색하거나 목록에서 직접 선택해주세요.
                        </StyleSubTitleTypography>
                        <Grid container justifyContent="center" alignItems="center" css={searchField}>
                            <Grid item xs={12} sm={8} md={6} lg={4}>
                                <StyleInput
                                    placeholder="여행지 검색"
                                    InputProps={{
                                        startAdornment: <SearchIcon />,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container spacing={4} css={contents}>
                        {cardData.map((data, index) => (
                            <Grid key={index} item xs={12} sm={6} md={3}>
                                <LocationCard
                                    image={data.image}
                                    title={data.title}
                                    description={data.description}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </SectionWrapper>
        </MainWrapper>
    );
};

export default Home;

/** @jsxImportSource @emotion/react */
import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, TextField, Typography} from '@mui/material';
import Modal from "../Modal/Modal";
import React, {useState} from "react";
import jeju from "../../../images/forest-jeju.jpg";
import busan from "../../../images/haeundae.jpg";
import yeosu from "../../../images/yeosu.jpg";
import gyeongju from "../../../images/gyeongju.jpg";
import gangneung from "../../../images/gangneung.jpg";
import seoul from "../../../images/seoul.jpg";
import yongin from "../../../images/yongin.jpg";
import seosan from "../../../images/seosan.jpg";
import jeonju from "../../../images/jeonju.jpg";
import ulsan from "../../../images/ulsan.jpg";
import mokpo from "../../../images/mokpo.jpg";
import suncheon from "../../../images/suncheon.jpg";
import {css} from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

const cardData = [
    {
        image: jeju,
        title: '제주도',
        description: 'Jeju',
    },
    {
        image: busan,
        title: '부산',
        description: 'Busan',
    },
    {
        image: yeosu,
        title: '여수',
        description: 'Yeosu',
    },
    {
        image: gyeongju,
        title: '경주',
        description: 'Gyeongju',
    },
    {
        image: gangneung,
        title: '강릉',
        description: 'Gangneung',
    },
    {
        image: seoul,
        title: '서울',
        description: 'Seoul',
    },
    {
        image: yongin,
        title: '용인',
        description: 'Yongin',
    },
    {
        image: seosan,
        title: '서산',
        description: 'Seosan',
    },
    {
        image: jeonju,
        title: '전주',
        description: 'Jeonju',
    },
    {
        image: ulsan,
        title: '울산',
        description: 'Ulsan',
    },
    {
        image: mokpo,
        title: '목포',
        description: 'Mokpo',
    },
    {
        image: suncheon,
        title: '순천',
        description: 'Suncheon',
    },
    // ... 추가 카드 데이터
];

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

const StyleInput = styled(TextField)`
  margin-bottom: 50px;
  width: 100%;
`;

const searchField = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const LocationCard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    const filterData = cardData.filter((data) => data.title.includes(searchKeyword) || data.description.toLowerCase().includes(searchKeyword));

    const handleCardClick = (location) => {
        setSelectedLocation(location);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Container>

            <div css={searchContainer}>

                <Grid container justifyContent="center" alignItems="center" css={searchField}>
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <StyleInput
                            placeholder="여행지 검색"
                            InputProps={{ startAdornment: <SearchIcon /> }} 
                            onChange={(e) => setSearchKeyword(e.target.value)} 
                        />
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={4} css={contents}>
                {/* {cardData.map((data, index) => ( */}
                {filterData.map((data, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3}>
                        <Card onClick={() => handleCardClick(data)}>

                            <CardActionArea >
                                <CardMedia
                                    component="img"
                                    alt={data.title}
                                    height="140"
                                    image={data.image}
                                    title={data.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {data.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {data.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal isOpen={modalOpen} onClose={handleCloseModal} destination={selectedLocation} />
        </Container>

    );
};

export default LocationCard;
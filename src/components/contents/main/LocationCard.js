/** @jsxImportSource @emotion/react */
import SearchIcon from "@mui/icons-material/Search";
import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography} from '@mui/material';
import React, {useState} from "react";
import Modal from "../Modal/Modal";
import {contents, searchContainer, searchField, StyleInput} from "./styles/MainStyles";


const LocationCard = ({ destination }) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ selectedLocation, setSelectedLocation ] = useState(null);
    const [ searchKeyword, setSearchKeyword ] = useState('');

    const filterData = destination.filter((data) => data.regionName.includes(searchKeyword) ||
                                                        data.regionEngName.toLowerCase().includes(searchKeyword));

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
                {filterData.map((data, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3}>
                        <Card onClick={() => handleCardClick(data)}>

                            <CardActionArea >
                                <CardMedia
                                    component="img"
                                    alt={data.regionName}
                                    height="140"
                                    image={data.regionImgUrl}
                                    title={data.regionName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {data.regionName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {data.regionEngName}
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
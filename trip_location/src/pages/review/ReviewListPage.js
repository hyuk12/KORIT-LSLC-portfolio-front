/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, TextField, Typography} from '@mui/material';
import React, {useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const ReviewListPage = () => {
    const navigate = useNavigate();
    const [ review, setReview ] = useState([]);

    const reviewList = useQuery(['list'], async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/review/list/all');
            console.log(response.data);
            return response
        }catch (error) {
            console.error('Failed to fetch reviews', error);
        }
    }, {
        onSuccess: (response) => {

            setReview([...response.data]);
        }
    })



    const handleCardClick = (reviewId, travelId) => {
        navigate(`/review/list/detail?id=${travelId}&reviewId=${reviewId}`)
    };


    return (
        <Container>

            <div css={searchContainer}>

                <Grid container justifyContent="center" alignItems="center" css={searchField}>
                    <Grid item xs={12} sm={8} md={6} lg={4}>

                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={4} css={contents}>
                {review.map((data, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3}>
                        <Card onClick={() => handleCardClick(data.reviewId,data.travelId)}>

                            <CardActionArea>
                                {data.reviewImgUrl ? (
                                    <CardMedia
                                        component="img"
                                        alt={data.regionName}
                                        height="140"
                                        image={data.reviewImgUrl}
                                        title={data.regionName}
                                    />
                                ) : (
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {data.regionName}
                                        </Typography>
                                    </CardContent>
                                )}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {data.regionName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {data.regionName}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>

    );
};


export default ReviewListPage;
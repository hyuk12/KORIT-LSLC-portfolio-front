/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import busan from '../../images/busan_night.jpg'
import { useQuery } from "react-query";
import axios from "axios";



const contents = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
  min-width: 80%;
`;

const cardTitleContainer = css`
    display: flex;
    justify-content: space-between;
`;

const ratingStyle = css`
    font-size: 14px;
`;

const MyReviewList = () => {
    const [ userInfo, setUserInfo ] = useState({
        userId: ''
    });
    const [ reviewData, setReviewData ] = useState({
            reviewRating: '',
            regionName: '',
            startDate: '',
            endDate: '',
            reviewImgUrl: ''
    })

    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', { params: { accessToken } });
        return response;
    }, {
        onSuccess : (response) => {
            setUserInfo({
                userId: response.data.userId
            })
        }
    });

    const review = useQuery(['review'], async () => {
        try {
            const userId = parseInt(userInfo.userId);
            const option = {
                headers : {
                    'Authorization' : `${localStorage.getItem('accessToken')}`
                }
            } 
            const response = await axios.get(`http://localhost:8080/api/v1/user/${userId}/review`, option)
            console.log(response.data.data)
            return response;
        } catch (error) {
            return error;
        }
    }, {
        onSuccess : (response) => {
            setReviewData({
                reviewRating: response.data.data.reviewRating,
                regionName: response.data.data.regionName,
                startDate: response.data.data.startDate,
                endDate: response.data.data.endDate,
                reviewImgUrl: response.data.data.reviewImgUrl
            })
        }
    });



    return (
        <div>
            MyReviewList
            <Grid container css={contents}>
                <Grid>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component='img'
                                alt={busan}
                                height='140'
                                image={busan}
                                title='부산'
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" css={cardTitleContainer}>
                                    부산
                                    <Rating name="read-only" value='4' readOnly css={ratingStyle}/>
                                </Typography>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    05.30 ~ 06.03 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default MyReviewList;
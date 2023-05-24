/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const cardContainer =css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    width: 300px;
    height: 300px;
    `;
const cardImgContainer =css`
    border: 1px solid #dbdbdb;
    overflow: hidden;
    width: 100%;
    height: 200px;
    
    `;
const cardMain =css`
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #dbdbdb;
    width: 100%;
    height: 100px;
    
    `;

const travelTitle =css`
    display: flex;
    align-items: center;
    border: 1px solid #dbdbdb;
    width: 50px;
`;
const travelText=css`
    display: flex;
    flex-direction: column;
`;

const TravelList = ({}) => {
    const [userInfo, setUserInfo] = useState({
        userId:'',
        name:'',
    });
    const [myTravelList, setMyTravelList] = useState([
        {
            travelId: '',
            scheduleDate: [],
        },
    ]);

    const [regionInfo, setRegionInfo] = useState({
            regionName:'',
    });
    const [schedules, setSchedules] = useState([]);
    const [allTravelList, setAllTravelList] = useState([]);

    const principal = useQuery(['principal'], async () => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: {accessToken}});
        return response;
    }, {
        onSuccess: (response) => {
            setUserInfo({
                userId: response.data.userId,
                name: response.data.name,
            });
        }
    })

    // console.log(userInfo);

    const travelList = useQuery(['travelList'], async () => {
        const params = {
            userId: userInfo.userId !== '' ? parseInt(userInfo.userId) : 0
          }          
        const option = {
            params: params,
            headers: {
                Authorization: `${localStorage.getItem('accessToken')}`
            }
        }
        try {
            const response = await axios.get('http://localhost:8080/api/v1/travel/plan/list',option)
            // console.log(response);
            return response;
        }catch (error) {
            alert('여행 일정이 없습니다.')
            return error;
        }
    }, {
        onSuccess: (response) => {
            setAllTravelList([...response.data]);
        }
    })

    const regionImg = useQuery(['regionImg'], async()=>{
        const params = {
            travelname: regionInfo.regionName
        }
        const option = {
            params: params,
            headers:{
                Authorzation : `${localStorage.getItem('accessToken')}`
            }
        }
        const response = await axios.get('http://localhost:8080/api/v1/travel/plan/region', option);
        return response;
    })
    
    useEffect(() => {
        setUserInfo(userInfo);
        setAllTravelList(allTravelList);
        const extractedSchedules = allTravelList.map((schedule) => schedule.schedules);
        setSchedules(extractedSchedules);
        // const scheduleLocation = schedules.map((location)=>location.locations.addr[0]);
        
    }, [userInfo,allTravelList, allTravelList]);
          
    
    console.log(allTravelList);
    console.log(regionInfo);
    console.log(schedules);
    return (
        <div css={cardContainer}>
            <div css={cardImgContainer}>이미지
                {/* <img src={} alt={}> region에서 이미지 가져옴*/}
            </div>
            <div css={cardMain}>
                <div css={travelTitle}>
                    제주도
                </div>
                <div css={travelText}>
                    <div>{userInfo.name}</div>
                    <div>ㅁㅁㅁ</div>
                    <div>일정</div>
                </div>
            </div>
            {/* <Grid container spacing={4} css={contents}>
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
            </Grid> */}
        </div>
    );
};

export default TravelList;
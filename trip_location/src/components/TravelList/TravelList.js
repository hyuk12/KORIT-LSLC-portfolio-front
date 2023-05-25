/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
const regionImgCss = css`
    
    width: 100%;
    height: 100%;
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

const TravelList = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        userId:'',
        name:'',
    });
    const [regionInfo, setRegionInfo] = useState({
        regionName:'',
        regionImgURL:'',
    })
    const [myTravelList, setMyTravelList] = useState([
        {
            travelId: '',
            scheduleDate: [],
            travelName:'',
            travleImgUrl:'',
        },
    ]);
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

    const travelList = useQuery(['travelList'], async () => {
        const params = {
            userId: userInfo.userId !== '' ? parseInt(userInfo.userId) : 0
          }          
        const option = {
            params,
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


    const selectTravelName = myTravelList.map((item)=>item.travelName);
    console.log(selectTravelName);

    const regionImg = useQuery(['region'], async () => {
            const params = {
            //   travelName: encodeURIComponent(travel.travelName)//encodeURIComponent(한글) 한글깨짐현상을
              travelName: selectTravelName[0] //encodeURIComponent(한글) 한글깨짐현상을
            };
            const option = {
              params,
              headers: {
                Authorization: `${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data'
              }
            };
            try {
              const response = await axios.get('http://localhost:8080/api/v1/travel/plan/region', option);
              return response;

            } catch (error) {
              return error;
            }

        },{
            onSuccess:(response)=>{
                setRegionInfo({
                    regionName: response.data.data.regionName,
                    regionImgURL: response.data.data.regionImgUrl
                });
            }
    });
    
      
    
    useEffect(() => {
        setUserInfo(userInfo);
        setAllTravelList(allTravelList);
      
        const extractedMyTravelList = allTravelList.map((item) => {
          const firstLocation = item.schedules[0].locations[0];
          const travelName = firstLocation && firstLocation.addr ? firstLocation.addr : getNextAddress(item.schedules);
          return {
            travelId: item.travelId,
            scheduleDate: item.schedules.map((schedule) => schedule.scheduleDate),
            travelName: travelName,
          };
        });
        setMyTravelList(extractedMyTravelList);
      
        const extractedSchedules = allTravelList.map((item) => item.schedules);
        setSchedules(extractedSchedules);
      
    }, [userInfo, allTravelList]);
      
    const getNextAddress = (schedules) => {
        for (let i = 1; i < schedules.length; i++) {
          const firstLocation = schedules[i].locations[0];
          if (firstLocation && firstLocation.addr) {
            return firstLocation.addr;
          }
        }
        return ''; 
    };
    
    console.log(allTravelList);
    console.log(schedules);
    console.log(myTravelList);
    console.log(regionInfo);

    const myPlanClickHandler =()=>{
        navigate(`/user/${userInfo.userId}/trip?id=${myTravelList[0].travelId}`)
    }


    return (
        <Container>
            <Grid container spacing={4} >
                {myTravelList.map((data, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                        <Card sx={{ minWidth: 250 , minHeight:250}}>
                            <CardActionArea >
                                <CardMedia
                                    component="img"
                                    alt={regionInfo.regionImgURL}
                                    height="140"
                                    image={regionInfo.regionImgURL}
                                    title={regionInfo.regionName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {regionInfo.regionName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {`${data.scheduleDate[0]} ~ ${data.scheduleDate[data.scheduleDate.length - 1]}`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Write
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TravelList;
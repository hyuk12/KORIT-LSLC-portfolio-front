import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {useRecoilValue} from "recoil";
import {authenticationState} from "../../store/atoms/AuthAtoms";


const TravelList = ({ setCount, userInfo }) => {
    const navigate = useNavigate();
    const [regionInfo, setRegionInfo] = useState([
        {   
            regionId: '',
            regionName:'',
            regionImgUrl:'',
        }
    ])

    const [myTravelList, setMyTravelList] = useState([
        {
            travelId: '',
            scheduleDate: [],
            travelName:'',
        },
    ]);
    const [schedules, setSchedules] = useState([]);
    const [allTravelList, setAllTravelList] = useState([]);

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
            setCount(response.data.length);
        }
    })

    useEffect(() => {
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

        const regionInfoList = allTravelList.map((item) => ({
            regionId: item.regions[0].regionId,
            regionName: item.regions[0].regionName, 
            regionImgUrl: item.regions[0].regionImgUrl, 
        }));
        setRegionInfo(regionInfoList);

    }, [allTravelList]);
    
    const getNextAddress = (schedules) => {
        for (let i = 1; i < schedules.length; i++) {
          const firstLocation = schedules[i].locations[0];
          if (firstLocation && firstLocation.addr) {
            return firstLocation.addr;
          }
        }
        return ''; 
    };

    const myPlanClickHandler =(travelId)=>{


        navigate(`/user/trip?userId=${userInfo.userId}&id=${travelId}`)
    }

    return (
        <Container>
            <Grid container spacing={4} >
                {myTravelList.map((data, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} onClick={()=> myPlanClickHandler(data.travelId)}>
                        <Card sx={{ minWidth: 250 , minHeight:250}}>
                            <CardActionArea >
                                <CardMedia
                                    component="img"
                                    alt={regionInfo[index].regionImgUrl}
                                    height="140"
                                    image={regionInfo[index].regionImgUrl}
                                    title={regionInfo[index].regionImgUrl}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {regionInfo[index].regionName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {`${data.scheduleDate[0]} ~ ${data.scheduleDate[data.scheduleDate.length - 1]}`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" >
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
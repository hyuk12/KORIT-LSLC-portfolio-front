import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
//import dayjs from 'dayjs';
import React from 'react';
import dayjs from "dayjs";
import {useMutation} from "react-query";
import axios from "axios";

const TravelList = ({ userInfo, myTravelList, regionInfo, reviewDataList }) => {
    const navigate = useNavigate();

    const deletePlan = useMutation(async (travelId) => {
        try {
            const option = {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axios.delete(`http://43.202.21.26/api/v1/travel/plan/${travelId}`, option);

            return response
        }catch (error) {

        }
    }, {
        onSuccess: (response) => {
            if(response.status === 200) {
                // navigate(`/user/${userInfo.userId}`);
                window.location.reload();
            }
        }
    })
    
    const myPlanClickHandler =(travelId)=>{
        navigate(`/user/trip?userId=${userInfo.userId}&id=${travelId}`)
    }
    
    const moveReviewClickHandler =(travelId)=>{
        navigate(`/user/review/write?userId=${userInfo.userId}&id=${travelId}`)
    }
    
    const removeReviewClickHandler =(travelId)=>{
        if(window.confirm('여행 일정을 삭제하시겠습니까?')) {
            deletePlan.mutate(travelId);
        }else {

        }
    }

    const isReviewWritten = (travelId) => {
        const review = reviewDataList.find((review) => review.travelId === travelId);
        return review && review.reviewId;
      };
    
    return (
        <Container>
            <Grid container spacing={4} >
                {myTravelList.map((data, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} sx={{ minWidth: 300}}>
                        <Card sx={{ minWidth: 250, minHeight:250}}>
                            <CardActionArea sx={{ minheight: 250 }} onClick={()=> myPlanClickHandler(data.travelId)}>
                                <CardMedia
                                    component="img"
                                    alt={regionInfo[index].regionImgUrl}
                                    sx={{ height: 140 }}
                                    image={regionInfo[index].regionImgUrl}
                                    title={regionInfo[index].regionImgUrl}
                                />
                                <CardContent sx={{ height: 80 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {regionInfo[index].regionName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {`${data.scheduleDate[0]} ~ ${data.scheduleDate[data.scheduleDate.length - 1]}`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {dayjs().isBefore(data.scheduleDate[0]) ? (
                                <CardActions sx={{ minWidth: 150}}>
                                    <Typography variant="body3" color="textSecondary" component="p">
                                        일정시작 전
                                    </Typography>
                                    <Button sx={{ height: 20 }} size="small" color="primary" onClick={() => removeReviewClickHandler(data.travelId)}>
                                        일정삭제
                                    </Button>
                                </CardActions>
                            ) : (dayjs().isAfter(data.scheduleDate[data.scheduleDate.length - 1]) ? ( 
                                <CardActions sx={{ minWidth: 100}}>
                                    {isReviewWritten(data.travelId) ? (
                                    <Typography variant="body3" color="textSecondary" component="p">
                                        리뷰 작성 완료
                                    </Typography>
                                    ) : (
                                    <Button sx={{ height: 20 }} size="small" color="primary" onClick={() => moveReviewClickHandler(data.travelId)}>
                                        리뷰 쓰기
                                    </Button>
                                    )}
                                </CardActions>
                            ) : (
                                <CardActions sx={{ minWidth: 100}}>
                                    <Typography variant="body3" color="textSecondary" component="p">
                                        일정 진행중
                                    </Typography>
                                </CardActions>
                            ))}

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TravelList;
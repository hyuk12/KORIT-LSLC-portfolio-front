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
import React from 'react';
import {useNavigate} from "react-router-dom";


const TravelList = ({ userInfo, myTravelList, regionInfo  }) => {
    const navigate = useNavigate();

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
    /** @jsxImportSource @emotion/react */
    import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography} from '@mui/material';
    import React, {useEffect, useState} from "react";
    import {useQuery} from "react-query";
    import axios from "axios";
    import {useNavigate} from "react-router-dom";
    import {
    contents,
    searchContainer,
    searchField,
        sortingButtonGroupStyle,
    sortingButtonStyle
} from "./styles/ReivewStyles";
    import {StyleInput} from "../../components/contents/main/styles/MainStyles";
    import SearchIcon from "@mui/icons-material/Search";


    const ReviewListPage = () => {
        const navigate = useNavigate();
        const [ review, setReview ] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [sortType, setSortType] = useState(''); // '' | 'rating' | 'reviewIdHigh' | 'reviewIdLow'

        useEffect(() => {
            let sortedReviews = [...review];
            if (sortType === 'rating') {
                sortedReviews.sort((a, b) => b.reviewRating - a.reviewRating);
            } else if (sortType === 'reviewIdHigh') {
                sortedReviews.sort((a, b) => b.reviewId - a.reviewId);
            } else if (sortType === 'reviewIdLow') {
                sortedReviews.sort((a, b) => a.reviewId - b.reviewId);
            }
            setReview(sortedReviews);
        }, [sortType]);




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

        const handleSearch = (event) => {
            setSearchTerm(event.target.value);
        };

        const filteredReviews = review.filter(review =>
            review.reviewTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const handleCardClick = (reviewId, travelId) => {
            navigate(`/review/list/detail?id=${travelId}&reviewId=${reviewId}`)
        };

        return (
            <Container>
                <div css={searchContainer}>
                    <Grid container justifyContent="center" alignItems="center" css={searchField}>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <StyleInput
                                placeholder="여행기 검색"
                                InputProps={{ startAdornment: <SearchIcon /> }}
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div css={sortingButtonGroupStyle}>
                    <button css={sortingButtonStyle} onClick={() => setSortType('rating')}>평점 순</button>
                    <button css={sortingButtonStyle} onClick={() => setSortType('reviewIdHigh')}>최신 순</button>
                    <button css={sortingButtonStyle} onClick={() => setSortType('reviewIdLow')}>오래된 순</button>
                </div>
                <Grid container spacing={4} css={contents}>
                    {filteredReviews.map((data, index) => (
                        <Grid key={index} item xs={12} sm={6} md={3}>
                            <Card onClick={() => handleCardClick(data.reviewId,data.travelId)}>
                                <CardActionArea>
                                    {data.reviewImgUrl ? (
                                        <CardMedia
                                            component="img"
                                            alt={data.reviewTitle}
                                            height="140"
                                            image={data.reviewImgUrl}
                                            title={data.reviewTitle}
                                        />
                                    ) : (
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {data.reviewTitle}
                                            </Typography>
                                        </CardContent>
                                    )}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {data.reviewTitle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {data.reviewCreateDate}
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
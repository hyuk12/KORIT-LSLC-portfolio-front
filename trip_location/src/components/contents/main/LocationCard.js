import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';

const LocationCard = ({ image, title, description, onClick }) => {
    return (
        <Card>
            <CardActionArea onClick={onClick}>
                <CardMedia
                    component="img"
                    alt={title}
                    height="140"
                    image={image}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default LocationCard;
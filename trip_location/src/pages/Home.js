/** @jsxImportSource @emotion/react */
import React, {useEffect, useMemo, useState} from 'react';
import {Paper} from "@mui/material";
import {css} from "@emotion/react";
import cityNight from '../images/city_night.jpg';
import building from '../images/building.jpg';
import PopularDestinations from "../components/contents/main/PopularDestinations";

const paperStyle = css`
  display: flex;
  position: relative;
  background-color: rgba(128, 128, 128, 0.8);
  color: #fff;
  margin: 20px auto;
  border: none;
  min-width: 80%;
  height: 450px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${cityNight});
  object-fit: cover;
`;

const contents = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
  min-width: 80%;
`;

const Home = () => {
    const images = useMemo(() => [cityNight, building],[]);
    // eslint-disable-next-line no-unused-vars
    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => {
                const currentIndex = images.indexOf(prevImage);
                return images[(currentIndex + 1) % images.length];
            });
        }, 5000); // 이미지 변경 시간 5초
        return () => {
            clearInterval(interval);
        };
    }, [images]);

    return (
        <main>
            <Paper css={paperStyle} elevation={0} />
            <div css={contents}>
                <PopularDestinations />

            </div>
        </main>
    );
};

export default Home;
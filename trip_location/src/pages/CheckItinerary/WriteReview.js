/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const { kakao } = window;

  const viewContainer = css`
    display: flex;
    margin-top: 64px;
    width: 1920px;
    height: 862px;
  `;

  const mapContainer = css`
    flex-direction: column;
    border: 1px solid black;   
    padding-top: 64px;
    margin-left: 150px;
    margin-right: 20px;
    width: 500px;
  `;
  
  const mapMove = css`

  `;

  const map = css`
    margin: auto;
    width: 350px;
    height: 350px;
    border: 1px solid black;
  `;

  const locationList = css`
    margin: auto;
    width: 350px;
    height: 400px;
    border: 1px solid black;
    text-align: center;
  `;

  const reviewMove = css`
  
  `;

  const reviewContainer = css`
    border: 1px solid black;
    width: 1100px
  `;

  const titleAndSaveContainer = css`
    width: 100%;
    border: 1px solid black;
    padding: 10px;
  `;

  const reviewTitle = css`
    width: 500px;
    height: 80px;
    font-size: 30px;
  `;

  const saveButton = css`
    position: relative;
    align-items: center;
    top: 30px;
    left: 450px;

  `;

  const photoContainer = css`
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 300px;
    border: 1px solid black;
  `;
    
  const photoButton = css`
    width: 50px;
    height: 50px;
  `;
    
  const photo = css`
    justify-content: space-around;
    align-items: center;
    margin: 5px;
    border: 1px solid black;
    width: 300px;
    height: 100% ;
  `;

  const writeReviewContainer = css`
    padding: 10px;
  `;

  

const WriteReview = () => {

    return (
      <div css={viewContainer}>
        <div css={mapContainer}>
          <div css={mapMove}>
            <div css={map}>
              지도
            </div>
          </div>
          <div css={reviewMove}>
            <div css={locationList}>장소표시</div>
          </div>
        </div>
        <div css={reviewContainer}>
          <div css={titleAndSaveContainer}>
            <input css={reviewTitle} type="text" />
            <button css={saveButton}>리뷰 저장하기</button>
          </div>
            <div css={photoContainer}>
            <button css={photoButton}>사진 추가</button>
            <div css={photo}>사진</div>
            <div css={photo}>사진</div>
            <div css={photo}>사진</div>
            </div>
          <div>
            <textarea css={writeReviewContainer} name="" id="" cols="156" rows="27"></textarea>
  `       </div>
        </div>
      </div>
    );
};

export default WriteReview;


/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from "@emotion/react";


const reviewContainer = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 100px;
  margin-left: 200px;
  width: 80%;
  height: 862px;
  
`;

const mapContainer = css`
  border: 1px solid #dbdbdb;
  width: 500px;
  height: 100%;
`;

const contentsContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid #dbdbdb;
  width: 900px;
  height: 100%;
`;

const contentsHeader = css`
  border: 1px solid #dbdbdb;
  height: 7%;
  width: 100%;
`;

const mainContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
`;

const imgContainer = css`
  border: 1px solid #dbdbdb;
  width: 100%;
  height: 30%;
`;

const reviewArticle = css`
  margin-top: 20px;
  border: 1px solid #dbdbdb;
  width: 100%;
  height: 60%;

`;

const Review = () => {
    return (
        <div css={reviewContainer}>
            <div css={mapContainer}>
                <div>맵</div>
                <div>location</div>
            </div>
            <div css={contentsContainer}>
                <header css={contentsHeader}>
                    <h2>title</h2>
                </header>
                <main css={mainContainer}>
                    <div css={imgContainer}>
                        사진정보
                    </div>
                    <div css={reviewArticle}>
                        글쓴거
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Review;
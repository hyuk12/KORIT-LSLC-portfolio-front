/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import {Button, Paper, Typography} from "@mui/material";
import {css} from "@emotion/react";

export const MainWrapper = styled.main`
  scroll-snap-type: y mandatory;
  /* overflow-y: scroll; */
  height: 100vh;
`;

export const SectionWrapper = styled.div`
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 100px;
  min-height: 100vh;
  width: 100%;
`;

export const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgba(128, 128, 128, 0.8);
  color: #fff;
  margin: 20px auto;
  border: none;
  min-width: 80%;
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
`;

export const StyleTitleTypography = styled(Typography)`
  margin-top: 40px;
  margin-bottom: 10px;
  text-align: center;
`;

export const StyleSubTitleTypography = styled(Typography)`
  margin-bottom: 30px;
  color: #808080;
  text-align: center;
`;

export const footerContainer = css`
    height: 300px;
`;

export const container = css`
  display: flex;
  margin-top: 64px;
  width: 100%;
  height: 100vh;
`;

export const main = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const imgContainer = css`
  margin-bottom: 20px;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: rgba(0,0,0,0.8);
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

export const imgStyle = css`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const modifyButtons = css`

`;

export const ModifyButton = styled(Button)`
  margin: 20px 10px;
  border-radius: 0;
  width: 110px;
  background-color: #0BD0AF;
  color: #FFFFFF;
  font-weight: 600;

  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD;
  }
`;

export const mainContents = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  
`;

export const myPlanAndReview = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  border: 1px solid #dbdbdb;
  width: 40%;
  height: 100px;
  cursor: pointer;
`;

export const planAndReviewContainer =css`
  display: flex;
  align-content:flex-start; 
  flex-direction:column; 
  flex-wrap:wrap; 
  overflow:auto;
`;
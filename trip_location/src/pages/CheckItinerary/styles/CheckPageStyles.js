/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const viewContainer = css`
  display: flex;
  margin-top: 64px;
  width: 1920px;
  height: 862px;

`;

export const mapContainer = css`
  display: flex;
  flex-direction: column;  
  width: 100%;
  height: 100%;
    
`;

export const buttonContainer = css`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  width: 100%;
  height: 214px;
  
`;

export const resetButton= css`
  margin: 0 auto;

`;

export const buttonStyle = css`

  width: 150px;
  height: 50px;
`;

export const mainStyle = css`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
`;

export const tripLocationList = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 648px;

  border: 1px solid black;

  &::-webkit-scrollbar {
    width: 3px;
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #f8f7fb;
    opacity: .4;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }
  
`;

export const tripLocationItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 180px;
  border: 1px solid black;
`;

export const footerStyle = css`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: 214px;
`;

export const footerButtonContainer = css`

  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const buttonMove = css`
  height: 1px;
`;

export const scheduleButton = css`
    position: relative ;
    bottom: 65px;
    right: 50px;
    display: block; 
    height: 100px;
    line-height: 100px;
    
`;

export const mapList = css`
    margin: -50px 0px 0px 15px;
    right: 50px;
    width: 400px;
    height: 400px;
`;

export const locList = css`
    margin: 15px 0px 0px 15px;
    width: 400px;
    height: 400px;
    max-height: 400px;
    overflow-y: auto;
    padding-top: 40px;
    `;

export const myLocation = css`
  text-align: left;
  font-size: 22px;
  text-decoration: underline;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const reviewContainer = css`
    width: 1100px;
`;

export const titleAndSaveContainer = css`
    display: flex;
    margin-top: 64px;
    width: 100%;
    padding: 10px 10px 10px 0;
`;

export const reviewTitle = css`
    width: 500px;
    height: 80px;
    font-size: 30px;
`;

export const rating = css`
  position: relative;
  top: 30px;
  left: 250px;
`;

export const saveButton = css`
    position: relative;
    align-items: center;
    top: 30px;
    left: 400px;
    width: 100px;
    height: 50px;
`;

export const photoContainer = css`
    display: flex;
    align-items: center;
    margin: 15px 0 25px 0;
    padding: 10px;
    width: 100%;
    max-width: 1100px;
    height: 300px;
    overflow-x: auto;
    white-space: nowrap;
    border: 1px solid black;
    cursor: pointer;
`;

export const photo = css`
    justify-content: space-around;
    align-items: center;
    margin: 5px;
    border: 1px solid black;
    width: 300px;
    height: 100% ;
`;

export const writeReviewContainer = css`
  width: 100%;
  height: 350px;
  padding: 10px;
  font-size: 19px;
`;

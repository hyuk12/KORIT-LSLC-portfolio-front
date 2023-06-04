/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const viewContainer = css`
  display: flex;
  position: fixed;
  top: 64px;
  width: 100%;
  height: calc(100vh - 64px);

`;

export const mapContainer = css`
  display: flex;
  flex-direction: column;  
  width: 100%;
  height: 100%;
    
`;

export const ReviewMapContainer = css`
  flex-direction: column;
  margin: 100px 20px 0 150px;
  padding-top: 64px;
  border: 1px solid black;
  width: 600px;
    
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #2c2c2c2c;
  
`;

export const dayButtonStyle = css`
  width: 80px;
  height: 50px;
  margin: 3px 0px 3px 10px;

  border: none;

  background-color: #fdfdfdfd;

  cursor: pointer;
`;

export const selectedButtonStyle = css`
  background-color: #40D6BD;
  color: white;

  transition: all 0.3s;
  transform: scale(1.1);
  transform-origin: right;


`;

export const resetButton= css`
  margin: 0 auto;

`;

export const buttonStyle = css`
  width: 150px;
  height: 50px;

  border: none;
  background-color: #0BD0AF;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD;
  }
`;

export const mainStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 450px;
  height: 100%;
`;


export const tripLocationList = css`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;

  overflow: auto;

  margin-top: 20px;
  padding: 0px 20px;

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

export const scheduleDate = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 15px 0px;

  font-weight: 600;
  color: #555;
`;

export const itemContainer = css`
    width: 100%;
    height: 130px;
`;

export const tripLocationItem = css`
  display: flex;
  align-items: center;
  overflow: auto;

  margin: 10px 0px;
  width: 100%;
  height: 80px;
  border-radius: 5px;

  box-shadow: 5px 5px 15px #dbdbdbdb;

`;

export const indexStyle = css`
  width: 70px;
  margin-left: 10px;

  color: #0BD0AF;
  font-weight: 600;
  font-size: 14px;
`;

export const addressStyle = css`
  display: flex;
  align-items: center;
  height: 80px;
  width: 80%;

  padding: 0px 10px;

  font-size: 14px;

`;

export const itemIconStyle = css`
  display: flex;
  justify-content: center;
  color: #dbdbdbdb;
`;

export const footerStyle = css`
  display: flex;
  width: 100%;
  height: 100px;
  margin-top: 20px;
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

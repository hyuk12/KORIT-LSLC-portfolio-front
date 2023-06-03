/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const viewContainer = css`
  display: flex;
  margin-top: 64px;
  width: 1920px;
  height: 862px;
`;

export const mapContainer = css`
  flex-direction: column;
  padding-top: 64px;
  margin: 100px 20px 0px 150px;
  width: 600px;
  border: 1px solid black;
`;

export const mapMove = css`
  
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

export const reviewMove = css`
  
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

export const contents = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
  min-width: 80%;
`;

export const searchContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 20px;
`;

export const searchField = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const sortingButtonGroupStyle = css`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  width: 700px;
  height: 100px;
  
`;

export const sortingButtonStyle = css`
  border: none;
  border-radius: 3px;
  width: 150px;
  height: 40px;
  color: #f3f3f3;
  background-color: rgba(97, 218, 251, 0.62);
  box-shadow: 0 0 1px 2px rgba(97, 218, 251, 0.5);
  cursor: pointer;
  
  &:hover {
    background-color: rgba(97, 218, 251, 0.8);
  }
  
  &:active {
    background-color: rgba(97, 218, 251);
  }
  
`;
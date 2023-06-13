/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const viewContainer = css`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 64px;
  width: 100%;
  height: calc(100vh - 64px);

`;

export const reviewPageContainer = css`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 64px;
  width: 80%;
  height: calc(100vh - 64px);

`;

export const mapContainer = css`
  display: flex;
  flex-direction: column;  
  width: 100%;
  height: 98vh;
    
`;

export const reviewMapContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 40%;
  height: 90%;
  margin: 60px 20px 0 0px;
  padding: 10px;
  
  background-color: #1111;
    
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
  
  overflow: auto;
  border: none;
  font-weight: 600;

  background-color: #fdfdfdfd;
  color: #888;

  cursor: pointer;
`;

export const selectedButtonStyle = css`
  background-color: #40D6BD;
  color: white;

  font-weight: 600;

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
  font-weight: 600;
  letter-spacing: 3px;
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

export const dayButtonContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 85%;
  margin-top: 100px;
  
  &::-webkit-scrollbar {
    width: 3px;
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: none;
    opacity: .4;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }
`;

export const buttonMove = css`
  height: 1px;
`;

export const scheduleButton = css`
  width: 80px;
  height: 50px;
  margin: 3px 0px;

  border: none;
  font-weight: 600;

  background-color: #1111;
  color: #888;

  cursor: pointer;
    
`;

export const mapList = css`
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 600px;
    padding-top: 10px;
    
    background-color: #fefefefe;
`;

export const locList = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    
    overflow: auto;
    padding: 20px 10px;
    background-color: #fefefefe;

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

export const myLocation = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  font-size: 14px;
`;

export const reviewContainer = css`
    display: flex;
    flex-direction: column;
    
    width: 60%;
    height: 90%;
    margin: 60px 20px 0 0px;
    padding: 10px;
    
    background-color: #1111;
`;

export const titleAndSaveContainer = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    
    background-color: #fefefefe;
`;

export const reviewTitle = css`
    width: 63%;
    margin: 10px;
    font-size: 25px;
    
    border: none;
    border-bottom: 1px solid #dbdbdb;
    outline: none;
    
    color: #888;
    font-weight: 200;
    background-color: transparent;
`;

export const rating = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const reviewButtonContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const saveButton = css`
    display: flex;
    align-items: center;
    
    width: 50px;
    height: 50px;
    
    cursor: pointer;
    border: none;
    background-color: transparent;

`;

export const reviewSaveButton = css`
  font-size: 30px;
  color: #888;
  
  &:hover {
    color: #0BAF94;
  }

  &:active {
    color: #40D6BD;
  }
`;

export const photoContainer = css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30%;
    margin: 15px 0px;
    padding: 10px 13px;
    
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    background-color: #fefefefe;
    
    &::-webkit-scrollbar {
    height: 8px;
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #5555;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }
`;

export const fileInputBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 95%;
    
    background-color: #ededed;
    cursor: pointer;
`;

export const fileInputButton = css`
    font-size: 60px;
    color: #4444;
`;

export const photo = css`
    align-items: center;
    margin: 5px;
    width: 300px;
    height: 95% ;
`;

export const writeReviewContainer = css`
    width: 100%;
    height: 100%;
    
    background-color: #fefefe;
    
    font-size: 19px;
`;

export const reviewContentsInput = css`
    width: 100%;
    height: 100%;
    resize: none;
    
    padding: 30px;
    
    border: none;
    outline: none;

`;

export const customOverlayStyle = css`
  position: absolute;
  top: -12px; /* 마커보다 약간 위로 조정 */
  left: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9); /* 투명도를 적용한 흰색 배경 */
  color: black; /* 검은색 대신 흰색 글자 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2); /* 입체감을 주기 위한 텍스트 그림자 효과 */
`;


export const customOverlayContentStyle = css`
  padding: 4px;
`;

export const sideContainer = css`
  width: 600px;
  display: flex;
  flex-direction: column;
`;

export const daySelectContainer = css`
  display: flex;
  
`;

export const daySelectButton = css`
  width: 80px;
  height: 50px;
  margin: 3px 0px 3px 10px;
  
  border: none;
  background-color: #fdfdfdfd;
  color: #888;
  cursor: pointer;
`;

export const daySelectedButtonStyle = css`

  background-color: #40D6BD;
  color: white;

  font-weight: 600;

  transition: all 0.3s;
  transform: scale(1.1);
  transform-origin: right;

`;
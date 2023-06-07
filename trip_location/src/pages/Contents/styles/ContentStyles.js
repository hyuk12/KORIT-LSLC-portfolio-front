/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const container = css`
  margin-top: 64px;
  width: 100vh;
  height: (100vh - 64px);
  
`;

export const sidebar=css`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  background-color: white;
  box-shadow: 0 4px 8px 0;
  width: 550px;
  height: 100%;
`;

export const calendar = css`
  max-width: 40%;
  height: 100%;
`;

export const main = css`
  width: 100vh;
  position: relative;
`;


export const Title =css`
  margin-top: 30px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

export const avatarBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0px;
  height: 50px;
`;

export const imgIcon = css`
  align-items: center;
  margin-right: 10px;
  
  border-radius: 50%;
  width: 50px;
  height: 50px;

`;

export const resetButton= css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

`;

export const addFriendButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  
  border: none;
  background-color: transparent;
  max-width: 80px;
  max-height: 80px;
`;

export const addFriendIcon = css`
  color: #555;
  cursor: pointer;
`;
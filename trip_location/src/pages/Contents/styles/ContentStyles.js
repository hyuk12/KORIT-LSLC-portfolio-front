/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const container = css`
  margin-top: 64px;
  width: 1920px;
  height: auto;
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
  margin: 10px 0px;
  height: 50px
`;

export const imgIcon = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  
  box-sizing: border-box;
  border-radius: 50%;
  weight: 50px;
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
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  max-width: 80px;
  max-height: 80px;
`;

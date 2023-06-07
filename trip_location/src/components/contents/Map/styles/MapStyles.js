/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const mapStyle = css`
  position: relative;
  width: 250%;
  height: 93vh;
  z-index: 3;
`;

export const guideBox = css`
  position: absolute;
  top:30px;
  left: 550px;
  z-index: 2;
`;

export const guideButton = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  
  margin: 8px;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: #ffffffb3;
  box-shadow: 0 4px 8px 0;
  
  cursor: pointer;
`;

export const modalStyle = css`
  background: rgba(0, 0, 0, 0.5);
`;
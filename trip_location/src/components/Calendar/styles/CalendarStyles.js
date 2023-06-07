/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const calendarContainer = css`
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
export const Total=css`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

export const submitContainer = css`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 40px;
  width: 100%;
`;

export const submitButton = css`
  width: 100px;
  height: 40px;
  margin-right: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  
  &:hover {
    background-color: #40D6BD;
    color: white;
  }
`;

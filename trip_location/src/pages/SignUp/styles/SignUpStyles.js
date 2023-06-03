/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {TextField} from "@mui/material";

export const mergeContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 150px auto;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.8);
  width: 600px;
  height: 600px;
`;

export const pStyle = css`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const inputContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const textFieldStyle = css`
  margin-top: 10px;
  width: 350px;
`;

export const buttonContainer = css`
  display: flex;
  margin-top: 10px;
`;

export const buttonStyle = css`
  width: 150px;
  height: 50px;
`;


export const inputContainers = css`
    width: 500px;
`;


export const submitButton = css`
    height: 45px;
    margin-top: 30px;
    margin-bottom: 20px;

    background-color: #0BD0AF;
    color: white;

    font-size: 15px;
    
    &:hover {
        background-color: #0BAF94;
    }

    &:active {
        background-color: #40D6BD;
    }
`;

export const signupContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
`;
export const signupBox = css`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 8px;
`;

export const signupText = css`
    margin-top: 80px;
    margin-bottom: 30px;
`;

export const StyleInput = styled(TextField)`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
`;

export const addressForm = css`
    width: 100%;
    margin-top: 15px;
`;

export const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;



/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {TextField} from "@mui/material";

export const modifyContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
    margin-top: 100px;
`;

export const modifyBox = css`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const profileImgContainer = css`
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-size: cover;
    background-position: center;
    overflow: hidden;
`;

export const imgStyle = css`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const hiddenInput = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
     
`;

export const signupText = css`
    margin-bottom: 30px;
`;

export const inputContainer = css`
    width: 500px;
`;

export const StyleInput = styled(TextField)`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
`;

export const editInputStyle = css`
  display: flex;
  
  width: 100%;
`;

export const editButtonStyle = css`
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 3px;
  width: 50px;
  height: 56px;
  
  background-color: #0bd0af;
  color: #fff;
  box-shadow: 0px 1px 1px 1px #dbdbdb;
  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD;
  }
  
`;

export const addressForm = css`
    width: 100%;
    margin-top: 15px;
  
`;

export const addressEditButtonStyle = css`
  margin-top: 15px;
  border: none;
  border-radius: 3px;
  width: 50px;
  height: 56px;

  background-color: #0bd0af;
  color: #fff;
  box-shadow: 0px 1px 1px 1px #dbdbdb;
  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD;
  }
`;

export const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
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

export const withdrawalStyle = css`
    font-size: 12px;
    color: #888;
`;

export const container = css`
    margin-top: 70px;
`;
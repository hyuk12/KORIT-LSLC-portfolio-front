/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {TextField} from "@mui/material";

export const signupContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
`
;

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

export const inputContainer = css`
    width: 500px;
`;

export const StyleInput = styled(TextField)`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
`;

export const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;

export const guideMsg = css`
    font-size: 12px;
    color: #888;
`;

export const submitButton = css`
    height: 45px;

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

export const pageContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
`;

export const pageBoxStyle = css`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 8px;
`;

export const titleText = css`
    margin-top: 80px;
    margin-bottom: 30px;
`;

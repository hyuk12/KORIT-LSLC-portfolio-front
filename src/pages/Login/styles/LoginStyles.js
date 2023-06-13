/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const submitButton = css`
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
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const signupLink = css`
    margin-left: 7px;
`;

export const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;

export const orBorderContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const or = css`
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 5px;

    &::before {
        content: "";
        display: flex;
        border-bottom: 1px solid #dbdbdb;
        flex-grow: 1;
        margin: 0px 20px;
        width: 100px;
        height: 1px;
    }
    &::after {
        content: "";
        display: flex;
        border-bottom: 1px solid #dbdbdb;
        flex-grow: 1;
        margin: 0px 20px;
        width: 100px;
        height: 1px;
    }

`;

export const oauthContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const oauthLoginText = css`
    font-size: 14px;
`;

export const oauthBtnList = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export const oauthBtn = css`
    width: 45px;
    height: 45px;
    margin-left: 20px;
    margin-right: 20px;

    border-radius: 5px;
    border: none;
    overflow: hidden;

    box-shadow: 1px 1px 2px #dbdbdb;
    padding: 0px;

    cursor: pointer;
`;

export const oauthImg = css`
    width: 45px;
    height: 45px;
    object-fit: cover;
`;

/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

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
export const contentContainer = css`
    width: 500px;
`;

export const listStyle = css`
    list-style-type: none;
    list-style: none;
    color: #777;
`;

export const titleText = css`
    margin-top: 80px;
    margin-bottom: 30px;
`;

export const submitButton = css`
    height: 45px;
    margin-top: 30px;
    margin-bottom: 20px;

    background-color: #0bd0af;
    color: white;

    font-size: 15px;

    &:hover {
        background-color: #0baf94;
    }

    &:active {
        background-color: #40d6bd;
    }
`;

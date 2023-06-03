/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const divStyle = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 300px;
    height: 64px;
`;

export const buttonStyle = css`
    margin-left: 5px;
    border: 1px solid #bababa;
    border-radius: 5px;

    color: #7c7f86;

    &:hover {
        background-color: #dbdbdb;
        color: #282c34;
    }
`;

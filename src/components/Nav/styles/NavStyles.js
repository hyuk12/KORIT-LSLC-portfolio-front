/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

export const divStyle = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 300px;
    height: 64px;
`;

export const navStyles = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 1000;
`;

export const toolbarStyle = css`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
`;

export const logoContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 64px;
    
    border: none;
    background-color: white;
    overflow: hidden;
    
    & :hover {
        cursor: pointer;
    }
`;

export const logoImage = css`
    width: 300px;
    transform: scale(0.8);
`;

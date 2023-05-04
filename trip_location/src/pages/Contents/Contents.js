/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const container = css`

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 64px;
    border: 1px solid #dbdbdb;
    
    width: 100%;
    height: 100%;
`;

const sidebar = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    min-width: 280px;
`;
const main = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;

`;
const footer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
`;

const Contents = () => {
    return (
        
        <div css={container}>
            <div css={sidebar}>1</div>
            <div css={main}>2</div>
            <div css={footer}>3</div>
        </div>
        
    );
};

export default Contents;
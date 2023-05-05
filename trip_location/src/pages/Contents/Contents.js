/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Calendar from '../../components/Calendar/Calendar';


const container = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 64px;
    border: 1px solid #dbdbdb;
    width: 1;
    height:100%;
`;

const leftsidebar = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    min-width: 300px;
    height:100%;
`;
    
const main = css`
    display: flex;
    justify-content: center;
    border: 1px solid #dbdbdb;
    width:100%
    height:100%;
`;

const rightsidebar = css`
    display: flex;
    justify-content: center;
    border: 1px solid #dbdbdb;
    width:100%
    height:100%;
`;

const Contents = () => {
    return (
        
        <div css={container}>
            <div css={leftsidebar}><Calendar /></div>
            <div css={main}>2</div>
            <div css={rightsidebar}>3</div>
        </div>
        
    );
};

export default Contents;
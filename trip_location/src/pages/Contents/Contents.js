/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Map from '../../components/contents/Map/Map';
import { useSearchParams } from 'react-router-dom';

const container = css`
  display: flex;
  flex-wrap: wrap;
  margin-top: 64px;
  border: 1px solid #dbdbdb;
  height: 100vh;
`;

const leftsidebar = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb;
  min-width: 400px;
  flex: 1 0 400px;
  z-index:100;
`;


const main = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb;
  flex: 1 1 auto;
  overflow:hidden;
  z-index: 0;
`;

const rightsidebar = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb;
  min-width: 300px;
  flex: 1 0 300px;
`;


const Contents = () => {
  const [serchParams, setSearchParams] = useSearchParams();

  return (
    <div css={container}>
      <div css={leftsidebar}>
        <div>여행장소 이름</div>
        <Calendar />
        <div>총 일정</div>
      </div>
      <div css={main}><Map destinationTitle={serchParams.get("destinationTitle")}/></div>
      <div css={rightsidebar}>여긴 추천장소가 들어갈 자리</div>
    </div>
  );
};

export default Contents;
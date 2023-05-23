/** @jsxImportSource @emotion/react */
import React, {useEffect} from 'react';
import {css} from "@emotion/react";

const { kakao } = window;

const viewContainer = css`
  display: flex;
  margin-top: 64px;
  width: 2560px;
  height: 1600px;

`;

const mapContainer = css`
  display: flex;
  flex-direction: column;  
  width: 100%;
  height: 100%;
    
`;


const buttonContainer = css`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  width: 100%;
  height: 30%;
  
`;

const buttonStyle = css`

  width: 150px;
  height: 50px;
`;

const mainStyle = css`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
`;

const tripLocationList = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80%;

  border: 1px solid black;
  
`;

const tripLocationItem = css`
  width: 70%;
  height: 250px;
  border: 1px solid black;
`;

const footerStyle = css`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: 20%;
`;

const footerButtonContainer = css`

  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;


const MapSorting = () => {
  useEffect(() => {
    const containers = document.getElementsByClassName('map-container');
    const loc1 = localStorage.getItem('loc');
    const options = {
      center: new kakao.maps.LatLng(35.1798200522868, 129.075087492149),
      draggable: false,
      disableDoubleClick: true
    };

  
    Array.from(containers).forEach(container => {
      const map = new kakao.maps.Map(container, options);

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(loc1),
        map: map
      });
    });
  }, []);

  const mapContainers = [];

  for (let i = 0; i < localStorage.getItem('number') ; i++) {   //나중에 db에서 값을 받아와 해당 값만큼 지도 생성하기
    mapContainers.push(
      <div
        key={`map-container-${i}`}
        className="map-container"
        style={{ width: "15%", height: "15%" }}
      />
    );
  }


    return (
        <div css={viewContainer}>
            <div css={mapContainer}>
                {mapContainers}
                <div css={buttonContainer}>
                    <button css={buttonStyle} disabled>1일차</button>
                    <button css={buttonStyle} disabled>2일차</button>
                    <button css={buttonStyle} disabled>3일차</button>
                </div>
            </div>
            <main css={mainStyle}>
                <div css={tripLocationList}>
                  
                    <div css={tripLocationItem}>1</div>
                    <div css={tripLocationItem}>2</div>
                    <div css={tripLocationItem}>3</div>
                </div>
                <div css={footerStyle}>
                    <div css={footerButtonContainer}>
                        <button css={buttonStyle} disabled>확인</button>
                        <button css={buttonStyle} disabled>취소</button>
                    </div>
                </div>
            </main>


        </div>

    );
};

export default MapSorting;


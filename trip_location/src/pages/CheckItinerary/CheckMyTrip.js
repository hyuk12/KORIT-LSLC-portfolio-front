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



const CheckMyTrip = () => {
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5522, 126.570667),
            zoom: 12,
            level: 3
        }
        const map = new kakao.maps.Map(container, options);
    },[])

    return (
        <div css={viewContainer}>
            <div css={mapContainer}>
                <div id="map" style={{
                    width: "100%",
                    height: "60%"
                }} />
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

export default CheckMyTrip;


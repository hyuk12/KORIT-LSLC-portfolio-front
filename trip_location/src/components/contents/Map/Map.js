/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';

const { kakao } = window;

const map = css`
  position: relative;
  width: 100%;
  height: 93vh;
  z-index: 1;
`;

const guideBox = css`
  position: absolute;
  left: 540px;
  z-index: 2;
`;

const guideButton = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  margin: 8px;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: #ffffffb3;
  box-shadow: 0 4px 8px 0;
`;

const Map = ({ destinationTitle, paths, setPaths }) => {
  const linePath = [];
  const mapRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const mapOption = {
      center: new kakao.maps.LatLng(35.152380, 129.059647),
      level: 9,
    };
    const map = new kakao.maps.Map(mapRef.current, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();

    console.log(destinationTitle)
    //geocoder 사용으로 주소로 장소표시
    geocoder.addressSearch(destinationTitle, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 검색결과위치로 맵을 이동
        map.setCenter(coords);
      }
    });
    
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: 'blue',
      strokeOpacity: 0.7,
      strokeStyle: 'solid'
    });
    polyline.setMap(map);
    setPolyline(polyline);

     kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        const position = mouseEvent.latLng;
        geocoder.coord2Address(position.getLng(), position.getLat(), function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            // Extract the address from the result object
            const address = result[0].address.address_name;
      
            // TODO: do something with the address, such as displaying it in a popup or storing it in state
            console.log(address);
            setAddress(addr => [...addr, address]);
          }
        });
        const marker = new kakao.maps.Marker({ position });
        marker.setMap(map);
        setMarkers(prevMarkers => [...prevMarkers, marker]);
        setMarkerPositions(prevPositions => [...prevPositions, position]);

    kakao.maps.event.addListener(marker, 'click', function() {
        setMarkers(prevMarkers => prevMarkers.filter(prevMarker => prevMarker !== marker));
        if (polyline) {
            const linePath = polyline.getPath();
            const newLinePath = linePath.filter(latlng => latlng !== position);
            polyline.setPath(newLinePath);
          }
        marker.setMap(null);
        });

    if (polyline) {
        const linePath = polyline.getPath();
        linePath.push(position);
        polyline.setPath(linePath);
      }
    });

    return () => {
        kakao.maps.event.removeListener(map, 'click');
    };
  }, [editMode, destinationTitle]);

  function handleHideMarkers() {

    if (polyline) {
      polyline.setMap(null);
    }
    setPolyline(null);
    setEditMode(prevEditMode => !prevEditMode);
  }
  
function handleSavePath() {

  const positions = markerPositions.map((position,index)=>({
    addr: address[index],
    lat:position.getLat(),
    lng: position.getLng(),
  }));
  
  localStorage.setItem("markers", JSON.stringify(positions));
  setPaths(positions);
}

  return (
    <div css={map} ref={mapRef}>
      <div css={guideBox}>
            <button css={guideButton} onClick={handleSavePath}>경로 저장</button>
            <button css={guideButton} onClick={handleHideMarkers}>마커 전부 삭제</button>
      </div>
    </div>
  );
  
};

export default Map;
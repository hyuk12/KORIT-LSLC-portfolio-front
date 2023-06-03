/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from 'react';
import {map, guideBox, guideButton} from "./styles/MapStyles";

const { kakao } = window;

const Map = ({ destinationTitle, paths, setPaths }) => {
  const markerId = useRef(1);
  const mapRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [address, setAddress] = useState([]);
  
  useEffect(() => { //지도의 시작 좌표,확대 단계 조절
    const mapOption = {
      center: new kakao.maps.LatLng(35.152380, 129.059647),
      level: 9,
    };
    const map = new window.kakao.maps.Map(mapRef.current, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(destinationTitle, function(result, status) {     //geocoder 사용으로 주소로 장소표시
      if (status === kakao.maps.services.Status.OK) {
        const latitude = result[0].y;
        const longitude = result[0].x;
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 검색결과위치로 맵을 이동
        map.setCenter(coords);
        localStorage.setItem('titleLatitude', latitude);
        localStorage.setItem('titleLongitude', longitude);        
      }
    });
  
     kakao.maps.event.addListener(map, 'click', function(mouseEvent) {  //지도 클릭시 이벤트
        const position = mouseEvent.latLng; //지도에서 클릭한 위치
        geocoder.coord2Address(position.getLng(), position.getLat(), function(result, status) { //coord2Address 좌표 값에 해당하는 구 주소와 도로명 주소 정보를 요청
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            setAddress(addr => [...addr, address]);
          }
        });
        const marker = new kakao.maps.Marker({ position }); //마커 객체 생성
        marker.setMap(map); //마커 지도에 보여줌
        setMarkers(prevMarkers => [...prevMarkers, marker]);  //새로 생성된 마커 저장
        setMarkerPositions(prevPositions => [...prevPositions, position]);  //마커와 연결된 좌표 저장
      
    kakao.maps.event.addListener(marker, 'click', function() {  //마커 클릭시 이벤트
        setMarkers(prevMarkers => prevMarkers.filter(prevMarker => prevMarker !== marker)); //클릭한 마커 배열에서 제거
        marker.setMap(null);  //클릭한 마커 지도에서 제거
        });
    });

    return () => {
        kakao.maps.event.removeListener(map, 'click');
    };
  }, [editMode, destinationTitle]);

function handleSavePath() { //로컬저장소에 마커 위도,경도,주소 정보 저장
  if (markerPositions.length === 0) {
    alert('경로를 지정해주세요.');
    return;
  }

  const markerData = markerPositions.map((position, index) => {
    const locations = [
      {
        addr: address[index],
        lat: position.getLat(),
        lng: position.getLng(),
      },
    ];
  
    return {
      id: markerId.current,
      location: locations,
    };
  });
  
  const groupedMarkerData = markerData.reduce((result, current) => {
    const existingItem = result.find((item) => item.id === current.id);
  
    if (existingItem) {
      existingItem.location.push(...current.location);
    } else {
      result.push(current);
    }
  
    return result;
  }, []);
  
  markerId.current += 1; 
  setPaths(groupedMarkerData);
  setMarkerPositions([]);
  setMarkers([]);
  setAddress([]);
  markers.forEach(marker => marker.setMap(null));
}

  return (
    <div css={map} ref={mapRef}>
      <div css={guideBox}>
            <button css={guideButton} onClick={handleSavePath}>경로 저장</button> 
            <button css={guideButton} onClick={handleSavePath}>경로 수정</button> 
      </div>
     {/* <MapSearch map={mapRef.current} /> */}
    </div>
  );
  
};

export default Map;

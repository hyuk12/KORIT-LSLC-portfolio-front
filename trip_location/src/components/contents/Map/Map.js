/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from 'react';
import {guideBox, guideButton, map} from "./styles/MapStyles";

const { kakao } = window;

const Map = ({ destinationTitle, paths, setPaths }) => {
  const markerId = useRef(1);
  const mapRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [markerData, setMarkerData] = useState([]);
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

          const marker = new kakao.maps.Marker({ position }); //마커 객체 생성
          marker.setMap(map); //마커 지도에 보여줌

          const data = {marker, position, address}; // 마커, 위치, 주소를 하나의 객체에 저장
          setMarkerData(prevData => [...prevData, data]); // 객체를 배열에 저장

          kakao.maps.event.addListener(marker, 'click', function() {  //마커 클릭시 이벤트
            setMarkerData(prevData => prevData.filter(prev => prev.marker !== marker)); // 클릭한 마커와 관련된 데이터 삭제
            marker.setMap(null);  //클릭한 마커 지도에서 제거
          });
        }
      });
    });


    return () => {
        kakao.maps.event.removeListener(map, 'click');
    };
  }, [editMode, destinationTitle]);

  const handelInformation = () => { //설명서

  }

  const handleSavePath = () => { //로컬저장소에 마커 위도,경도,주소 정보 저장
    if (markerData.length === 0) {
      alert('경로를 지정해주세요.');
      return;
  }
    const newMarkerData = markerData.map((data) => {
      const locations = [
        {
          addr: data.address,
          lat: data.position.getLat(),
          lng: data.position.getLng(),
        },
      ];

      return {
        id: markerId.current,
        location: locations,
      };
    });

    const groupedMarkerData = newMarkerData.reduce((result, current) => {
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
    setMarkerData([]);
    markerData.forEach(data => data.marker.setMap(null));
  }
  
  return (
    <div css={map} ref={mapRef}>
      <div css={guideBox}>
            <button css={guideButton} onClick={handelInformation}>?</button>
            <button css={guideButton} onClick={handleSavePath}>경로 저장</button>
      </div>
    </div>
  );
  
};

export default Map;

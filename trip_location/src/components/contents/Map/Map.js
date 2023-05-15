/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';

/*
장소를 주는 구성 형태
[
  {
    id:1,
    date:'일자',
    location:
    [
      {
        addr
        lat
        lng

      }

    ]
  
  }
]
*/
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

const Map = ({ destinationTitle, paths, setPaths, onSavePath }) => {
  const linePath = [];
  const mapRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [address, setAddress] = useState([]);



  useEffect(() => { //지도의 시작 좌표,확대 단계 조절
    const mapOption = {
      center: new kakao.maps.LatLng(35.152380, 129.059647),
      level: 9,
    };
    const map = new kakao.maps.Map(mapRef.current, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();

    //geocoder 사용으로 주소로 장소표시
    geocoder.addressSearch(destinationTitle, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 검색결과위치로 맵을 이동
        map.setCenter(coords);
      }
    });
    
    const polyline = new kakao.maps.Polyline({ //마커 사이 선 설정
      path: linePath,
      strokeWeight: 5,
      strokeColor: 'blue',
      strokeOpacity: 0.7,
      strokeStyle: 'dashed'
    });
    polyline.setMap(map);
    setPolyline(polyline);

     kakao.maps.event.addListener(map, 'click', function(mouseEvent) {  //지도 클릭시 이벤트
        const position = mouseEvent.latLng; //지도에서 클릭한 위치
        geocoder.coord2Address(position.getLng(), position.getLat(), function(result, status) { //coord2Address 좌표 값에 해당하는 구 주소와 도로명 주소 정보를 요청
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            // console.log(position);
            setAddress(addr => [...addr, address]);
          }
        });
        const marker = new kakao.maps.Marker({ position }); //마커 객체 생성
        marker.setMap(map); //마커 지도에 보여줌
        setMarkers(prevMarkers => [...prevMarkers, marker]);  //새로 생성된 마커 저장
        setMarkerPositions(prevPositions => [...prevPositions, position]);  //마커와 연결된 좌표 저장

        if (!polyline) { // Check if polyline doesn't exist
          const newPolyline = new kakao.maps.Polyline({
            path: [position], // Start with current position
            strokeWeight: 5,
            strokeColor: 'blue',
            strokeOpacity: 0.7,
            strokeStyle: 'dashed'
          });
          newPolyline.setMap(map);
          setPolyline(newPolyline);
        } else {
          const linePath = polyline.getPath();
          linePath.push(position);
          polyline.setPath(linePath);
        }
      
    kakao.maps.event.addListener(marker, 'click', function() {  //마커 클릭시 이벤트
        setMarkers(prevMarkers => prevMarkers.filter(prevMarker => prevMarker !== marker)); //클릭한 마커 배열에서 제거
        if (polyline) { //마커 사이 선 경로를 수정
            const linePath = polyline.getPath();
            const newLinePath = linePath.filter(latlng => latlng !== position);
            polyline.setPath(newLinePath);
          }
        marker.setMap(null);  //클릭한 마커 지도에서 제거
        });

    if (polyline) { //클릭한 위치 polyline경로에 저장
        const linePath = polyline.getPath();
        linePath.push(position);
        polyline.setPath(linePath);
      }
    });

    return () => {
        kakao.maps.event.removeListener(map, 'click');
    };
  }, [editMode, destinationTitle]);

  function handleHideMarkers() {  //마커 전체 삭제
    if (polyline) {
      polyline.setMap(null);
    }
    setPolyline(null);
    setEditMode(prevEditMode => !prevEditMode);
    setAddress([]); // Clear address array
    setMarkers([]); // Clear markers array
  }
  
function handleSavePath(newValue) { //로컬저장소에 마커 위도,경도,주소 정보 저장
  
  const markerData = markerPositions.map((position,index)=>({
    addr: address[index],
    lat:position.getLat(),
    lng: position.getLng(),
  }));
  
  // localStorage.setItem("markers", JSON.stringify(markerData)); 
  console.log(markerData);

  setPaths(markerData);
  setMarkerPositions([]);
  setAddress([]);
  setMarkers([]);

  if (polyline) {
    polyline.setMap(null);
  }
  setPolyline(null);
  
  markers.forEach(marker => marker.setMap(null));
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


/*
[
  {
    id:1,
    date:'일자',
    location:
    [
      {
        addr
        lat
        lng

      }

    ]
  
  }
]
*/
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';

const map = css`
  position: relative;
  width: 900px;
  height: 900px;
  z-index: 1;
`;

const guideBox = css`
  position: absolute;
  z-index: 2;
`;

const guideButton = css`
  display: flex;
  margin: 8px;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: #ffffffb3;
  box-shadow: 0 4px 8px 0;
`;

const Map = ({ destinationTitle }) => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [route, setRoute] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [previousRoute, setPreviousRoute] = useState([]);
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    const kakao = window.kakao;
    // const mapContainer = mapRef.current;
    const mapOption = {
      center: new kakao.maps.LatLng(35.152380, 129.059647),
      level: 9,
    };
    const map = new kakao.maps.Map(mapRef.current, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();

    // Create a red marker image to use for route markers
    const routeMarkerImage = new kakao.maps.MarkerImage(
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
      new kakao.maps.Size(20, 34),
      { offset: new kakao.maps.Point(10, 34) }
    );
  

    // Prevent map events from firing
    const preventMapEvents = () => {
      setEditMode(false);
      setClickable(true);
    };
    const restoreMapEvents = () => {
      setClickable(false);
    };
  
    kakao.maps.event.addListener(map, 'dragstart', preventMapEvents);
    kakao.maps.event.addListener(map, 'dragend', restoreMapEvents);
  
    // Add markers for previousRoute when edit mode is turned on
    if (editMode && previousRoute.length > 0) {
      const markers = previousRoute.map((marker, index) => {
        const position = new kakao.maps.LatLng(
          marker.getPosition().getLat(),
          marker.getPosition().getLng()
        );
        const newMarker = new kakao.maps.Marker({
          position,
          map,
          icon: routeMarkerImage,
        });
        return newMarker;
      });
      setRoute(markers);
    }

    console.log(destinationTitle)
    //geocoder 사용으로 주소로 장소표시
    geocoder.addressSearch(destinationTitle, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
        const map = new kakao.maps.Map(mapRef.current, {
          center: coords,
          level: 9
        });
        // 검색결과 마커로 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우에 간단한 주석 띄우기
        const infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;">좌표들어갈곳</div>'
        });
        infowindow.open(map, marker);

        // Move the center of the map to the location received as the result
        map.setCenter(coords);
      }
    });
  
    const handleMapClick = (mouseEvent) => {
      const latlng = mouseEvent.latLng;
  
      const marker = new kakao.maps.Marker({
        position: latlng,
        map: map,
        icon: editMode ? routeMarkerImage : null,
      });
  
      if (editMode) {
        // Replace the last marker in the route with the new one
        const prevMarker = route.pop();
        prevMarker.setMap(null);
        route.push(marker);
      } else {
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      }
  
      kakao.maps.event.addListener(marker, 'click', function () {
        marker.setMap(null);
  
        if (editMode) {
          setRoute((prevRoute) =>
            prevRoute.filter((m) => m !== marker)
          );
        } else {
          setMarkers((prevMarkers) =>
            prevMarkers.filter((prevMarker) => prevMarker !== marker)
          );
        }
      });
    };
    kakao.maps.event.addListener(map, 'click', handleMapClick);

    return () => {
      // Cleanup listeners to prevent memory leaks
      kakao.maps.event.removeListener(map, 'dragstart', preventMapEvents);
      kakao.maps.event.removeListener(map, 'dragend', restoreMapEvents);
      kakao.maps.event.removeListener(map, 'click', handleMapClick);
    };
  }, [editMode, previousRoute, destinationTitle]);
      
  const handleSaveRoute = () => {
    setPreviousRoute([...markers]);
    setMarkers([]);
    setRoute([...route]);
    setEditMode(true);
  };

  const handleEditRoute = () => {
      setEditMode(true);
      setMarkers([]);
      setRoute([]);
  };
    
  return (
    <div css={map} ref={mapRef}>
        <div>
          <div css={guideBox}>
            <a css={guideButton}>1번 박스</a>
            <a css={guideButton}>2번 박스</a>
            <a css={guideButton}>3번 박스</a>
            <a css={guideButton}>4번 박스</a>

          </div>
      </div>
        {markers.length > 0 && (
          <div>
            <ul>
              {markers.map((marker, index) => (
                <li key={index}>
                  Marker {index + 1}: ({marker.getPosition().getLat()},{''}
                  {marker.getPosition().getLng()})
                </li>
              ))}
            </ul>
          </div>
        )}
        {route.length > 0 && (
          <div>
            <h2>Saved Route:</h2>
            <ul>
              {route.map((marker, index) => (
                <li key={index}>
                  Marker {index + 1}: ({marker.getPosition().getLat()},{''}
                  {marker.getPosition().getLng()})
                </li>
              ))}
            </ul>
          </div>
        )}
        {!editMode && markers.length > 0 && (
          <button onClick={handleSaveRoute}>Save Route</button>
        )}
        {route.length > 0 && (
          <button onClick={handleEditRoute}>Edit Route</button>
        )}
      </div>
    );
};

export default Map;
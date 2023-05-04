/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';

const map = css`
  width: 500px;
  height: 500px;
`;

const Map = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [route, setRoute] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [previousRoute, setPreviousRoute] = useState([]);
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    const kakao = window.kakao;
    const mapContainer = mapRef.current;
    const mapOption = {
      center: new kakao.maps.LatLng(35.152380, 129.059647),
      level: 5,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
  
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
  }, [editMode, previousRoute]);
      
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
      <div>
        <div css={map} ref={mapRef}></div>
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
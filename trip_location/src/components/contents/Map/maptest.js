import React, { useEffect } from 'react';
import { useState } from 'react';

const { kakao } = window;

function Maptest() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(35.152683, 129.059642),
      level: 3
    };
    const Map = new kakao.maps.Map(container, options);
    setMap(Map);   

    

    const linePath = [];
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: '#FFAE00',
      strokeOpacity: 0.7,
      strokeStyle: 'solid'
    });
    polyline.setMap(Map);
    setPolyline(polyline);

    //마커 여러개 생성
    kakao.maps.event.addListener(Map, 'click', function(mouseEvent) {
        const position = mouseEvent.latLng;
        const marker = new kakao.maps.Marker({ position });
        marker.setMap(Map);
        setMarkers(prevMarkers => [...prevMarkers, marker]);

       
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
        kakao.maps.event.removeListener(Map, 'click');
    };
}, []);
    // 좌표이동
    function setCenter() {
        const moveLatitude = new kakao.maps.LatLng(35.152683, 129.059642);
        map.setCenter(moveLatitude);
    }
    
    function panTo() {
        const moveLatitude = new kakao.maps.LatLng(35.152683, 129.059642);
        map.panTo(moveLatitude);
    }
    // 좌표이동


  function setMarkersOnMap(map) {
    markers.forEach(marker => {
      if (map) {
        marker.setMap(map);
        kakao.maps.event.addListener(marker, 'click', function() {
          setMarkers(prevMarkers => prevMarkers.filter(prevMarker => prevMarker !== marker));
          marker.setMap(null);
        });
      } else {
        kakao.maps.event.removeListener(marker, 'click');
        marker.setMap(null);
      }
    });
  }


  function handleHideMarkers() {
    setMarkersOnMap(null);
    setMarkers([]);
    polyline.setMap(null);
    
  }


return (
    <>
    <div id="map" style={{width:'700px',height:'800px'}}>
          <p>
      </p>
    </div>
        <button onClick={setCenter}>중심좌표 이동</button>       
        <button onClick={panTo}>중심좌표 부드럽게 이동</button>
        <button onClick={handleHideMarkers}>마커 전체삭제</button>
    </>
    );
};

export default Maptest;
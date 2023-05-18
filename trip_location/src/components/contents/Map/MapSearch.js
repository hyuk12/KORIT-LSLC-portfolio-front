import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const { kakao } = window;

const rightSidebar = css`
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 0 4px 8px 0;
  background-color: white;
  width: 300px;
  height: 100%;
  z-index: 3;
`;
const MapSearch = (map) => {
    const [keyword, setKeyword] = useState('');
    let   [markers, setMarkers] = useState([]);

    function searchPlaces() {
        const ps = new kakao.maps.services.Places({
            // Set your Kakao API key as the `apikey` parameter
            apikey: 'ab3439121662f71fcd5c47373cfa8cf0',
          });
          
          // Now you can use the `ps` object and make API calls
          
        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
      
        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch( keyword, placesSearchCB); 
      }

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
    
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);
    
            // 페이지 번호를 표출합니다
            displayPagination(pagination);
    
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    
            alert('검색 결과가 존재하지 않습니다.');
            return;
    
        } else if (status === kakao.maps.services.Status.ERROR) {
    
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
    
        }
    }
    
    function displayPlaces(places) {
      const listEl = document.getElementById('placesList');
      const menuEl = document.getElementById('menu_wrap');
      const fragment = document.createDocumentFragment();
      const bounds = new kakao.maps.LatLngBounds();
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 5 });
      let listStr = '';
    
      // Remove items added to the search results list
      removeAllChildNodes(listEl);
    
      // Remove the marker being displayed on the map
      removeMarker();
    
      for (let i = 0; i < places.length; i++) {
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        const marker = addMarker(placePosition, i);
        const itemEl = getListItem(i, places[i]);
    
        bounds.extend(placePosition);
    
        (function (marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            displayInfowindow(marker, title);
          });
    
          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
          });
    
          itemEl.onmouseover = function () {
           // displayInfowindow(marker, title);
          };
    
          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);
    
        fragment.appendChild(itemEl);
      }
    
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;
    
    }
    
    function getListItem(index, places) {
      const el = document.createElement('li');
      let itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        ' <h5>' +
        places.place_name +
        '</h5>';
    
      if (places.road_address_name) {
        itemStr +=
          ' <span>' +
          places.road_address_name +
          '</span>' +
          ' <span class="jibun gray">' +
          places.address_name +
          '</span>';
      } else {
        itemStr += ' <span>' + places.address_name + '</span>';
      }
    
      itemStr +=
        ' <span class="tel">' + places.phone + '</span>' + '</div>';
    
      el.innerHTML = itemStr;
      el.className = 'item';
    
      return el;
    }
    
    function addMarker(position, idx, title) {
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // Write marker image URL and sprite image
      const imageSize = new kakao.maps.Size(36, 37); // Size of marker image
      const imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // Size of sprite image
          spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // Coordinates of the upper left corner of the sprite image to be used
          offset: new kakao.maps.Point(13, 37) // Coordinates within the image to match the marker coordinates
      };
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
      const marker = new kakao.maps.Marker({
          position: position, // Position of the marker
          image: markerImage
      });
    
      //marker.setMap(map); // Display the marker on the map
      markers.push(marker); // Add the created markers to the array
    
      return marker;
    }
    
    function removeMarker() {
      
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }
    
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
          fragment = document.createDocumentFragment(),
          i; 
    
      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild (paginationEl.lastChild);
      }
    
      for (i=1; i<=pagination.last; i++) {
          var el = document.createElement('a');
          el.href = "#";
          el.innerHTML = i;
    
          if (i===pagination.current) {
              el.className = 'on';
          } else {
              el.onclick = (function(i) {
                  return function() {
                      pagination.gotoPage(i);
                  }
              })(i);
          }
    
          fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }
    
    function displayInfowindow(marker, title) {
      const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 5 });
    
      infowindow.setContent(content);
      //infowindow.open(marker);
    }
    
    function removeAllChildNodes(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission
    
        if (!keyword.trim()) {
          alert('Please enter a keyword!');
          return;
        }
    
        searchPlaces(); // Call the searchPlaces() function
      }
  
    return (
        <div>
                  <div class="map_wrap" css={rightSidebar}>
              <div id="menu_wrap" class="bg_white">
                <div class="option">
                  <div>
                  <form onSubmit={handleSubmit}>
                      키워드 검색: <input type="text" value={keyword} id="keyword" size="15" onChange={(e) => setKeyword(e.target.value)} />
                      <button type="submit">검색하기</button> 
                  </form>
                  </div>
                </div>
                <hr />
                <ul id="placesList"></ul>
                <div id="pagination"></div>
              </div>
        </div>
        </div>
    );
};

export default MapSearch;
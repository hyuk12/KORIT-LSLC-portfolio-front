/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
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
  overflow-y: auto;
`;

const pagination = css`
  margin: 10px auto;
  text-align: center;
`;

const MapSearch = ({ map }) => {
    const [keyword, setKeyword] = useState('');
    const [destinationTitle, setDestinationTitle] = useState('');

    function searchPlaces() {
        const ps = new kakao.maps.services.Places({
            apikey: 'ab3439121662f71fcd5c47373cfa8cf0',
          });
           
        const latitude = localStorage.getItem('titleLatitude');
        const longitude = localStorage.getItem('titleLongitude');
        const options = {
          location: new kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude)),
          radius: 10000,
        }
          
          
        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
      
        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch( keyword, placesSearchCB, options); 
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
    
      // Remove items added to the search results list
      removeAllChildNodes(listEl);
    
      for (let i = 0; i < places.length; i++) {
        const itemEl = getListItem(i, places[i]);
        fragment.appendChild(itemEl);
       //createMarker(places[i]);
      }
    
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;
    }

    function getListItem(index, places) {
      const el = document.createElement('li');
      let itemStr =
        '<span class= markerbg marker_ '  +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        ' <h5>' +
        places.place_name +
        '</h5>';

        if (places.image_url) {
          itemStr += `<img src="${places.image_url}" alt="Place Image" />`;
        }
    
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

      const placeNameEl = el.querySelector('.place-name');
      // placeNameEl.addEventListener('click', function() {
      //   // Handle the onclick event here for the place name
      //   // You can access the "places" data and perform the desired action
      //   console.log('Place name clicked:', places.place_name);
      // });
      console.log( places.place_name)
      return el;  
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

    function removeAllChildNodes(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    function handleSubmit(event) {
      event.preventDefault(); // Prevent the default form submission
    
      if (!keyword.trim()) {
        alert('키워드를 입력해주세요!');
        return;
      }
    
      if (map) {
        // Call the searchPlaces function with the keyword
        searchPlaces();
      } else {
        alert('Map is not available!');
        console.log('실패')
      }
    }
  
    return (
        <div>
                  <div class="map_wrap" css={rightSidebar}>
              <div id="menu_wrap" class="bg_white">
                <div class="option">
                  <div>
                  <form onSubmit={handleSubmit}>
                      키워드: <input type="text" value={keyword} id="keyword" size="15" onChange={(e) => setKeyword(e.target.value)} />
                      <button type="submit">검색하기</button> 
                  </form>
                  </div>
                </div>
                <hr />
                <ul id="placesList"></ul>
                <div id="pagination" css={pagination}></div>
              </div>
        </div>
        </div>
    );
};

export default MapSearch;

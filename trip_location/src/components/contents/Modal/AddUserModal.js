/** @jsxImportSource @emotion/react */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import logoTitle from '../../../images/logotitle.png';
import {
  buttonStyle,
  listContainer,
  listUser,
  listUserContainer,
  logoBox,
  logoImage,
  modalContainer,
  modalContent,
  modalStyle,
  searchBar,
  searchBox,
  searchButton,
  searchContainer,
  searchHeader,
  searchSubmit,
  searchTextBox,
  selectRadio,
  text,
  titleText,
  user,
  userName,
  userProfileImg,
  withList,
} from "./styles/ModalStyles";


const AddUserModal = ({ isOpen, onClose, destination, userInfo, updatePartyData }) => {
  const [searchType, setSearchType] = useState('email');
  const [searchValue, setSearchValue] = useState('');

  const [partyUsers, setPartyUsers] = useState([]);

  useEffect(() => {
    if (userInfo.userId) {
      setPartyUsers([
        {
          userId: userInfo.userId,
          email: userInfo.email,
          name: userInfo.name,
          phone: userInfo.phone,
          profileImg: userInfo.profileImg,
        },
      ]);
    }
  }, [userInfo]);

  const [searchInfo, setSearchInfo] = useState({});

  const { image, title, englishing } = destination;

  const searchUser = useQuery(['searchUser',searchType, searchValue], async() => {
    if (!searchValue) {
      return null;
    }
    const params = {
      type: searchType === 'email' ? 1 : 2,
      value: searchValue,
    }

    const option ={
      params,
      headers:{
        Authorization : `${localStorage.getItem("accessToken")}`
      }
    }
    try {
      const response = await axios.get('http://localhost:8080/api/v1/user/search', option);
      // console.log(response);
      return response;
    } catch (error) {
      return error;  
    }
  },{
    enabled: userInfo.userId !== '',
    onSuccess: (response) => {
      if (response?.data?.data) {
        const newSearchInfo = {
          userId: response.data.data.userId,
          email: response.data.data.email,
          name: response.data.data.name,
          phone: response.data.data.phone,
          profileImg: response.data.data.postsImgUrl,
        };
        setSearchInfo(newSearchInfo);
    
        setPartyUsers((prevPartyUsers) => {
          const isAlreadyAdded = prevPartyUsers.some((party) => party.userId === newSearchInfo.userId);
          if (!isAlreadyAdded) {
            return [...prevPartyUsers, newSearchInfo];
          }
          return prevPartyUsers;
        });
      }
    }
    
  });
  const submitSearchHandler = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.searchMember.value;
    if (userInfo.email !== inputValue) {
      setSearchValue(inputValue);
    }
    e.target.reset();
  };
  
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  if (!isOpen || !destination) {
      return null;
  }
  
  const removePartyHandler = (index) => {
    setPartyUsers((prevPartyData) => {
      const updatedPartyData = [...prevPartyData];
      updatedPartyData.splice(index, 1);
      return updatedPartyData;
    });
  };
  
  const savePartyHandler = () => {
    const partyData = {
      partyData: partyUsers.map((party) => ({
        userId: party.userId,
        name: party.name,
        profileImg: party.profileImg
      }))
    };
    
    localStorage.setItem('partyData', JSON.stringify(partyData));
    
    if (updatePartyData) {
      updatePartyData(partyData.partyData);
    }
    
    onClose();
  };
  
  return (
      <div css={modalStyle} onClick={onClose}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
              <div css={modalContainer}>
                <div css={searchContainer}>
                  <div css={searchHeader}>
                      <div css={logoBox}>
                        <img css={logoImage} src={logoTitle} alt={logoTitle}/>
                      </div>
                      <div css={searchBox}>
                        <div css={searchTextBox}>
                          <h4 css={titleText}>{title}</h4>
                          <p css={text}> 에 함께갈 친구를 검색하세요</p>
                        </div>
                          <form css={searchSubmit} onSubmit={submitSearchHandler}>                              
                            <input css={searchBar} type="text" name="searchMember" placeholder="검색할 email 또는 전화번호를 입력하세요" />
                            <input css={searchButton} type="submit" value="search" />
                          </form>
                        <div css={selectRadio}>
                          <input type="radio" name="chk_info" value="email" checked={searchType === 'email'} onChange={handleSearchTypeChange}/>E-Mail
                          <input type="radio" name="chk_info" value="phone" checked={searchType === 'phone'} onChange={handleSearchTypeChange}/>Phone
                        </div>
                      </div>
                    </div>
                  <div css={listContainer}>
                    <span css={withList}>
                      함께할 친구 목록
                    </span>
                    <div css={listUserContainer}>
                      <ul css={listUser}>
                        {partyUsers.length > 0 ? (
                          partyUsers.map((partyMember, index) => (
                            <li css={user} key={index}>
                              <img css={userProfileImg} src={partyMember.profileImg} alt={partyMember.profileImg}/>
                              <span css={userName}>
                                {partyMember.name}
                              </span>
                              {partyMember.userId !== userInfo.userId ? (
                                <button onClick={() => removePartyHandler(index)}>x</button>
                              ):(<button onClick={() => removePartyHandler(index)} style={{ display: 'none' }}>x</button>)}
                            </li>
                          ))
                        ) : (
                          <li>추가된 인원이 없습니다.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <button css={buttonStyle} onClick={savePartyHandler}>저장</button>
                </div>
              </div>
          </div>
      </div>
  );
};

export default AddUserModal;
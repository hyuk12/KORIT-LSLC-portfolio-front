/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import logoTitle from '../../../images/logotitle.png';
import {useRecoilValue} from "recoil";
import {authenticationState} from "../../../store/atoms/AuthAtoms";

const modalStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const modalContent = css`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 50%;
  max-height: 60%;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const buttonStyle = css`
  margin-top: 40px;
  border: none;
  width: 144px;
  height: 44px;
  background-color: #0BD0AF;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;

  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD;
  }
`;
const modalContainer =css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  /* border: 1px solid #dbdbdb; */
  width: 100%;
  height: 100%;
`;
const searchContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  /* border: 1px solid #dbdbdb; */
  width: 100%;
  height: 500px;
`;

const searchHeader =css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  /* border: 1px solid #dbdbdb; */
  box-shadow: 0px 4px 6px #dbdbdb;
  margin-bottom: 5px;
  width: 100%;
  height: 30%;
`;
const logoBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #dbdbdb; */
  width: 25%;
  height: 100%;
`;
const logoImage = css`
  width: 50%;
  box-sizing: border-box;
  border-radius: 50%;
`;
const searchBox = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 75%;
  height: 100%;
  /* border: 1px solid #dbdbdb; */
`;

const searchTextBox = css`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 5px 0;
  font-size: 16px;
  
`;
const titleText =css`
  margin: 0;
  padding: 0px 5px;
  padding-right: 0px;
  font-size: 24px;
  text-align: center;
`;
const text =css`
  margin: 0;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const searchSubmit =css`
  display: flex;
  flex-wrap: wrap;
  padding: 5px 5px;
  width: 100%; 
  height: 30%;
`;

const searchBar = css`
  line-height: 30px;
  text-align: center;
  width: 80%;
  height: 30px;
`;

const searchButton = css`
  width: 20%;
  height: 30px;
  text-align: center;
`;

const selectRadio =css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 20%;
`;

const searchMain =css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  /* border: 1px solid #dbdbdb; */
  box-shadow: 0px 4px 6px #dbdbdb;
  width: 100%;
  height: 20%;
`;
const searchedUser = css`
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const searchUserInfo = css`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 100%;
`;

const profileImg =css`
  width: 10%;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
`;  

const userText =css`
  margin: 0;
  padding: 5px 10px;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
`;
const addPartyButton =css`
  display: flex;
  margin-right: 20px;
  width: 50px;
  text-align: center;
`;

const listContainer = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  /* border: 1px solid #dbdbdb; */
  width: 100%;
  height: 44%;
`; 
const withList =css`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  text-align: center;
  font-size: 20px;
  font-weight: 900;
  box-shadow: 0px 4px 6px #dbdbdb;
  /* border: 1px solid #dbdbdb; */
  width: 100%;
  height: 20%;
  
`;

const listUserContainer = css`
  width: 100%;
  height: 80%;
`;
const listUser= css`
  margin: 0;
  display:flex; 
  align-content:flex-start; 
  flex-direction:column; 
  flex-wrap:wrap; 
  overflow:auto;
  
  padding-left: 20px;
  border: 1px solid #dbdbdb;
  list-style: none;
  width: 100%;
  height: 100%;
`;

const user = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0px;
`;
const userProfileImg =css`
  
  margin-right: 10px;
  box-sizing: border-box;
  border-radius: 50%;
  
  width: 8%;

`; 

const userName= css`
  font-size: 22px;
  font-weight: 600;
  line-height: 20px;
`;

const AddUserModal = ({ isOpen, onClose, destination, userInfo }) => {
  const [searchType, setSearchType] = useState('email');
  const [searchValue, setSearchValue] = useState('');
  // const [myInfo, setMyInfo] = useState({
  //   userId: '',
  //   email: '',
  //   name: '',
  //   phone: '',
  //   profileImg: '',
  // }); 
  const [partyUsers, setPartyUsers] = useState([
    {
      userId: '',
      email: '',
      name: '',
      phone: '',
      profileImg: '',
    },
  ]);
  const [searchInfo, setSearchInfo] = useState({
    userId: '',
    email: '',
    name: '',
    phone: '',
    profileImg: '',
  })

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
        setPartyUsers([{
          userId: userInfo.userId,
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          profileImg: userInfo.profileImg,
        },])
        if (response?.data?.data) {
          setSearchInfo({
            userId: response.data.data.userId,
            email: response.data.data.email,
            name: response.data.data.name,
            phone: response.data.data.phone,
            profileImg: response.data.data.postsImgUrl,
          });
        }
     }    
  });

  const submitSearchHandler = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.searchMember.value;
    if(userInfo.email !== inputValue){
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

  const addPartyHandler = () => {
    const isAlreadyAdded = partyUsers.some((party) => party.userId === searchInfo.userId);
    // console.log(isAlreadyAdded);
    const updatedPartyData = !isAlreadyAdded ? [...partyUsers, searchInfo] : partyUsers;
    setPartyUsers(updatedPartyData);
    // console.log(partyUsers);
  };
  
  const removePartyHandler = (index) => {
    setPartyUsers((prevPartyData) => {
      const updatedPartyData = [...prevPartyData];
      updatedPartyData.splice(index, 1);
      return updatedPartyData;
    });
  };
  
  const savePartyHandler = () => {
    const partyData = {
      partyData: partyUsers.map((party) => {
        return {
          userId: party.userId,
          name: party.name,
        };
      }),
    };
  
    localStorage.setItem('partyData', JSON.stringify(partyData));
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
                    <div css={searchMain}>
                      {searchInfo ? (
                          <div css={searchedUser}>
                            <div css={searchUserInfo}>
                              <img css={profileImg} src={searchInfo.profileImg} alt={searchInfo.profileImg} />
                              <span css={userText}>{searchInfo.name}</span>
                            </div>
                            <button css={addPartyButton} onClick={addPartyHandler}>
                              추가
                            </button>
                          </div>
                        ) : (
                          <p>검색 결과가 없습니다.</p>
                        )
                      }
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
                  <button onClick={savePartyHandler}>저장</button>
                </div>
              </div>
          </div>
      </div>
  );
};

export default AddUserModal;
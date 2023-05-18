/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from "@emotion/react";
import logoTitle from '../../../images/logotitle.png';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

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
  width: 70%;
  height: 400px;
`;

const listUser = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb;
  width: 30%;
  height: 400px;
`; 

const searchHeader =css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  /* border: 1px solid #dbdbdb; */
  width: 100%;
  height: 125px;
`;
const logoBox = css`
  display: flex;
  justify-content: space-around;
  border: 1px solid #dbdbdb;

  width: 30%;
  height: 100%;
`;

const searchBox = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 70%;
  height: 100%;
  border: 1px solid #dbdbdb;
`;

const searchText = css`
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
  font-size: 20px;
  text-align: center;
`;
const text =css`
  margin: 0;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;
const searchSubmit =css`
  display: flex;
  flex-wrap: wrap;
  padding: 5px 5px;
  width: 100%; 
  height: 100%;
`;

const searchBar = css`
  width: 80%;
  height: 30px;
  text-align: center;
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

  border: 1px solid #dbdbdb;
  width: 100%;
  height: 300px;
`;
const menberUser =css`
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: flex-start;
  align-items: center;
  height: 50px;
`;

const logoImage = css`
  width: 50%;
  box-sizing: border-box;
  border-radius: 50%;
`;

const AddUserModal = ({ isOpen, onClose, destination }) => {
  const [searchType, setSearchType] = useState('email');
  const [searchValue, setSearchValue] = useState('');

  const { image, title, englishing } = destination;

  const searchUser = useQuery(['searchUser',searchType, searchValue], async() => {
    if (!searchValue) {
      return null;
    }

    const params = {
      type: searchType === 'email' ? 1 : 2,
      value: searchValue,
    }

    try {
      const response = await axios.get('http://localhost:8080/api/v1/user/search',{params});
      // console.log(response.data);
      return response;
    } catch (error) {
      console.log("해당 유저는 없습니다.");
    }
  },{
    onSuccess: (response) => {
      if (response && response.status === 200) {
        console.log("Successfully search");
      }
    }    
  });

  const submitSearchHandler = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.searchMember.value;
    setSearchValue(inputValue);
    e.target.reset();
  };
  
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  if (!isOpen || !destination) {
      return null;
  }
//  console.log(searchUser.data.data.data.name);
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
                        <div css={searchText}>
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
                      {/* {searchUser.isError ? (<p>해당하는 유저는 없습니다.</p>):( */}
                        {searchUser.data && searchUser.data.data && searchUser.data.data.data ? (
                          <div>{searchUser.data.data.data.name}</div>
                        ): (<p>No result</p>)}
                       {/* )} */}
                    </div>
                </div>
                <div css={listUser}>
                  
                </div>
              </div>
          </div>
      </div>
  );
};

export default AddUserModal;
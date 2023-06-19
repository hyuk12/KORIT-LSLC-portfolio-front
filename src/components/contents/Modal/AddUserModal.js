/** @jsxImportSource @emotion/react */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import logo from '../../../images/logo.png';
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
  searchIcon,
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
  radioContainer,
  RadioInput,
  RadioLabel,
  radioIcons,
  removeButton,
  saveButtonStyle
} from "./styles/ModalStyles";
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';


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
      const response = await axios.get('http://ec2-43-202-21-26.ap-northeast-2.compute.amazonaws.com/api/v1/user/search', option);

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
                        <img css={logoImage} src={logo} alt={logo}/>
                      </div>
                      <div css={searchBox}>
                        <div css={searchTextBox}>
                          <h4 css={titleText}>{title}</h4>
                          <p css={text}> 에 함께 여행갈 친구를 초대해보세요.</p>
                        </div>
                          <form css={searchSubmit} onSubmit={submitSearchHandler}>                              
                            <input css={searchBar} type="text" name="searchMember" placeholder="검색할 email 또는 전화번호를 입력하세요" />
                            <button css={searchButton} type="submit"><PersonSearchRoundedIcon css={searchIcon}/></button>
                          </form>
                        <div css={selectRadio}>

                          <div css={radioContainer}>
                            <RadioInput type='radio' name="chk_info"value="email"id='radio_email'checked={searchType === 'email'} onChange={handleSearchTypeChange}/>
                            <RadioLabel htmlFor='radio_email'>
                              <div css={radioIcons} ><AlternateEmailRoundedIcon css={radioIcons}/> email</div>
                            </RadioLabel>
                          </div>
                          <div css={radioContainer}>
                            <RadioInput type="radio" name="chk_info" value="phone" id='radio_phone' hecked={searchType === 'phone'} onChange={handleSearchTypeChange}/>
                            <RadioLabel htmlFor='radio_phone'>
                              <div css={radioIcons}><PhoneRoundedIcon css={radioIcons}/> phone</div>
                            </RadioLabel>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  <div css={listContainer}>
                    <span css={withList}>
                      함께 여행갈 친구
                    </span>
                    <div css={listUserContainer}>
                      <div css={listUser}> 
                        {partyUsers.length > 0 ? (
                          partyUsers.map((partyMember, index) => (
                            <div css={user} key={index}>
                              <img css={userProfileImg} src={partyMember.profileImg} alt={partyMember.profileImg}/>
                              <span css={userName}>
                                {partyMember.name}
                              </span>
                              {partyMember.userId !== userInfo.userId ? (
                                <button css={removeButton} onClick={() => removePartyHandler(index)}>x</button>
                              ):(<button onClick={() => removePartyHandler(index)} style={{ display: 'none' }}>x</button>)}
                            </div>
                          ))
                        ) : (
                          <li>추가된 인원이 없습니다.</li>
                        )}
                      </div>
                    </div>
                  </div>
                  <div css={saveButtonStyle}>
                      <SendRoundedIcon css={buttonStyle} onClick={savePartyHandler}/>
                  </div>
                </div>
              </div>
          </div>
      </div>
  );
};

export default AddUserModal;
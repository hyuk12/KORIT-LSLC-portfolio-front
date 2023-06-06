/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {Favorite, Person} from "@mui/icons-material";

export const modalStyle = css`
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

  font-family: 'Pretendard-Regular';
`;

export const modalContent = css`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 50%;
  height: 50%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

export const saveButtonStyle = css`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 44px;
  margin-top: 20px;
  background-color: transparent;
  /* border: none; */
  font-size: 40px;

`;

export const buttonStyle = css`
  color: #5555;
  font-size: 40px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #0BAF94;
  }

  &:active {
    color: #40D6BD;
  }
`;

export const contentsButtonStyle = css`
  width: 120px;
  height: 44px;
  font-size: 15px;
  color: white;
  border: none;
  background-color: #40D6BD;

  cursor: pointer;

  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD90;
  }
`;

export const modalContainer =css`
  display: flex;
  margin-top: 20px;
  width: 100%;
  height: 95%;
`;

export const searchContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: 100%;
`;

export const searchHeader =css`
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 6px #dbdbdb;
  margin-bottom: 5px;
  width: 100%;
  height: 35%;
  padding-bottom: 10px;
`;

export const logoBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 25%;
  height: 100%;
`;

export const logoImage = css`
  width: 50%;
  box-sizing: border-box;
  transform: scale(1.8);
`;

export const searchBox = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 65%;
  height: 100%;
`;

export const searchTextBox = css`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 5px 0;
  font-size: 16px;
`;

export const titleText =css`
  margin: 0;
  padding: 0px 5px;
  padding-right: 0px;
  font-size: 24px;
  text-align: center;
`;

export const text =css`
  margin: 0;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

export const searchSubmit =css`
  display: flex;
  flex-wrap: wrap;
  padding: 5px 5px;
  width: 100%; 
  height: 35%;
`;

export const searchBar = css`
  line-height: 55px;
  text-align: center;
  width: 80%;
  height: 100%;
  border: none;
  border-bottom: 1px solid #dbdbdbdb;
  outline: none;
`;

export const searchButton = css`
  width: 8%;
  height: 100%;
  text-align: center;
  
  border: none;
  background-color: transparent;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #0BAF94;
  }

  &:active {
    color: #40D6BD;
  }
`;

export const searchIcon = css`
  font-size: 32px;
`;

export const selectRadio = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 20%;
`;

export const radioContainer = css`
  margin: 0px 5px;

`;

export const RadioInput = styled.input`
  display: none;
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:checked + label{
    background-color: #40D6BD;
    color: white;
  }

`;
export const RadioLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    height: 1.9rem;
    border-radius: 2rem;

    cursor: pointer;
    background-color: #f2f4f6;
    color: #383838;
    font-size: 14px;

`;

export const radioIcons = css`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0px 3px;
  font-size: 14px;
`;

export const searchMain =css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  box-shadow: 0px 4px 6px #dbdbdb;
  width: 100%;
  height: 20%;
`;

export const searchedUser = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const searchUserInfo = css`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 100%;
`;

export const profileImg =css`
  width: 10%;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
`;

export const userText =css`
  margin: 0;
  padding: 5px 10px;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
`;

export const addPartyButton =css`
  display: flex;
  margin-right: 20px;
  width: 50px;
  text-align: center;
`;

export const listContainer = css`
  display: flex;
  flex-direction: column;
  margin-top:20px;
  width: 100%;
  height: 70%;
  box-shadow: 0px 4px 6px #dbdbdb;
`;

export const withList =css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 4%;
  width: 100%;
  height: 15%;

  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #383838;

  border-bottom: 1px solid #dbdbdbdb;
`;

export const listUserContainer = css`
  margin: 0;
  width: 100%;
  height: 85%;
  max-height: 85%;
  overflow: auto;
`;

export const listUser= css`
  display:flex; 
  flex-direction:column;

  overflow: auto;
  width: 100%;
  height: 85%;
  padding: 0;
  margin: 0;

  li {
    margin: 0;
    padding: 0;
  }
`;

export const user = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0px;
  margin-left: 5%;
  width: 50%;
`;

export const userProfileImg =css`
  margin-right: 10px;
  box-sizing: border-box;
  border-radius: 50%;
  width: 50px;
  height: 50px;

`;

export const userName= css`
  font-size: 22px;
  font-weight: 600;
  line-height: 20px;

  color: #555;
  font-weight: 600;
`;


export const removeButton = css`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #d94844;
`;

export const imageWrapper = css`
  width: 60%;
  padding-right: 20px;
  border-right: 1px solid #e1e1e1;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

export const imgStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const infoWrapper = css`
  flex-basis: 70%;
  padding-left: 20px;
`;

export const iconContainer = css`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const UserIconStyle = styled(Person)`
  font-size: 2rem;
`;

export const FavoriteIcon = styled(Favorite)`
  font-size: 2rem;
`;

export const Pstyle = css`
  color: #808080;
`;


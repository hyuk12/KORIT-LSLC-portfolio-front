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
`;

export const modalContent = css`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 50%;
  max-height: 70%;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const buttonStyle = css`
  margin-top: 50px;
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

export const modalContainer =css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
  width: 100%;
  height: 100%;
`;

export const searchContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: 500px;
`;

export const searchHeader =css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 0px 4px 6px #dbdbdb;
  margin-bottom: 5px;
  width: 100%;
  height: 30%;
`;

export const logoBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
`;

export const logoImage = css`
  width: 50%;
  box-sizing: border-box;
  border-radius: 50%;
`;

export const searchBox = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 75%;
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
  height: 30%;
`;

export const searchBar = css`
  line-height: 30px;
  text-align: center;
  width: 80%;
  height: 30px;
`;

export const searchButton = css`
  width: 20%;
  height: 30px;
  text-align: center;
`;

export const selectRadio =css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 20%;
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
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  margin-top:20px;
  width: 100%;
  height: 44%;
`;

export const withList =css`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  text-align: center;
  font-size: 20px;
  font-weight: 900;
  box-shadow: 0px 4px 6px #dbdbdb;
  width: 100%;
  height: 40%;
`;

export const listUserContainer = css`
  width: 100%;
  height: 80%;
`;

export const listUser= css`
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

export const user = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0px;
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


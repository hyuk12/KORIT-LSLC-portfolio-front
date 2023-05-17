/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {Favorite, Person} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import logoTitle from '../../../images/logotitle.png';
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
  width: 80%;
  max-height: 60%;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const infoWrapper = css`
  flex-basis: 70%;
  padding-left: 20px;
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

  width: 100%;

`;

const search = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #dbdbdb;
  width: 80%;
`;
const searchBox = css`
  display: flex;
  width: 70%;
  border: 1px solid #dbdbdb;
`;

const listUser = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb;
  width: 20%;
`; 

const logoIcon = css`
  display: flex;
  justify-content: space-around;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  width: 30%;
`;

const logoImage = css`
  border-radius: 50%;
  width: 50px;
  
`;

const UserIconStyle = styled(Person)`
  font-size: 2rem;
`;

const FavoriteIcon = styled(Favorite)`
  font-size: 2rem;
`;


const Pstyle = css`
  color: #808080;
`;

const AddUserModal = ({ isOpen, onClose, destination }) => {
    const navigate = useNavigate();

    if (!isOpen || !destination) {
        return null;
    }

    const { image, title, englishing } = destination;


    return (
        <div css={modalStyle} onClick={onClose}>
            <div css={modalContent} onClick={(e) => e.stopPropagation()}>
                <div css={modalContainer}>
                  <div css={search}>
                      <div css={searchBox}>
                        <img css={logoImage} src={logoTitle} alt={logoTitle}/>
                      <div>
                        <input type='search'/>
                        <button>검색</button>
                      </div>
                        <button>이메일</button>
                        <button>전화번호</button>
                      </div>
                      <ul>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                      </ul>
                  </div>
                  <div css={listUser}>
                    <div>함께하는 친구</div>
                    <div>
                      <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                      </ul>
                    </div>
                  </div>

                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
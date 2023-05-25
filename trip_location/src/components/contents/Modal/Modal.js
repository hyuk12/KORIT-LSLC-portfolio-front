/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Favorite, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

const imageWrapper = css`
 
  width: 60%;
  
  padding-right: 20px;
  border-right: 1px solid #e1e1e1;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const imgStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const infoWrapper = css`
  flex-basis: 70%;
  padding-left: 20px;
`;

const buttonStyle = css`
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

const iconContainer = css`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
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

const Modal = ({ isOpen, onClose, destination }) => {
  const navigate = useNavigate();

  if (!isOpen || !destination) {
    return null;
  }

  const { regionImgUrl: image, regionName: title, regionEngName: englishing, regionDescription: description } = destination;

  return (
    <div css={modalStyle} onClick={onClose}>
      <div css={modalContent} onClick={(e) => e.stopPropagation()}>
        <div css={imageWrapper}>
          <img css={imgStyle} src={image} alt={title} />
        </div>
        <div css={infoWrapper}>
          <h2>{title}</h2>
          <span>{englishing}</span>
          <p css={Pstyle}>{description}</p>
          <button css={buttonStyle} onClick={() => navigate(`/contents?destinationTitle=${title}`)}>일정 만들기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
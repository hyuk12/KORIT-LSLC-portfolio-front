/** @jsxImportSource @emotion/react */
import React from 'react';
import {useNavigate} from "react-router-dom";
import {buttonStyle, imageWrapper, imgStyle, infoWrapper, modalContent, modalStyle, Pstyle, contentsButtonStyle} from "./styles/ModalStyles";

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
          <button css={contentsButtonStyle} onClick={() => navigate(`/contents?destinationTitle=${title}`, {replace: true})}>일정 만들기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from "@emotion/react";

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
  flex-basis: 30%;
  padding-right: 20px;
  border-right: 1px solid #e1e1e1;
`;

const infoWrapper = css`
  flex-basis: 70%;
  padding-left: 20px;
`;



const Modal = ({ isOpen, onClose, destination }) => {
    if (!isOpen || !destination) {
        return null;
    }

    const { image, title } = destination;

    return (
        <div css={modalStyle} onClick={onClose}>
            <div css={modalContent} onClick={(e) => e.stopPropagation()}>
                <div css={imageWrapper}>
                    <img src={image} alt={title} style={{ width: "100%" }} />
                </div>
                <div css={infoWrapper}>
                    <h2>{title}</h2>
                    <p>
                        여기에 간단한 설명글이 들어갑니다. 해당 지역의 특징과 매력을 소개해 주세요.
                    </p>
                    <button>여행 경로 설정하기</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
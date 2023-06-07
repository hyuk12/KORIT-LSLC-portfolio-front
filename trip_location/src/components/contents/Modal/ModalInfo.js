import React from 'react';
import { modalContainer, modalStyle, modalInfoBox } from './styles/ModalStyles';



const ModalInfo = ({ modalOpen, handleCloseModal }) => {
    return (
        <div css={modalInfoBox} >
            <div css={modalInfoBox}>
            <h1>모달 내용</h1>
            <button onClick={handleCloseModal}>닫기</button>
            </div>
        </div>
    );
};

export default ModalInfo;
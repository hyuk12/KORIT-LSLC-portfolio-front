import React from 'react';
import { modalContainer, modalStyle, modalInfoBox, infoImgStyle } from './styles/ModalStyles';
import infoImg from '../../../images/infoImg3.png'


const ModalInfo = ({ isOpen, onClose  }) => {
    return (
        <div css={modalInfoBox} >
            <div>
                <img  css={infoImgStyle} src={infoImg}></img>
            </div>
            <button onClick={onClose}>닫기</button>
        </div>
    );
};

export default ModalInfo;
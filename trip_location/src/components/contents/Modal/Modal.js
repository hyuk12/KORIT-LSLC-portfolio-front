/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {Bolt, Favorite, History, Language, Person} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

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
  flex-basis: 50%;
  padding-right: 20px;
  border-right: 1px solid #e1e1e1;
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
  background-color: #98dde3;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
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

    const { image, title, englishing } = destination;


    return (
        <div css={modalStyle} onClick={onClose}>
            <div css={modalContent} onClick={(e) => e.stopPropagation()}>
                <div css={imageWrapper}>
                    <img src={image} alt={title} style={{ width: "100%" }} />
                </div>
                <div css={infoWrapper}>
                    <h2>{title}</h2>
                    <span>{englishing}</span>
                    <p css={Pstyle}>
                        국제 해양관광의 중심 전남 여수시. 3천여 그루의 동백나무로 가득 찬 붉은 섬 오동도는 웰빙 트래킹 코스를 갖추고
                        있어 한층 더 운치 있다. 해상 케이블카를 타면 마치 바다 위를 걷는 듯한 느낌이 들며 탁 트인 바다 전망을 감상할
                        수 있다. 노래 가사에도 나오는 낭만적이고 황홀한 여수의 밤바다는 돌산대교와 음악분수가 함께 어우러져 멋진 야
                        경을 선사한다. 공식 밥도둑 게장 백반과 돌산 갓김치, 갈치조림 등 풍부한 먹거리 까지 갖춘 인기 만점 관광지!
                    </p>
                    <div css={iconContainer}>
                        <UserIconStyle /> <FavoriteIcon />
                    </div>
                    <button css={buttonStyle} onClick={() => navigate('/contents', {destinationTitle: title})}>일정 만들기</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
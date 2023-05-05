/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from "@emotion/react";
import busan from '../../../images/haeundae.jpg'
import jeju from '../../../images/forest-jeju.jpg'
import yeosu from '../../../images/yeosu.jpg'
import gyeongju from '../../../images/gyeongju.jpg'
import seoul from '../../../images/seoul.jpg'
import gangneung from '../../../images/gangneung.jpg'
import Modal from "../Modal/Modal";

const destinations = [
    {
        id: 1,
        image: jeju,
        alt: "제주도",
        title: "제주도 산림욕",
    },
    {
        id: 2,
        image: yeosu,
        alt: "여수",
        title: "여수 해수욕장",
    },
    {
        id: 3,
        image: busan,
        alt: "부산",
        title: "부산 해운대 해수욕장",
    },
    {
        id: 4,
        image: gyeongju,
        alt: "경주",
        title: "경주 동궁과 월지",
    },
    {
        id: 5,
        image: seoul,
        alt: "서울",
        title: "서울 남산타워",
    },
    {
        id: 6,
        image: gangneung,
        alt: "강릉",
        title: "강릉 경포대 해수욕장",
    },
];

const container = css`
  position: relative;
  box-shadow: 1px 1px 1px 2px #e1e1e1;
  width: 30%;
  height: 350px;
  margin-right: 10px;
`;

const popularImg = css`
  position: relative;
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: cover;
  width: 100%;
  height: 100%;
`;


const textOverlay = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  color: white;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;

const slider = css`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 350px;
`;

const leftButton = css`
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 2;
  transform: translateY(-50%);
  background-color: transparent;
  border: 1px solid #ccc;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-out;

  &:hover {
    background-color: #eee;
  }
`;

const rightButton = css`
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 2;
  transform: translateY(-50%);
  background-color: transparent;
  border: 1px solid #ccc;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-out;

  &:hover {
    background-color: #eee;
  }
`;





const hoverStyles = css `opacity: 1`;



const PopularDestinations = ({ contents }) => {
    const [page, setPage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null)

    const handleNextPage = () => {
        setPage((page + 1) % destinations.length);
    };

    const handlePrevPage = () => {
        setPage(page === 0 ? destinations.length - 1 : page - 1);
    };

    const handleImageClick = (destination) => {
        setSelectedDestination(destination);
        setIsModalOpen(true)
    };

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <div
                css={contents}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div css={slider}>
                    {destinations.map((destination, index) => (
                        <div
                            key={destination.id}
                            css={container}
                            style={{
                                order: index - page < 0 ? index - page + destinations.length : index - page,
                                display:
                                    Math.abs(index - page) <= 1 ||
                                    (Math.abs(index - page) === destinations.length - 1 && index !== (page + 1) % destinations.length)
                                        ? "block"
                                        : "none",
                            }}
                        >
                            <img
                                css={popularImg}
                                src={destination.image}
                                alt={destination.alt}
                                onClick={() => handleImageClick(destination)}
                            />
                            <div css={textOverlay}>{destination.title}</div>
                            {index === page && (
                                <button
                                    css={[leftButton, isHovered && hoverStyles]}
                                    onClick={handlePrevPage}
                                >
                                    Prev
                                </button>
                            )}
                            {index === (page + 1) % destinations.length && (
                                <button
                                    css={[rightButton, isHovered && hoverStyles]}
                                    onClick={handleNextPage}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                destination={selectedDestination}
            />
        </>

    );



}
export default PopularDestinations;


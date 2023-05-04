/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {css} from "@emotion/react";
import haeundae from '../../../images/haeundae.jpg'
import jeju from '../../../images/forest-jeju.jpg'

const destinations = [
    {
        id: 1,
        image: haeundae,
        alt: '해운대',
        title: '해운대 해수욕장',
    },
    {
        id: 2,
        image: jeju,
        alt: '제주도',
        title: '제주도 산림욕',
    },
    {
        id: 3,
        image: jeju,
        alt: '제주도',
        title: '제주도 산림욕',
    },
    {
        id: 4,
        image: haeundae,
        alt: '해운대',
        title: '해운대 해수욕장',
    },
];

const container = css`
  position: relative;
  box-shadow: 1px 1px 1px 2px #e1e1e1;
  width: 45%;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  width: 100%;
  text-align: center;
  font-size: 24px;
  text-shadow: 0px 1px 1px 2px #dbdbdb;
`;

const slider = css`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  transform: translateX(${(props) => -100 * props.page}%);
  transition: transform 0.3s ease-out;
`;

const paginationButtons = css`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  padding: 0 20px;
`;

const buttonStyles = css`
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

const hoverStyles = css`
  opacity: 1;
`;


const PopularDestinations = ({ contents }) => {

    const [page, setPage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const handleNextPage = () => {
        if(page < Math.ceil((destinations.length / 2) - 1)) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if(page > 0) {
            setPage(page - 1);
        }
    }

    return (
        <div css={contents}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
            <div css={[slider, {transform: `translateX(-${100 * page}%)`}]}>
                {destinations.slice(page * 2, page * 2 + 2).map((destination) => (
                    <div key={destination.id} css={container}>
                        <img css={popularImg} src={destination.image} alt={destination.alt}/>
                        <div css={textOverlay}>
                            {destination.title}
                        </div>
                    </div>
                ))}
                <div css={paginationButtons}>
                    <button css={[buttonStyles, isHovered && hoverStyles]} onClick={handlePrevPage}>Prev</button>
                    <button css={[buttonStyles, isHovered && hoverStyles]} onClick={handleNextPage}>Next</button>
                </div>
            </div>

        </div>
    );
};

export default PopularDestinations;
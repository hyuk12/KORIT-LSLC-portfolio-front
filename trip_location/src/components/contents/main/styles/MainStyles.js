/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {TextField} from "@mui/material";

export const contents = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
  min-width: 80%;
`;

export const searchContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const StyleInput = styled(TextField)`
  margin-bottom: 50px;
  width: 100%;
`;

export const searchField = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const carouselStyle = css`
  width: 100%;
`;

export const paperStyle = css`
  position: relative;
  margin: 0 10px;
  width: calc(100% / 3 - 20px);
  height: 350px;
  cursor: pointer;
  display: inline-block;
`;

export const reviewPaperStyle = css`
  position: relative;
  margin: 0 10px;
  width: calc(100% / 2 - 20px);
  height: 350px;
  cursor: pointer;
  display: inline-block;
`;

export const popularImg = css`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const textOverlay = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
  color: white;
  font-size: 1.5rem;
  pointer-events: none;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  text-align: center;
`;

export const largeText = css`
  font-size: 2rem;
`;

export const smallText = css`
  font-size: 1rem;
`;


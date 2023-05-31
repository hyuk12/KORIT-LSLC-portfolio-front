/** @jsxImportSource @emotion/react */
import React from 'react';
import {Toolbar} from "@mui/material";
import {css} from "@emotion/react";
import logoimg from "../../images/Trip_Together.gif";
import {useNavigate} from "react-router-dom";
import NavBarButton from "../Button/NavBarButton";

const divStyle = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 300px;
    height: 64px;
`;
const navStyles = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 1000;
`;

const toolbarStyle = css`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
`;



const logoContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 64px;
    
    border: none;
    background-color: white;
    overflow: hidden;
    
    & :hover {
        cursor: pointer;
    }
`;

const logoImage = css`
    width: 300px;
    transform: scale(0.8);
`;



const Nav = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/home");
    };

    const handleSignInClick = () => {
        navigate("/auth/login");
    };

    const handleSignUpClick = () => {
        navigate("/auth/signup");
    };



    return (
        <React.Fragment>
            <Toolbar css={[toolbarStyle, navStyles]}>
                <div css={divStyle}>
                </div>
                <button onClick={handleLogoClick} css={logoContainer}>
                    <img css={logoImage} src={logoimg} alt={logoimg} />
                </button>
                <NavBarButton handleSignUpClick={handleSignUpClick} handleSignInClick={handleSignInClick} />
            </Toolbar>
        </React.Fragment>
    );
};

export default Nav;

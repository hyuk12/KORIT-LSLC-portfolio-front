/** @jsxImportSource @emotion/react */
import React from 'react';
import {Toolbar} from "@mui/material";
import logoimg from "../../images/Trip_Together.gif";
import {useNavigate} from "react-router-dom";
import NavBarButton from "../Button/NavBarButton";
import {divStyle, logoContainer, logoImage, navStyles, toolbarStyle} from "./styles/NavStyles";

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

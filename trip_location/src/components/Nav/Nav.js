/** @jsxImportSource @emotion/react */
import React from 'react';
import {Button, Toolbar, Typography} from "@mui/material";
import {css} from "@emotion/react";
import logoTitle from '../../images/logotitle.png';
import {useNavigate} from "react-router-dom";

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
  justify-content: center;
  margin: 0 auto;
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
`;

const logoImage = css`
  border-radius: 50%;
  width: 50px;
  
`;

const buttonStyle = css`
  margin-left: 5px;
  border: 1px solid #bababa;
  border-radius: 5px;
  
  color: #7c7f86;
  
  &:hover {
    background-color: #dbdbdb;
    color: #282c34;
  }
`;


const Nav = (props) => {
    const { section, title } = props;
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    }

    const handleSignInClick = () => {
        navigate("/login");
    }

    const handleSignUpClick = () => {
        navigate("/user");
    }

    const handleMyPageClick = () => {
        navigate("/user/:id")
    }

    return (
        <React.Fragment>
            <Toolbar css={[toolbarStyle, navStyles]}>
                <Button onClick={handleLogoClick}>
                    <img css={logoImage} src={logoTitle} alt={logoTitle}/>
                </Button>
                <Typography
                    component = "h2"
                    variant = "h5"
                    color = "inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}>
                    {title}
                </Typography>
                <Button
                    css={buttonStyle}
                    size={"small"}
                    onClick={handleSignUpClick}>
                    Sign up
                </Button>
                <Button
                    css={buttonStyle}
                    size={"small"}
                    onClick={handleSignInClick}>
                    Sign in
                </Button>
                <Button
                    css={buttonStyle}
                    size={"small"}
                    onClick={handleMyPageClick}>
                    My Page
                </Button>
            </Toolbar>
        </React.Fragment>

    );
};

export default Nav;
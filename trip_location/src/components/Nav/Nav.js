/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {Button, Toolbar, Typography} from "@mui/material";
import {css} from "@emotion/react";
import logoTitle from '../../images/logotitle.png';
import logoimg from "../../images/Trip_Together.gif";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import axios from "axios";

import { useRecoilState, useRecoilValue } from "recoil";
import { authenticationState } from "../../store/atoms/AuthAtoms";

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

const divStyle = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 300px;
    height: 64px;
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

const Nav = () => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useRecoilState(authenticationState);
    const [refresh, setRefresh] = useState(true);
    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: {accessToken}});
        return response;
    }, {
        enabled: refresh,
        onSuccess: (response) => {
            setRefresh(false)
        }
    });

    const handleLogoClick = () => {
        navigate("/home");
    };

    const handleSignInClick = () => {
        navigate("/auth/login");
    };

    const handleSignUpClick = () => {
        navigate("/auth/signup");
    };

    const handleMyPageClick = () => {
        navigate(`/user/${principal.data.data.userId}`);
    };

    const handleLogOut = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
            setAuthState({
                isAuthenticated: false,
            });
            navigate("/auth/login");
        }
    };

    return (
        <React.Fragment>
            <Toolbar css={[toolbarStyle, navStyles]}>
                <div css={divStyle}>
                </div>
                <button onClick={handleLogoClick} css={logoContainer}>
                    <img css={logoImage} src={logoimg} alt={logoimg} />
                </button>
                {!authState.isAuthenticated ? (
                    <div css={divStyle}>
                        <Button
                            css={buttonStyle}
                            size={"small"}
                            onClick={handleSignUpClick}
                        >
                            Sign up
                        </Button>
                        <Button
                            css={buttonStyle}
                            size={"small"}
                            onClick={handleSignInClick}
                        >
                            Sign in
                        </Button>
                    </div>
                ) : (
                    <div css={divStyle}>
                        <Button
                            css={buttonStyle}
                            size={"small"}
                            onClick={handleMyPageClick}
                        >
                            My Page
                        </Button>
                        <Button
                            css={buttonStyle}
                            size={"small"}
                            onClick={handleLogOut}
                        >
                            Log Out
                        </Button>
                    </div>
                )}
            </Toolbar>
        </React.Fragment>
    );
};

export default Nav;

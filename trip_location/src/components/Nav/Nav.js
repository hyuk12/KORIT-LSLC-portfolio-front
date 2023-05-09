/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import {Button, Toolbar, Typography} from "@mui/material";
import {css} from "@emotion/react";
import logoTitle from '../../images/logotitle.png';
import {useNavigate} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import {useRecoilState} from "recoil";
import {isLoggedOutState} from "../../atoms/Auth/AuthAtoms";
import axios from "axios";

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


const Nav = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [ refresh, setRefresh ] = useState(false);
    const [ isLoggedOut, setIsLoggedOut ] = useRecoilState(isLoggedOutState);

    console.log(isLoggedOut)
    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: {accessToken}});
        return response;
    }, {
        enabled: refresh
    });

    useEffect(() => {
        setRefresh(isLoggedOut);
    }, [isLoggedOut]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            setIsLoggedOut(true);
        }else {
            setIsLoggedOut(false);
        }
    }, []);

    const handleLogoClick = () => {
        navigate("/");
    }

    const handleSignInClick = () => {
        navigate("/login");
    }

    const handleSignUpClick = () => {
        navigate("/signup");
    }

    const handleMyPageClick = () => {
        navigate(`/user/${principal.data.data.userId}`);
    }

    const handleLogOut = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('accessToken');
            setIsLoggedOut(false);
        }
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
                    {"Trip Location"}
                </Typography>
                {!isLoggedOut ? (<div>
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
                </div>) : (<div>
                    <Button
                        css={buttonStyle}
                        size={"small"}
                        onClick={handleMyPageClick}>
                        My Page
                    </Button>
                    <Button
                        css={buttonStyle}
                        size={"small"}
                        onClick={handleLogOut}>
                        Log Out
                    </Button>
                </div>)}
            </Toolbar>
        </React.Fragment>

    );
};

export default Nav;
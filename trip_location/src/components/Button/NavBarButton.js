/** @jsxImportSource @emotion/react */
import React from 'react';
import {Button} from "@mui/material";
import {useQuery} from "react-query";
import axios from "axios";
import {useRecoilState} from "recoil";
import {authenticationState} from "../../store/atoms/AuthAtoms";
import {useNavigate} from "react-router-dom";
import {divStyle, buttonStyle} from "./styles/ButtonStyle";


const NavBarButton = ({ handleSignUpClick, handleSignInClick }) => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useRecoilState(authenticationState);
    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://43.202.21.26/api/v1/user/principal', { headers: { Authorization: localStorage.getItem("accessToken") }});

        return response;
    }, {
        enabled: !!authState.isAuthenticated,
        refetchOnWindowFocus: false,
    });

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
        <div>
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
        </div>
    );
};

export default NavBarButton;

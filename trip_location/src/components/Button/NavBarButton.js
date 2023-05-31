/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {Button} from "@mui/material";
import {useQuery} from "react-query";
import axios from "axios";
import {useRecoilState} from "recoil";
import {authenticationState} from "../../store/atoms/AuthAtoms";
import {css} from "@emotion/react";
import {useNavigate} from "react-router-dom";

const divStyle = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 300px;
    height: 64px;
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

const NavBarButton = ({ handleSignUpClick, handleSignInClick }) => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useRecoilState(authenticationState);
    const [refresh, setRefresh] = useState(true);
    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: {accessToken}});
        console.log("요청")
        return response;
    }, {
        enabled: refresh,
        onSuccess: (response) => {
            if (response.status === 200) {
                setRefresh(false);
            }
        }
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

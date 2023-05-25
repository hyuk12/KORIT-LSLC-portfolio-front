import React from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import {authenticationState} from "../../../store/atoms/AuthAtoms";

const OAuth2Login = () => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useRecoilState(authenticationState);
    const [searchParams, setSearchParams] = useSearchParams();
    const accessToken = searchParams.get("accessToken");

    if (!!accessToken) {
        localStorage.setItem("accessToken", accessToken);
        setAuthState({
            isAuthenticated: true,
        });
        navigate("/", {replace: true})
    }
    return (
        <></>
    );
};

export default OAuth2Login;
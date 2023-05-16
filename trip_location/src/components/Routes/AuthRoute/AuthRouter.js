import React, {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {useQuery} from "react-query";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {authenticationState} from "../../../store/atoms/AuthAtoms";

const AuthRouter = ({ path, element }) => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useRecoilState(authenticationState);

    const authenticated = useQuery(["authenticated"], async () => {
        const option = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.get('http://localhost:8080/api/v1/auth/authenticated', option)
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                if(response.data) {
                    setAuthState(true);
                }
            }
        }
    });

    useEffect(() => {
        if(authenticated.isSuccess) {
            const authenticatedPaths = ['/user', '/contents']
            const authPath = '/auth';

            if(authState && path.startsWith(authPath)) {
                navigate("/");
            }

            if(!authState && authenticatedPaths.filter(authenticatedPath => path.startsWith(authenticatedPath)).length > 0) {
                alert("로그인이 필요한 페이지입니다.")
                navigate("/auth/login");
            }
        }
    }, [authState, authenticated.isSuccess, path, navigate])

    if (authenticated.isLoading) {
        return <></>
    }

    return element;

};

export default AuthRouter;
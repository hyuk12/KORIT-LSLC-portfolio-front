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
                "Authorization": `${localStorage.getItem("accessToken")}`
            }
        }
        return await axios.get('http://ec2-43-202-21-26.ap-northeast-2.compute.amazonaws.com/api/v1/auth/authenticated', option)
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                if(response.data) {
                    setAuthState({
                        isAuthenticated: true,
                    });
                }
            }
        },
    });

    useEffect(() => {

        if(authenticated.isSuccess) {
            const authenticatedPaths = ['/user', '/contents']
            const authPaths = ['/auth', '/home'];
            if(path === "/"){
                navigate("/home");
            }

            if(authState.isAuthenticated && authPaths.filter(authPath => path.startsWith(authPath)).length > 0) {
                navigate("/home");
            }


            if(!authState.isAuthenticated && authenticatedPaths.filter(authenticatedPath => path.startsWith(authenticatedPath)).length > 0) {
                alert("로그인이 필요한 페이지입니다.")
                setAuthState({
                    isAuthenticated: false,
                })
                navigate("/auth/login", {replace : true});
            }
        }
    }, [authState.isAuthenticated, setAuthState, authenticated.isSuccess, path, navigate])

    if (authenticated.isLoading) {
        return <></>
    }

    return element;

};

export default AuthRouter;
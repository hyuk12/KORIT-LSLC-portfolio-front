import React, {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {authenticatedState, refreshState} from "../../../atoms/Auth/AuthAtoms";
import {useQuery} from "react-query";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";

const AuthRouter = ({ path, element }) => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useRecoilState(refreshState);
    const {data, isLoading} = useQuery(["authenticated"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/authenticated', {params: {accessToken}});
        return response;
    },{
        enabled: refresh
    });

    useEffect(() => {
        if(!refresh) {
            setRefresh(true);
        }
    },[refresh])
    if (isLoading) {
        return (<div>loading...</div>);
    }

        if (!isLoading) {
            const permitAll = ['/login', '/signup'];

            if(!data.data) {
                if (permitAll.includes(path)) {
                    return element;
                }
                return <Navigate to="/login" />;
            }

            if(permitAll.includes(path)) {
                return <Navigate to="/" />;
            }

            return element;
        }

    };

export default AuthRouter;
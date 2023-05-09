import React, {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {refreshState} from "../../../atoms/Auth/AuthAtoms";
import {useQuery} from "react-query";
import axios from "axios";
import {Navigate} from "react-router-dom";

const AuthRouter = ({ path, element }) => {
    // refreshState를 쓰겠다.
    const [refresh, setRefresh] = useRecoilState(refreshState);
    const {data, isLoading} = useQuery(["authenticated"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/authenticated', {params: {accessToken}});
        return response;
    }, {
        enabled: refresh
    });


    useEffect(() => {
        if(!refresh) {
            setRefresh(true);
        }
    },[refresh]);

    if (isLoading) {
        return (<div>loading...</div>);
    }


    if (!isLoading) {
        const permitAll = ['/login', '/user'];

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
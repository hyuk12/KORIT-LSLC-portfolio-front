import axios from "axios";

export const getAuthentication = (accessToken) => {
    return axios.get('http://localhost:8080/api/v1/auth/authenticated', {params: {accessToken}});
}
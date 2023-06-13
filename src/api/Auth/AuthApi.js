import axios from "axios";

export const getAuthentication = (accessToken) => {
    return axios.get('http://43.202.21.26/api/v1/auth/authenticated', {params: {accessToken}});
}
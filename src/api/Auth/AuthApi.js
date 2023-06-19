import axios from "axios";

export const getAuthentication = (accessToken) => {
    return axios.get('http://ec2-43-202-21-26.ap-northeast-2.compute.amazonaws.com/api/v1/auth/authenticated', {params: {accessToken}});
}
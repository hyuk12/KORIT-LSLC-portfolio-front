import {atom} from "recoil";


export const refreshState = atom({
    key: 'refreshState',
    default: true
});

export const isLoggedOutState = atom({
    key: 'isLoggedOutState',
    default: false
});

export const authenticatedState = atom({
    key: 'authenticatedState',
    default: false
});




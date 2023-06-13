import {atom} from "recoil";

export const authenticationState = atom({
    key: "authentication",
    default: {
        isAuthenticated: false,
    },

});

export const updateUserState = atom({
    key: 'updateUserState', // unique ID (with respect to other atoms/selectors)
    default: {
        profileImg: '',
        email: '',
        name:  '',
        phone: '',
        address:  ''
    }, // default value (aka initial value)
});
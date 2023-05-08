/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const signupContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
`
;
const signupBox = css`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 8px;
`;

const signupText = css`
    margin-top: 80px;
    margin-bottom: 30px;
`;

const inputContainer = css`
    width: 500px;
`;

const StyleInput = styled(TextField)`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
`;

const addressForm = css`
    width: 100%;
    margin-top: 15px;
`;

const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;

const submitButton = css`
    height: 45px;
    margin-top: 30px;
    margin-bottom: 20px;

    background-color: #0BD0AF;
    color: white;

    font-size: 15px;
    
    &:hover {
        background-color: #0BAF94;
    }

    &:active {
        background-color: #40D6BD;
    }
`;

const address = [
    "서울특별시",
    "부산광역시",
    "인천광역시",
    "대구광역시",
    "대전광역시",
    "광주광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도"
];

const SignUp = () => {
    const [ addressList, setAddressList ] = useState([]);
    const [ signupUser, setSignupUser ] = useState({
        profileImg: '',
        email: '',
        password: '',
        name: '',
        phone: '',
        address: ''
    });
    const [ errorMessages, setErrorMessages ] = useState({
        profileImg: '',
        email: '',
        password: '',
        name: '',
        phone: '',
        address: ''
    });

    const navigate = useNavigate();

      
    // 로그인
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setSignupUser(
            {
                ...signupUser,
                [name]: value
            }
        )
    };

    const signupHandleSubmit = async () => {
        const data = { ...signupUser, address: addressList };

        const option = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try{
            const response = await axios.post("http://localhost:8080/api/v1/auth/user", JSON.stringify(data), option);
            setErrorMessages({
            profileImg: '',
            email: '',
            password: '',
            name: '',
            phone: '',
            address: ''});
            
            const accessToken = response.data.grantType + " " + response.data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            navigate('/');

        } catch (error) {
            setErrorMessages({
            profileImg: '',
            email: '',
            password: '',
            name: '',
            phone: '',
            address: '',
            ...error.response.data.errorData
            });

        }

    }


    return (
        <Grid component="main" maxWidth="xs" css={signupContainer}>

            <Box css={signupBox}>
                <Typography component="h1" variant="h5" css={signupText}>
                    Sign Up
                </Typography>


                <Box component="form" css={inputContainer}>
                    <StyleInput
                        required
                        id="email"
                        label="이메일"
                        placeholder="abc@gmail.com"
                        name="email"
                        autoComplete="email"
                        onChange={onChangeHandler}
                        autoFocus
                        />
                    <div css={errorMsg}>{errorMessages.email}</div>

                    <StyleInput
                        required
                        id="password"
                        label="비밀번호"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={onChangeHandler}
                    />
                    <div css={errorMsg}>{errorMessages.password}</div>

                    <StyleInput
                        required
                        id="name"
                        label="이름"
                        name="name"
                        autoComplete="name"
                        onChange={onChangeHandler}
                    />
                    <div css={errorMsg}>{errorMessages.name}</div>

                    <StyleInput
                        required
                        id="phone"
                        label="연락처"
                        placeholder="010-1234-1234"
                        name="phone"
                        autoComplete="tel"
                        onChange={onChangeHandler}
                    />
                    <div css={errorMsg}>{errorMessages.phone}</div>

                    <Box>
                        <FormControl css={addressForm}>
                            <InputLabel id="addressSelectLabel">주소</InputLabel>
                            <Select
                                required
                                labelId="addressSelectLabel"
                                id="address"
                                value={addressList}
                                label="주소"
                                onChange={(event) => setAddressList(event.target.value)}
                            >
                                {address.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>
                    <div css={errorMsg}>{errorMessages.address}</div>

                    <Button css={submitButton}
                        type='button'
                        onClick={signupHandleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                    </Button>
                </Box>
            </Box>
            
        </Grid>
    );
};

export default SignUp;
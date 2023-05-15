/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
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

const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;

const guideMsg = css`
    font-size: 12px;
    color: #888;
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

const PasswordReset = () => {
    const [ addressList, setAddressList ] = useState([]);
    const [ searchUser, setSearchUser ] = useState({email: ''});
    const [ errorMessages, setErrorMessages ] = useState({email: ''});

    const navigate = useNavigate();

      
    // 로그인
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setSearchUser(
            {
                [name]: value
            }
        )
    };

    const signupHandleSubmit = async () => {
        const data = { ...searchUser };

        const option = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try{
            const response = await axios.get("http://localhost:8080/api/v1/auth/search", JSON.stringify(data), option);
            setErrorMessages({email: ''});
            
            const accessToken = response.data.grantType + " " + response.data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            navigate('/');

        } catch (error) {
            setErrorMessages({ email: '', ...error.response.data.errorData});

        }

    }

    return (
        <Grid component="main" maxWidth="xs" css={signupContainer}>

            <Box css={signupBox}>
                <Typography component="h1" variant="h5" css={signupText}>
                    Password Reset
                </Typography>


                <Box component="form" css={inputContainer}>
                    <div css={errorMsg}>{errorMessages.email}</div>
                    <StyleInput
                        required
                        id="password"
                        label="비밀번호"
                        placeholder="8자 이상, 특수문자 포함"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={onChangeHandler}
                        />

                    <div css={guideMsg}>새로운 비밀번호를 입력해주세요.</div>

                    <div css={errorMsg}>{errorMessages.email}</div>
                    <StyleInput
                        required
                        id="password"
                        label="비밀번호 확인"
                        // placeholder="8자 이상, 특수문자 포함"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={onChangeHandler}
                        />

                    <div css={guideMsg}>비밀번호를 한번 더 입력해주세요.</div>
                    
                    <Button css={submitButton}
                        type='button'
                        onClick={signupHandleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Next
                    </Button>
                </Box>
            </Box>
            
        </Grid>
    );
};

export default PasswordReset;
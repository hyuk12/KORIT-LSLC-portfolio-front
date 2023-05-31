/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const signupContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
`;

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

const guideMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;

const inputMsg = css`
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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const navigate = useNavigate();

    const [ resetUserPassword, setResetUserPassword ] = useState('');
    const [ guideMessages, setGuideMessages ] = useState({
        resetPassword: '',
        confirmPassword: ''
    });



    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === 'resetPassword') {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
            if (!passwordRegex.test(value)) {
                setGuideMessages((messages) => ({
                    ...messages,
                    resetPassword: '비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자리로 입력해주세요.'
                }));
            } else {
                setGuideMessages((messages) => ({
                    ...messages,
                    resetPassword: '올바른 비밀번호 형식입니다. :)'
                }));
                setResetUserPassword(value);
            }
        } else if (name === 'confirmPassword') {
            if (value !== resetUserPassword) {
                setGuideMessages((messages) => ({
                    ...messages,
                    confirmPassword: '비밀번호가 일치하지 않습니다.'
                }));
            } else {
                setGuideMessages((messages) => ({
                    ...messages,
                    confirmPassword: ''
                }));
            }
        }

    }


    const signupHandleSubmit = async () => {
        const resetPasswordData = {
            email: email,
            password: resetUserPassword
        };

        const option = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.put('http://localhost:8080/api/v1/auth/password/reset', resetPasswordData, option);
            setGuideMessages('');
            alert('회원정보가 변경되었습니다.');
            navigate('/auth/login');
        } catch (error) {
            alert('ERROR');
        }

    }

    return (
        <Grid component="main" maxWidth="xs" css={signupContainer}>

            <Box css={signupBox}>
                <Typography component="h1" variant="h5" css={signupText}>
                    Password Reset
                </Typography>


                <Box component="form" css={inputContainer}>
                    <StyleInput
                        required
                        id="password"
                        label="비밀번호"
                        placeholder="8자 이상, 특수문자 포함"
                        name="resetPassword"
                        type="password"
                        autoComplete="current-password"
                        onChange={onChangeHandler}
                    />

                    <div css={inputMsg}>새로운 비밀번호를 입력해주세요.</div>

                    <div css={guideMsg}>{guideMessages.resetPassword}</div>
                    <StyleInput
                        required
                        id="password"
                        label="비밀번호 확인"
                        name="confirmPassword"
                        type="password"
                        autoComplete="current-password"
                        onChange={onChangeHandler}
                    />

                    <div css={guideMsg}>{guideMessages.confirmPassword}</div>

                    <Button css={submitButton}
                        type='button'
                        onClick={signupHandleSubmit}
                        fullWidth
                        variant="contained"
                    >
                        Next
                    </Button>
                </Box>
            </Box>

        </Grid>
    );
};

export default PasswordReset;
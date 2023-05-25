/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticationState } from "../../store/atoms/AuthAtoms";
import { useMutation, useQuery } from 'react-query';

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




const ModifyPassword = () => {

    const navigate = useNavigate();
    const [ authState, setAuthState] = useRecoilState(authenticationState);
    const [ updateUserPassword, setUpdateUserPassword] = useState({
        email: '',
        password: ''
    });
    const [ isNewPassword, setIsNewPassword ] = useState(true);
    const [ isConfirmPassword, setIsConfirmPassword ] = useState(true);
    const [ guideMessages, setGuideMessages ] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', { params: { accessToken } });
        return response;
    }, {
        enabled: authState.isAuthenticated,
        onSuccess: (response) => {
            setUpdateUserPassword({
                email: response.data.email
            })
        }
    });


    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === 'newPassword') {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
            if (!passwordRegex.test(value)) {
                setGuideMessages((messages) => ({
                    ...messages,
                    newPassword: '비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자리로 입력해주세요.'
                }));
                setIsNewPassword(false);
            } else {
                setGuideMessages((messages) => ({
                    ...messages,
                    newPassword: '올바른 비밀번호 형식입니다. :)'
                }));
                setUpdateUserPassword((updateUser) => ({
                    ...updateUser,
                    password: value
                }));
                setIsNewPassword(true);
            }
        } else if (name === 'confirmPassword') {
            if (value !== updateUserPassword.password) {
                setGuideMessages((messages) => ({
                    ...messages,
                    confirmPassword: '비밀번호가 일치하지 않습니다.'
                }));
                setIsConfirmPassword(false);
            } else {
                setGuideMessages((messages) => ({
                    ...messages,
                    confirmPassword: ''
                }));
                setIsConfirmPassword(true);
            }
        }

    }

    const modifyUserPassword = useMutation(async (modifyData) => {
        try {
            const modifyUserData = {
                email: principal.data.data.email,
                password: updateUserPassword.password
            };

            const option = {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            };

            const response = await axios.put('http://localhost:8080/api/v1/user/password/reset', modifyUserData, option);

            return response
        } catch (error) {
            alert('ERROR');
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                alert('비밀번호가 변경되었습니다.');
                navigate('/user/:id');
            }
        }
    })

    const signupHandleSubmit = async () => {
        if (isNewPassword && isConfirmPassword) {
            modifyUserPassword.mutate(updateUserPassword);
        }

    }

    if (authState) {
        if (principal.isLoading) {
            return (<Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>)
        }
        return (
            <Grid component="main" maxWidth="xs" css={signupContainer}>

                <Box css={signupBox}>
                    <Typography component="h1" variant="h5" css={signupText}>
                        New Password
                    </Typography>


                    <Box component="form" css={inputContainer}>
                        <StyleInput

                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            onChange={onChangeHandler}
                            autoFocus
                            value={principal.data.data.email}
                            disabled={true}
                        />

                        <StyleInput
                            required
                            id="password"
                            label="비밀번호"
                            placeholder="8자 이상, 특수문자 포함"
                            name="newPassword"
                            type="password"
                            autoComplete="current-password"
                            onChange={onChangeHandler}
                        />

                        <div css={inputMsg}>새로운 비밀번호를 입력해주세요.</div>

                        <div css={guideMsg}>{guideMessages.newPassword}</div>
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
                            disabled={!isNewPassword || !isConfirmPassword}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>

            </Grid>
        );
    }

};

export default ModifyPassword;
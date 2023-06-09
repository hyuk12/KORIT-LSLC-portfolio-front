/** @jsxImportSource @emotion/react */
import {Box, Button, Grid, Typography} from '@mui/material';
import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    errorMsg,
    guideMsg,
    inputContainer,
    signupBox,
    signupContainer,
    signupText,
    StyleInput,
    submitButton
} from "./styles/PasswordStyles";

const CheckEmail = () => {
    const [ searchUserEmail, setSearchUserEmail ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const navigate = useNavigate();
      
    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if(name === 'email') {
            const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if(!emailRegex.test(value)) {
                setErrorMessage('올바른 이메일 형식으로 입력해주세요.');
            } else {
                setErrorMessage('올바른 이메일 형식입니다. :)');
            }
        }

        setSearchUserEmail(value);
    };

    const passwordRestHandleSubmit = async () => {
        const email = searchUserEmail;
        const params  = { 
            type: 1,
            value: searchUserEmail 
        };

        const option = {
            headers: {
                "Content-Type": "application/json"
            },
            params
        }

        try{
            const response = await axios.get("http://43.202.21.26/api/v1/user/search", option);
            setErrorMessage('');
            
            navigate(`/auth/password/reset?email=${encodeURIComponent(email)}`);

        } catch (error) {
            setErrorMessage('일치하는 회원 정보가 없습니다.');

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
                        id="email"
                        label="이메일"
                        placeholder="예) abc@gmail.com"
                        name="email"
                        autoComplete="email"
                        onChange={onChangeHandler}
                        autoFocus
                        />

                    <div css={guideMsg}>회원가입시 등록하셨던 이메일 주소를 입력해주세요.</div>
                    <div css={errorMsg}>{errorMessage}</div>
                    <Button css={submitButton}
                        type='button'
                        onClick={passwordRestHandleSubmit}
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

export default CheckEmail;
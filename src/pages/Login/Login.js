/** @jsxImportSource @emotion/react */

import {Box, Button, Grid, Link, TextField, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import axios from "axios";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import loginImg from '../../images/busan_night.jpg';
import googleBtn from '../../images/google_btn.png';
import kakaoBtn from '../../images/kakaolink_btn.png';
import naverBtn from '../../images/naver_btn.png';
import {useRecoilState} from "recoil";
import {authenticationState} from "../../store/atoms/AuthAtoms";
import {useMutation} from "react-query";
import {
    oauthBtn,
    oauthBtnList,
    oauthContainer, oauthImg,
    oauthLoginText,
    or,
    orBorderContainer,
    signupContainer,
    signupLink,
    submitButton
} from "./styles/LoginStyles";

const Login = () => {
    const navigate = useNavigate();
    const [ authState, setAuthState ] = useRecoilState(authenticationState);
    const [ loginUser, setLoginUser ] = useState({
        email: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setLoginUser(
            {
                ...loginUser,
                [name]: value
            }
        )
    }

    const googleAuthLoginClickHandler = () => {
        window.location.href= "http://ec2-43-202-21-26.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/google"
    }

    const naverAuthLoginClickHandler = () => {
        window.location.href= "http://ec2-43-202-21-26.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/naver"
    }

    const kakaoAuthLoginClickHandler = () => {
        window.location.href= "http://ec2-43-202-21-26.ap-northeast-2.compute.amazonaws.com/oauth2/authorization/kakao"
    }

    const signInUser = useMutation(async (loginData) => {
        try {
            const option = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios.post(`http://ec2-43-202-21-26.ap-northeast-2.compute.amazonaws.com/api/v1/auth/login`, loginData, option);

            const accessToken = response.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            setAuthState({
                isAuthenticated: true,
            });
            navigate('/home');


        }catch (error) {
            alert('아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.');
        }
    })

    const loginHandleSubmit = () => {
        signInUser.mutate(loginUser)

    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid 
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${loginImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center' }}>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4">
                        Sign in
                    </Typography>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            loginHandleSubmit();
                        }}
                    >

                        <Box sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={onChangeHandler}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={onChangeHandler}
                            />

                            <Grid container>
                                <Grid item xs>
                                    <Link href="/auth/password/verify" variant="body2">
                                        비밀번호를 잊으셨나요?
                                    </Link>
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#0BD0AF', color: 'white' }}
                                css={submitButton}
                            >
                                Sign In
                            </Button>

                            <Grid container css={signupContainer}>
                                <Grid item>
                                    회원이 아니세요?
                                </Grid>
                                <Grid item css={signupLink}>
                                    <Link href="/auth/signup" variant="body2">
                                        회원가입하기
                                    </Link>
                                </Grid>
                            </Grid>

                            <Grid container css={orBorderContainer}>
                                <Grid item>
                                    <span css={or}>
                                        or
                                    </span>
                                </Grid>
                            </Grid>

                            <Grid container css={oauthContainer}>
                                <div css={oauthLoginText}>SNS 간편 로그인</div>
                                <Grid item css={oauthBtnList}>

                                    <button css={oauthBtn} onClick={kakaoAuthLoginClickHandler}>
                                        <img src={kakaoBtn} alt="kakao" css={oauthImg}/>
                                    </button>
                                    <button css={oauthBtn} onClick={naverAuthLoginClickHandler}>
                                        <img src={naverBtn} alt="naver" css={oauthImg}/>
                                    </button>
                                    <button css={oauthBtn} onClick={googleAuthLoginClickHandler}>
                                        <img src={googleBtn} alt="google" css={oauthImg}/>
                                    </button>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Box>
            </Grid>

        </Grid>
    );
};

export default Login;
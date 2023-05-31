/** @jsxImportSource @emotion/react */

import {css} from '@emotion/react';
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
import {useMutation, useQuery} from "react-query";


const submitButton = css`
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

const signupContainer = css`
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const signupLink = css`
    margin-left: 7px;
`;

const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;

const orBorderContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const or = css`
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 5px;

    &::before {
        content: "";
        display: flex;
        border-bottom: 1px solid #dbdbdb;
        flex-grow: 1;
        margin: 0px 20px;
        width: 100px;
        height: 1px;
    }
    &::after {
        content: "";
        display: flex;
        border-bottom: 1px solid #dbdbdb;
        flex-grow: 1;
        margin: 0px 20px;
        width: 100px;
        height: 1px;
    }

`;

const oauthContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const oauthLoginText = css`
    font-size: 14px;
`;

const oauthBtnList = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const oauthBtn = css`
    width: 45px;
    height: 45px;
    margin-left: 20px;
    margin-right: 20px;

    border-radius: 5px;
    border: none;
    overflow: hidden;

    box-shadow: 1px 1px 2px #dbdbdb;
    padding: 0px;

    cursor: pointer;
`;

const oauthImg = css`
    width: 45px;
    height: 45px;
    object-fit: cover;
`;


const Login = () => {


    const [ loginUser, setLoginUser ] = useState({
        email: '',
        password: ''
    })
    const [ authState, setAuthState ] = useRecoilState(authenticationState);
    const navigate = useNavigate();


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
        window.location.href= "http://localhost:8080/oauth2/authorization/google"
    }

    const naverAuthLoginClickHandler = () => {
        window.location.href= "http://localhost:8080/oauth2/authorization/naver"
    }

    const kakaoAuthLoginClickHandler = () => {
        window.location.href= "http://localhost:8080/oauth2/authorization/kakao"
    }

    const signInUser = useMutation(async (loginData) => {
        try {
            const option = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios.post(`http://localhost:8080/api/v1/auth/login`, loginData, option);

            const accessToken = response.data.grantType + " " + response.data.accessToken;
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
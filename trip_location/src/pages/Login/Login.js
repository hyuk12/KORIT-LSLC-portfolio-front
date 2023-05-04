/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Avatar, AvatarGroup, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import loginImg from '../../images/busan_night.jpg';
import kakaoBtn from '../../images/kakaolink_btn.png';
import naverBtn from '../../images/naver_btn.png';
import googleBtn from '../../images/google_btn.png';


const submitButton = css`
    &:hover {
        background-color: #0BAF94;
    }

    &:active {
        background-color: #40D6BD;
    }
`;

const signUpContainer = css`
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
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

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                        />

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
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

                        <Grid container css={signUpContainer}>
                            <Grid item>
                                회원이 아니세요?
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" marginLeft="7px">
                                    {"회원가입하기"}
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

                                <button css={oauthBtn}>
                                    <img src={kakaoBtn} alt="kakao" css={oauthImg}/>
                                </button>
                                <button css={oauthBtn}>
                                    <img src={naverBtn} alt="kakao" css={oauthImg}/>
                                </button>
                                <button css={oauthBtn}>
                                    <img src={googleBtn} alt="kakao" css={oauthImg}/>
                                </button>
                            </Grid>
                        </Grid>

                    </Box>

                </Box>
            </Grid>

        </Grid>
    );
};

export default Login;
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const signupContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
    `;
const signUpBox = css`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 8px;
`;

const provinceForm = css`
    width: 100%;
    margin-top: 15px;
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

const province = [
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };

    const [provinceList, setprovinceList] = useState([]);

    return (
        <Grid component="main" maxWidth="xs" css={signupContainer}>

        <Box css={signUpBox}>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="이메일"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="비밀번호"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="이름"
                    name="name"
                    autoComplete="name"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="연락처"
                    name="phone"
                    autoComplete="tel"
                />
                <Box>
                    <FormControl css={provinceForm}>
                        <InputLabel id="provinceSelectLabel">주소</InputLabel>
                        <Select
                            labelId="provinceSelectLabel"
                            id="provinceSelect"
                            value={provinceList}
                            label="주소"
                            onChange={(event) => setprovinceList(event.target.value)}
                        >
                            {province.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Box>
                <Button css={submitButton}
                    type="submit"
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
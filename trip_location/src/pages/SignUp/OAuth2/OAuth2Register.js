/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {useMutation} from "react-query";
import axios from "axios";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {
    addressForm,
    errorMsg,
    inputContainer,
    signupBox,
    signupContainer,
    signupText,
    StyleInput,
    submitButton
} from "../styles/SignUpStyles";

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

const OAuth2Register = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const registerToken = searchParams.get("registerToken");

    const [ oauth2User, setOauth2User ] = useState({
        postsImgId: -1,
        email: '',
        password: '',
        name: '',
        phone: '',
        address: ''
    });

    const [ errorMessages, setErrorMessages ] = useState({
        postsImgId: -1,
        email: '',
        password: '',
        name: '',
        phone: '',
        address: ''
    });

    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const provider = searchParams.get("provider");
    console.log(email, name)

    const oauth2Register = useMutation(async (registerData) => {
        const option = {
            headers: {
                registerToken: `Bearer ${registerToken}`
            }
        }
        try {
            console.log(registerData)
            const response = await axios.post('http://localhost:8080/api/v1/auth/oauth2/register', registerData, option);
            return response
        }catch (error) {
            alert("page 가 만료되었습니다")
            navigate("/auth/login", {replace: true});
            return error;
        }
    }, {
        onSuccess: (response) => {
            if(response.status === 200) {
                alert("Successfully registered");
                navigate("/auth/login", {replace: true});
            }
        }
    });

    useEffect(() => {
        setOauth2User(prevUser =>({
            ...prevUser,
            email: email,
            name: name
        }))
    },[email, name])

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setOauth2User(
            {
                ...oauth2User,
                [name]: value
            }
        )
    };

    const oauth2RegisterSubmitHandler = () => {
        if (email && name) {
            oauth2Register.mutate({
                email,
                name,
                provider,
                ...oauth2User
            });
        } else {
            // 여기에 email과 name이 null일 때의 처리를 추가합니다.
            // 예를 들어, alert를 띄우거나, state를 사용하여 화면에 오류 메시지를 표시합니다.
            console.log("Email and Name must be provided.");
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
                        id="password"
                        label="비밀번호 확인"
                        name="checkPassword"
                        type="password"
                        autoComplete="current-password"
                        onChange={onChangeHandler}
                    />
                    <div css={errorMsg}>{errorMessages.password}</div>


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
                                value={oauth2Register.address}
                                label="주소"
                                onChange={(event) => setOauth2User({...oauth2User, address: event.target.value})}
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
                            onClick={oauth2RegisterSubmitHandler}
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

export default OAuth2Register;
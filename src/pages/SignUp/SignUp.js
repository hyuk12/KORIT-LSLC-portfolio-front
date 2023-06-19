/** @jsxImportSource @emotion/react */
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography,} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    addressForm,
    errorMsg,
    inputContainers,
    signupBox,
    signupContainer,
    signupText,
    StyleInput,
    submitButton
} from "./styles/SignUpStyles";

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
    "제주특별자치도",
];

const SignUp = () => {
    const [signupUser, setSignupUser] = useState({
        profileImgPath: "",
        email: "",
        password: "",
        name: "",
        phone: "",
        address: "",
    });

    const [messages, setMessages] = useState({
        profileImgPath: "",
        email: "",
        password: "",
        name: "",
        phone: "",
        address: "",
    });

    const [isSignUp, setIsSignUp] = useState({
        email: false,
        password: false,
        name: false,
        phone: false,
    });

    
    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            const emailRegex =
                /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!emailRegex.test(value)) {
                setMessages((messages) => ({
                    ...messages,
                    email: "올바른 이메일 형식이 아닙니다.",
                }));
                setIsSignUp((pro) => ({
                    ...pro,
                    email: false,
                }));
            } else {
                setMessages((messages) => ({
                    ...messages,
                    email: "올바른 이메일 형식입니다. :)",
                }));
                setIsSignUp((pro) => ({
                    ...pro,
                    email: true,
                }));
            }
        } else if (name === "password") {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
            if (!passwordRegex.test(value)) {
                setMessages((messages) => ({
                    ...messages,
                    password: "비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자리로 입력해주세요.",
                }));
                setIsSignUp((pro) => ({
                    ...pro,
                    password: false,
                }));
            } else {
                setMessages((messages) => ({
                    ...messages,
                    password: "올바른 비밀번호 형식입니다. :)",
                }));
                setIsSignUp((pro) => ({
                    ...pro,
                    password: true,
                }));
            }
        } else if (name === "name") {
            const nameRegex = /^[가-힣]{2,8}$/;
            if (!nameRegex.test(value)) {
                setMessages((messages) => ({
                    ...messages,
                    name: "2글자 이상 8글자 미만으로 입력해주세요.",
                }));
                setIsSignUp((pro) => ({
                    ...pro,
                    name: false,
                }));
            } else {
                setMessages((messages) => ({
                    ...messages,
                    name: "올바른 이름 형식입니다. :)",
                }));
                setIsSignUp((pro) => ({
                    ...pro,
                    name: true,
                }));
            }
        } else if (name === "phone") {
            const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                setMessages((messages) => ({
                    ...messages,
                    phone: "올바른 전화번호 형식이 아닙니다.",
                }));
                setIsSignUp((pro) => ({
                    ...pro,
                    phone: false,
                }));
            } else {
                setMessages((messages) => ({
                    ...messages,
                    phone: "올바른 전화번호 형식입니다. :)",
                }));
                setIsSignUp((pro) => ({
                    ...pro,
                    phone: true,
                }));
            }
        }

        setSignupUser({
            ...signupUser,
            [name]: value,
        });
    };

    const signupHandleSubmit = async () => {
        try {
            const option = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.post(
                `http://ec2-43-202-21-26.ap-northeast-2.compute.amazonaws.com/api/v1/auth/user`,
                signupUser,
                option
            ); 
            setMessages({
                profileImgPath: "",
                email: "",
                password: "",
                name: "",
                phone: "",
                address: "",
            });

            const accessToken =
                response.data.grantType + " " + response.data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            alert("회원가입 완료");
            window.location.replace("/auth/login");
            return response;
        } catch (error) {
            setMessages(error.response.data);
            alert('회원가입 실패')
        }
    };

    return (
        <Grid component="main" maxWidth="xs" css={signupContainer}>
            <Box css={signupBox}>
                <Typography component="h1" variant="h5" css={signupText}>
                    Sign Up
                </Typography>

                <Box component="form" css={inputContainers}>
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
                    <div css={errorMsg}>{messages.email}</div>

                    <StyleInput
                        required
                        id="password"
                        label="비밀번호"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={onChangeHandler}
                    />
                    <div css={errorMsg}>{messages.password}</div>

                    <StyleInput
                        required
                        id="name"
                        label="이름"
                        name="name"
                        autoComplete="name"
                        onChange={onChangeHandler}
                    />
                    <div css={errorMsg}>{messages.name}</div>

                    <StyleInput
                        required
                        id="phone"
                        label="연락처"
                        placeholder="010-1234-1234"
                        name="phone"
                        autoComplete="tel"
                        onChange={onChangeHandler}
                    />
                    <div css={errorMsg}>{messages.phone}</div>

                    <Box>
                        <FormControl css={addressForm}>
                            <InputLabel id="addressSelectLabel">
                                주소
                            </InputLabel>
                            <Select
                                required
                                labelId="addressSelectLabel"
                                id="address"
                                value={signupUser.address}
                                label="주소"
                                onChange={(event) =>
                                    setSignupUser({
                                        ...signupUser,
                                        address: event.target.value,
                                    })
                                }
                            >
                                {address.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <div css={errorMsg}>{messages.address}</div>

                    <Button
                        css={submitButton}
                        type="button"
                        onClick={signupHandleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!Object.values(isSignUp).every(value => value)}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};

export default SignUp;

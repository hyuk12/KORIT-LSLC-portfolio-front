/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticationState } from "../../store/atoms/AuthAtoms";

const pageContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
`;

const pageBoxStyle = css`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 8px;
`;
const contentContainer = css`
    width: 500px;
`;

const listStyle = css`
    list-style-type: none;
    list-style: none;
    color: #777;
`;

const titleText = css`
    margin-top: 80px;
    margin-bottom: 30px;
`;

const submitButton = css`
    height: 45px;
    margin-top: 30px;
    margin-bottom: 20px;

    background-color: #0bd0af;
    color: white;

    font-size: 15px;

    &:hover {
        background-color: #0baf94;
    }

    &:active {
        background-color: #40d6bd;
    }
`;

const Withdrawal = () => {
    const navigate = useNavigate();
    const [ open, setOpen ] = useState(true);
    const [ authState, setAuthState ] = useRecoilState(authenticationState);
    const [ refresh, setRefresh ] = useState(true);
    const [ userCheck, setUserCheck ] = useState({
        email: "",
        password: "",
    });
    
    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', { params: { accessToken } });
        return response;
    }, {
        enabled: authState.isAuthenticated
        // onSuccess: (response) => {
        //     setRefresh(false);
        // }
    });
    

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setUserCheck({
            ...userCheck,
            [name]: value,
        });
    };

    const checkUser = useMutation(async (userCheck) => {
        try {
            const userData = {
                email: userCheck.email,
                password: userCheck.password,
            };

            const response = await axios.delete(`http://localhost:8080/api/v1/user/${principal.data.data.userId}`, {
                headers: {
                    Authorization: `${localStorage.getItem("accessToken")}`,
                },
                data: userData,
            });
            
            return response;
        } catch (error) {
            alert("로그인된 이메일과 비밀번호를 확인해주세요.");
        }
    }, {
        onSuccess: (response) => {
            if(response.status === 200) {
                alert('지금까지 Trip Together를 이용해주셔서 감사합니다.');
                localStorage.removeItem("accessToken");
                setAuthState({
                    isAuthenticated: false,
                });
                navigate("/auth/login");;
            }
        }
    });
    
    const deleteUserHandleSubmit = async () => {
        checkUser.mutate(userCheck);
    }
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid component="main" maxWidth="xs" css={pageContainer}>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"회원탈퇴 안내"}</DialogTitle>
                <DialogContent css={contentContainer}>
                    <div>
                        탈퇴시 삭제/유지되는 정보를 확인하세요!
                    </div>
                    <div>
                        한번 삭제된 정보는 복구가 불가능합니다.
                    </div>
                    <p></p>
                    <DialogContentText id="alert-dialog-slide-description">
                        <ul css={listStyle}>
                            <li>계정 및 프로필 정보 삭제</li>
                            <li>내 여행 장소 및 저장 정보 삭제</li>
                            <li>공유 일정 및 리뷰, 사진 유지</li>
                        </ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate(`/user/${principal.data.data.userId}`)}>취소</Button>
                    <Button onClick={handleClose}>확인</Button>
                </DialogActions>
            </Dialog>
            <Box css={pageBoxStyle}>
                <Typography component="h1" variant="h5" css={titleText}>
                    회원정보 확인
                </Typography>

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

                <Button
                    css={submitButton}
                    type="button"
                    onClick={deleteUserHandleSubmit}
                    fullWidth
                    variant="contained"
                >
                    Next
                </Button>
            </Box>
        </Grid>
    );
};

export default Withdrawal;

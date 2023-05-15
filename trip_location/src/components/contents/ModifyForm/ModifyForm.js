/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMutation, useQuery} from "react-query";
import {useRecoilState} from "recoil";
import {authenticationState} from "../../../store/atoms/AuthAtoms";

//다시돌아옴

const signupContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
`
;
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

const editInputStyle = css`
  display: flex;
  
  width: 100%;
`;

const editButtonStyle = css`
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 3px;
  width: 50px;
  height: 56px;
  
  background-color: #0bd0af;
  color: #fff;
  box-shadow: 0px 1px 1px 1px #dbdbdb;
  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD;
  }
  
`;

const addressForm = css`
    width: 100%;
    margin-top: 15px;
  
`;

const addressEditButtonStyle = css`
  margin-top: 15px;
  border: none;
  border-radius: 3px;
  width: 50px;
  height: 56px;

  background-color: #0bd0af;
  color: #fff;
  box-shadow: 0px 1px 1px 1px #dbdbdb;
  &:hover {
    background-color: #0BAF94;
  }

  &:active {
    background-color: #40D6BD;
  }
`;
const errorMsg = css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
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

const ModifyForm = () => {
    const navigate = useNavigate();
    const [ refresh, setRefresh ] = useState(false);
    const [authState, setAuthState ] = useRecoilState(authenticationState);

    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: {accessToken}});
        return response;
    }, {
        onSuccess: (response) => {
            setUpdateUser({
                profileImg: response.data.profileImg,
                email: response.data.email,
                name: response.data.name,
                phone: response.data.phone,
                address: response.data.address
            })
        }
    });

    const [inputDisabled, setInputDisabled] = useState({
        name: true,
        phone: true,
        address: true
    });

    const [buttonText, setButtonText] = useState({
        name: 'Edit',
        phone: 'Edit',
        address: 'Edit'
    });

    const [ updateUser, setUpdateUser ] = useState({
        profileImg: '',
        email: '',
        name:  '',
        phone: '',
        address:  ''
    });

    const [ errorMessages, setErrorMessages ] = useState({
        profileImg: '',
        email: '',
        name: '',
        phone: '',
        address: ''
    });


    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            setAuthState(true);
        }else {
            setAuthState(false);
        }
    }, [localStorage.getItem('accessToken')]);



    // 로그인
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUpdateUser(
            {
                ...updateUser,
                [name]: value
            }
        )
    };

    const modifyUser = useMutation(async (modifyData) => {
        try {
            const option = {
                headers: {
                    'Authorization': `${localStorage.getItem('accessToken')}`
                }
            }
            const response = await axios.put(`http://localhost:8080/api/v1/user/${principal.data.data.userId}`, modifyData, option);
            setErrorMessages({
                profileImg: '',
                email: '',
                password: '',
                name: '',
                phone: '',
                address: ''});
            return response
        }catch (error) {

            setErrorMessages(error.response.data)
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                alert("정보 수정 완료");
                window.location.replace('/');
            }
        }
    })

    const updateUserHandleSubmit = () => {
        modifyUser.mutate(updateUser);
    }

    const toggleEdit = (field) => {
        setInputDisabled((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));

        setButtonText((prevState) => ({
            ...prevState,
            [field]: prevState[field] === "Edit" ? "Modify" : "Edit"
        }));
    };

    if(authState) {
        if (principal.isLoading) {
            return (<Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>)
        }
        return (
            <Grid component="main" maxWidth="xs" css={signupContainer}>

                <Box css={signupBox}>
                    <Typography component="h1" variant="h5" css={signupText}>
                        Edit Member Information
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

                        <div css={errorMsg}>{errorMessages.email}</div>

                        <div css={editInputStyle}>
                            <StyleInput

                                id="name"
                                label="이름"
                                name="name"
                                autoComplete="name"
                                onChange={onChangeHandler}
                                value={updateUser.name}
                                disabled={inputDisabled.name}
                            />
                            <div css={errorMsg}>{errorMessages.name}</div>
                            <button type={"button"} css={editButtonStyle} onClick={() => toggleEdit("name")}>
                                {buttonText.name}
                            </button>
                        </div>
                        <div css={editInputStyle}>
                            <StyleInput

                                id="phone"
                                label="연락처"
                                placeholder="010-1234-1234"
                                name="phone"
                                autoComplete="tel"
                                value={updateUser.phone}
                                onChange={onChangeHandler}
                                disabled={inputDisabled.phone}
                            />
                            <div css={errorMsg}>{errorMessages.phone}</div>
                            <button type={"button"} css={editButtonStyle} onClick={() => toggleEdit("phone")}>
                                {buttonText.phone}
                            </button>
                        </div>
                        <div css={editInputStyle}>
                            <Box width={"100%"}>
                                <FormControl css={addressForm}>
                                    <InputLabel id="addressSelectLabel">주소</InputLabel>
                                    <Select

                                        labelId="addressSelectLabel"
                                        id="address"
                                        value={updateUser.address}
                                        label="주소"
                                        onChange={(event) => setUpdateUser({...updateUser, address: event.target.value})}
                                        disabled={inputDisabled.address}
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
                            <button type={"button"} css={addressEditButtonStyle} onClick={() => toggleEdit("address")}>
                                {buttonText.address}
                            </button>
                        </div>

                        <Button css={submitButton}
                                type='button'
                                onClick={updateUserHandleSubmit}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                        >
                            Modify Member
                        </Button>
                    </Box>
                </Box>

            </Grid>
        );
    }

};

export default ModifyForm;
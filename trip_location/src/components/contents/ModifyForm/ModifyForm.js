/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
import React, { useState } from 'react';
import { useMutation, useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { authenticationState, updateUserState } from "../../../store/atoms/AuthAtoms";

//다시돌아옴

const modifyContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
    margin-top: 100px;
`;

const modifyBox = css`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const profileImgContainer = css`
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-size: cover;
    background-position: center;
    overflow: hidden;
`;

const imgStyle = css`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const hiddenInput = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
     
`;

const signupText = css`
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

const withdrawalStyle = css`
    font-size: 12px;
    color: #888;
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
    const [ authState, setAuthState ] = useRecoilState(authenticationState);
    const [ refresh, setRefresh ] = useState(true);
    const [ imgFiles, setImgFiles ] = useState(null);
    const [ preview, setPreview ] = useState('');

    console.log(refresh)
    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get('http://localhost:8080/api/v1/auth/principal', {params: {accessToken}});
        console.log("요청")
        return response;
    }, {
        enabled: refresh,
        onSuccess: (response) => {
            setUpdateUser({
                profileImg: response.data.postsImgUrl,
                email: response.data.email,
                name: response.data.name,
                phone: response.data.phone,
                address: response.data.address
            })
            setRefresh(false)
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


    const [ updateUser, setUpdateUser ] = useRecoilState(updateUserState);

    const [ errorMessages, setErrorMessages ] = useState({
        name: '',
        phone: ''
    });

    const [ isName, setIsName ] = useState(true)
    const [ isPhone, setIsPhone ] = useState(true)

    // 유효성 검사 -> user 정보수정
    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if(name === 'name') {
            const nameRegex = /^[가-힣]{2,8}$/;
            if(!nameRegex.test(value)) {
                setErrorMessages((errors) => ({
                    ...errors,
                    name: '2글자 이상 8글자 미만으로 입력해주세요.'
                }));
                setIsName(false);
            } else {
                setErrorMessages((errors) => ({
                    ...errors,
                    name: '올바른 이름 형식입니다. :)'
                }));
                setIsName(true);
            }
        } else if (name === 'phone') {
            const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
            if (!phoneRegex.test(value)) {
              setErrorMessages((errors) => ({
                ...errors,
                phone: '올바른 전화번호 형식이 아닙니다.'
              }));
              setIsPhone(false);
            } else {
              setErrorMessages((errors) => ({
                ...errors,
                phone: '올바른 전화번호 형식입니다. :)'
              }));
              setIsPhone(true);
            }
        }
        setUpdateUser(
            {
                ...updateUser,
                [name]: value
            }
        )

        console.log(updateUser);
    };


    const modifyUser = useMutation(async (modifyData) => {
        try {
            const formData = new FormData();

            formData.append("email", modifyData.email)
            formData.append("name", modifyData.name)
            formData.append("phone", modifyData.phone)
            formData.append("address", modifyData.address)

            if(imgFiles) {
                formData.append("profileImg", imgFiles)
            }

            console.log(formData.get("profileImg"));

            const option = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${localStorage.getItem('accessToken')}`
                }
            }

            const response = await axios.put(`http://localhost:8080/api/v1/user/${principal.data.data.userId}`, formData, option);

            setErrorMessages({
                profileImg: '',
                email: '',
                name: '',
                phone: '',
                address: ''});

            return response
        }catch (error) {
            alert('입력값을 확인해주세요');
        }
    }, {
        onSuccess: (response) => {
            alert('회원정보 수정 완료');
            window.location.replace('/');
        }
    })

    const updateUserHandleSubmit = () => {
        if(isName && isPhone) {
            modifyUser.mutate(updateUser);
        }
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

    const saveImgFileHandle = (e) => {

        setImgFiles(e.target.files[0]);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = (e) => {
            setPreview(e.target.result);
        };
    }

    const imgClickHandle = (e) => {

    }

    if(authState) {
        if (principal.isLoading) {
            return (<Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>)
        }
        return (
            <Grid component="main" maxWidth="xs" css={modifyContainer}>

                <Box css={modifyBox}>
                    <Typography component="h1" variant="h5" css={signupText}>
                        Edit Member Information
                    </Typography>

                    <div css={profileImgContainer} onClick={imgClickHandle}>
                        <img css={imgStyle} src={preview ? preview : updateUser.profileImg} alt=""/>
                        <input css={hiddenInput} type="file" multiple={false} accept={".jpg, .png, .jpeg"}  onChange={saveImgFileHandle}/>
                        <label>

                        </label>
                    </div>

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
                            <button type={"button"} css={editButtonStyle} onClick={() => toggleEdit("name")}>
                                {buttonText.name}
                            </button>
                        </div>
                        <div css={errorMsg}>{errorMessages.name}</div>
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
                            <button type={"button"} css={editButtonStyle} onClick={() => toggleEdit("phone")}>
                                {buttonText.phone}
                            </button>
                        </div>
                        <div css={errorMsg}>{errorMessages.phone}</div>
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
                            <button type={"button"} css={addressEditButtonStyle} onClick={() => toggleEdit("address")}>
                                {buttonText.address}
                            </button>
                        </div>

                        <Button css={submitButton}
                                type='button'
                                onClick={updateUserHandleSubmit}
                                fullWidth
                                variant="contained"
                                disabled={!isName || !isPhone}
                                sx={{ mt: 3, mb: 2 }}
                        >
                            Modify Member
                        </Button>
                        <Link to={`/user/${principal.data.data.userId}/withdrawal`} css={withdrawalStyle}>
                            회원탈퇴
                        </Link>
                        
                    </Box>
                </Box>
            </Grid>
        );
    }

};

export default ModifyForm;
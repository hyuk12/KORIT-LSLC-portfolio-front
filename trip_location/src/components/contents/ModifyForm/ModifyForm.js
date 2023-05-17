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
import React, {useEffect, useRef, useState} from 'react';
import { useMutation, useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import defaultImg from '../../../images/logotitle.png';
import { authenticationState } from "../../../store/atoms/AuthAtoms";

//다시돌아옴

const signupContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
    margin-top: 100px;
`
;

const signupBox = css`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const profileImgContainer = css`
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-image: url(${defaultImg});
    background-size: cover;
    background-position: center;
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
    const [authState, setAuthState ] = useRecoilState(authenticationState);
    const [imgFiles, setImgFiles] = useState([]);
    const fileId = useRef(1);


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
        name: '',
        phone: '',
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
                    name: '올바른 이름 형식입니다 :)'
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
                phone: '올바른 전화번호 형식입니다 :)'
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

    };


    const modifyUser = useMutation(async (modifyData) => {
        try {
            const formData = new FormData();

            formData.append("email", modifyData.email)
            formData.append("name", modifyData.name)
            formData.append("phone", modifyData.phone)
            formData.append("address", modifyData.address)

            imgFiles.forEach(imgFile => {
                formData.append("imgFiles", imgFile.file)
            })

            const option = {
                headers: {
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

    const addFileHandle = (e) =>{
        const newImgFiles = [];
        for(const file of e.target.files) {
            const fileData = {
                id: fileId.current,
                file
            }
            fileId.current += 1;
            newImgFiles.push(fileData);
        }

        setImgFiles([...imgFiles, ...newImgFiles]);
        e.target.value = null;
    }

    const removeFileHandle = (e) => {
        const idToRemove = parseInt(e.target.value);
        setImgFiles(prevImgFiles => prevImgFiles.filter(imgFile => imgFile.id !== idToRemove));
    }

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

                    <div css={profileImgContainer}>
                        <input type="file" multiple={true} accept={".jpg, .png, .jpeg"}  onChange={addFileHandle}/>
                        <label>
                            {imgFiles && imgFiles.map(imgFile =>
                                <li key={imgFile.id}>
                                    {imgFile.file.name}
                                    <button value={imgFile.id} onClick={removeFileHandle}>삭제</button>
                                </li>)}
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
                        <div css={errorMsg}>{errorMessages.address}</div>

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
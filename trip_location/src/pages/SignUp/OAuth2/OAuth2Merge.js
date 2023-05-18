/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {useMutation} from "react-query";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {css} from "@emotion/react";


const mergeContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 150px auto;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.8);
  width: 600px;
  height: 600px;
`;

const pStyle = css`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const inputContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const textFieldStyle = css`
  margin-top: 10px;
  width: 350px;
`;

const buttonContainer = css`
  display: flex;
  margin-top: 10px;
`;

const buttonStyle = css`
  width: 150px;
  height: 50px;
`;

const OAuth2Merge = () => {
    const providerMerge  = useMutation(async (mergeData) => {
        try {
            const response = await axios.put("http://localhost:8080/api/v1/auth/oauth2/merge", mergeData);
            return response;
        }catch (error) {
            setErrorMsg(error.response.data);
            return error;
        }
    }, {
        onSuccess: (response) => {
            if (response.status === 200) {
                alert("Success");
                window.location.replace("/auth/login");
            }
        }
    });
    const [password, setPassword] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email");
    const provider = searchParams.get("provider");

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const providerMergeSubmitHandler = () => {
        providerMerge.mutate({
            email,
            password,
            provider
        })
    }
    return (
        <div css={mergeContainer}>
            <div>
                <p css={pStyle}>{email}계정을</p>
                <p css={pStyle}>{provider} 계정과</p>
                <p css={pStyle}>통합하는 것에 동의 하십니까?</p>
            </div>

            <div css={inputContainer}>
                <TextField
                    css={textFieldStyle}
                    disabled
                    id="standard-required"
                    label="Required"
                    defaultValue={email}
                    variant="standard"
                />
                <TextField
                    css={textFieldStyle}
                    required
                    type={"password"}
                    onChange={passwordChangeHandler}
                    id="standard-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="standard"
                />
                <p>{errorMsg}</p>
            </div>

            <div css={buttonContainer}>
                <Button css={buttonStyle} onClick={providerMergeSubmitHandler}>동의</Button>
                <Button css={buttonStyle}>취소</Button>

            </div>

        </div>
    );
};

export default OAuth2Merge;
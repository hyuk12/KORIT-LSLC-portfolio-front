/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {useMutation} from "react-query";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {
    buttonContainer,
    buttonStyle,
    inputContainer,
    mergeContainer,
    pStyle,
    textFieldStyle
} from "../styles/SignUpStyles";



const OAuth2Merge = () => {
    const [password, setPassword] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const email = searchParams.get("email");
    const provider = searchParams.get("provider");

    const providerMerge  = useMutation(async (mergeData) => {
        try {
            const response = await axios.put("http://43.202.21.26/api/v1/auth/oauth2/merge", mergeData);
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
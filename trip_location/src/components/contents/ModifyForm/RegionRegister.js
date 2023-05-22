/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

const container = css`
    margin-top: 70px;
`;

const RegionRegister = () => {
    const [ title, setTitle ] = useState("");
    const [ name, setName ] = useState("");
    const [ content, setContent ] = useState("");
    const [ imgFiles, setImgFiles ] = useState([]);

    const postRegisterSubmit = useMutation(async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("name", name);
        formData.append("content", content);
        formData.append("imgFiles", imgFiles);

        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data"
            }
        }
        const response = await axios.post("http://localhost:8080/post/register", formData, option);
        return response;
    });

    const titleOnChangeHandle = (e) => {
        setTitle(e.target.value);
    }

    const nameOnChangeHandle = (e) => {
        setName(e.target.value);
    }

    const contentOnChangeHandle = (e) => {
        setContent(e.target.value);
    }

    const addFileHandle = (e) => {
        setImgFiles(e.target.files[0]);
    }

    // const removeFileHandle = (e) => {
    //     setImgFiles([...imgFiles.filter(imgFile => imgFile.id !== parseInt(e.target.value))]);
    // }

    const registerPostSubmitHandle = () => {

        postRegisterSubmit.mutate();
    }

    return (
        <div css={container}>
            <h3>한글 이름</h3>
            <input type="text" onChange={titleOnChangeHandle} />
            <h3>영어 이름</h3>
            <input type="text" onChange={nameOnChangeHandle} />
            <h3>설명</h3>
            <textarea cols="100" rows="100" onChange={contentOnChangeHandle}></textarea>
            <h3>이미지파일</h3>
            <input type="file" multiple={false} onChange={addFileHandle} accept={".jpg, .png, .jpeg"} />
            {/* <ul>
                {imgFiles.map(imgFile => 
                    <li key={imgFile.id}>
                        {imgFile.file.name} 
                        <button value={imgFile.id} onClick={removeFileHandle}>삭제</button>
                    </li>
                )}
            </ul> */}
            <button onClick={registerPostSubmitHandle}>작성하기</button>
        </div>
    );
};

export default RegionRegister;
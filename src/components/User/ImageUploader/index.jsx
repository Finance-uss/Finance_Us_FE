import React, { useState } from "react";
import * as S from '../../../styles/User/Auth/style.js';
import CameraIconSrc from "../../../assets/icons/common/Camera.svg";

const ImageUploader = ({ onFileSelect }) => {
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // 미리보기
            setSelectedFile(file); // 파일 저장
            onFileSelect(file); // 부모 컴포넌트에 파일 전달
        }
    };

    return (
        <S.ImageUploadWrapper>
            {preview && <S.ImagePreview src={preview} alt="선택한 이미지" />}
            <S.CameraButton src={CameraIconSrc} alt="카메라 아이콘"
                onClick={() => document.getElementById("image-upload").click()} />
            <input
                type="file"
                id="image-upload"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}  
            />
        </S.ImageUploadWrapper>
    );
};

export default ImageUploader;

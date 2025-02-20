import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../api/axiosInstance";
import { postS3 } from "../../../../api/s3API";
import { postAccountReceipt } from "../../../../api/financeAPI";

import Camera from "../../../../assets/icons/common/Camera.svg";

import styled from "styled-components";

const CameraInput = () => {
    const navigate = useNavigate();

    const handleCapture = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        try {
            const imageFormData = new FormData();
            imageFormData.append("file", file);
            const s3Response = await axiosInstance(postS3(imageFormData));
            if (s3Response.data.isSuccess) {
                const { imageUrl, imageName } = s3Response.data.result;
                const formData = { imageUrl, imageName };

                localStorage.setItem("handwriteData", JSON.stringify(formData));

                const receiptResponse = await axiosInstance(postAccountReceipt(imageFormData));
                if (receiptResponse.data.isSuccess) {
                    console.log("API 호출 성공:", receiptResponse.data.result);
                    const storedData = JSON.parse(localStorage.getItem("handwriteData") || "{}");
                    const finalData = { ...storedData, ...receiptResponse.data.result };
                    localStorage.setItem("handwriteData", JSON.stringify(finalData));
                }
            }
        } catch (error) {
            console.error("이미지 업로드 또는 API 호출 실패:", error);
            navigate("/finance/handwrite");
        }
    };

    return (
        <>
            <Label htmlFor="camera-input">
                <img src={Camera} alt="업로드 아이콘" />
            </Label>
            <Input
                id="camera-input"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCapture}
            />
        </>
    );
};

export default CameraInput;

const Label = styled.label`
    cursor: pointer;
`;

const Input = styled.input`
    display: none;
`;
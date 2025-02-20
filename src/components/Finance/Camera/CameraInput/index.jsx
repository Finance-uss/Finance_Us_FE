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
            const s3Response = await axiosInstance(postS3(file));
            if (s3Response.data.isSuccess) {
                const imageUrl = response.data.result.imageUrl;
                const imageName = response.data.result.imageName;
                const formData = { imageUrl, imageName };
                localStorage.setItem("handwriteData", JSON.stringify(formData));

                const receiptResponse = await axiosInstance(postAccountReceipt(file));
                if (receiptResponse.data.isSuccess) {
                    console.log("API 호출 성공:", receiptResponse.data.result);
                    const storedData = localStorage.getItem("handwriteData") || {};
                    const finalData = { ...storedData, ...receiptResponse.data.result };
                    localStorage.setItem("handwriteData", JSON.stringify(finalData));
                    navigate("/finance/handwrite");
                }
                else {
                    navigate("/finance/handwrite");
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
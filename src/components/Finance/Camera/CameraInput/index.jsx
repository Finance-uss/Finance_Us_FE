import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../api/axiosInstance";
import { postS3 } from "../../../../api/s3API";
import { postAccountReceipt } from "../../../../api/financeAPI";
import { convertImageToPng } from "../../../../utils/convertImageToPng.js";

import Camera from "../../../../assets/icons/common/Camera.svg";

import styled from "styled-components";

const CameraInput = () => {
    const navigate = useNavigate();

    const handleCapture = async (e) => {
        setTimeout(async () => {
            let file = e.target.files[0];
            if(!file) return;

            if (file.type !== "image/png") {
                file = await convertImageToPng(file);
                console.log("변환된 파일 타입:", file.type);
            }

            try {
                const s3Response = await axiosInstance(postS3(file));
                if (s3Response.data.isSuccess) {
                    const imageUrl = s3Response.data.result.imageUrl;
                    const imageName = s3Response.data.result.imageName;
                    const formData = { imageUrl, imageName };
                    localStorage.setItem("handwriteData", JSON.stringify(formData));
                }
            } catch (error) {
                console.error("이미지 업로드 또는 API 호출 실패:", error);
            }

            try {
                const receiptResponse = await axiosInstance(postAccountReceipt(file));
                if (receiptResponse.data.isSuccess) {
                    console.log("API 호출 성공:", receiptResponse.data.result);
                    const storedData = JSON.parse(localStorage.getItem("handwriteData") || "{}");
                    console.log("storedData:", storedData);
                    const finalData = { ...storedData, ...receiptResponse.data.result };
                    console.log("finalData:", finalData);
                    localStorage.setItem("handwriteData", JSON.stringify(finalData));
                    navigate("/finance/handwrite");
                }
                else {
                    navigate("/finance/handwrite");
                }
            } catch (error) {
                console.error("이미지 업로드 또는 API 호출 실패:", error);
                navigate("/finance/handwrite");
            }
        }, 500);
        
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
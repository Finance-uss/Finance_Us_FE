import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import { postS3 } from '../../../api/s3API';
import { postAccountReceipt } from '../../../api/financeAPI';

import * as S from '../../../styles/Finance/Camera/style';

import X from '../../../assets/icons/common/X.svg';
import Shutter from '../../../assets/icons/finance/Shutter.svg';

const Camera = () => {
    const videoRef = useRef();
    const canvasRef = useRef();
    const [capturedImage, setCapturedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, [capturedImage]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: { ideal: 'environment' }
                },
                audio: false,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            stream.getVideoTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const captureImage = () => {
        if(!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if(context) {
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            setCapturedImage(canvas.toDataURL('image/png'));
            stopCamera();
        }
    };

    const handleClick = async () => {
        if(capturedImage) {
            try {
                const byteString = atob(capturedImage.split(',')[1]);
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < byteString.length; i++) {
                    uint8Array[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([uint8Array], { type: 'image/png' });

                const file = new File([blob], "captured_image.png", { type: "image/png" });

                const response = await axiosInstance(postS3(file));
                if(response.data.isSuccess){
                    const imageUrl = response.data.result.imageUrl;
                    const imageName = response.data.result.imageName;
                    const formData = { imageUrl, imageName };
                    localStorage.setItem("handwriteData", JSON.stringify(formData));
                }
            }
            catch (error) {
                console.error(error);
            }

            try {
                const receiptResponse = await axiosInstance(postAccountReceipt(formData));
                if(receiptResponse.data.isSuccess){
                    const storedData = localStorage.getItem("handwriteData") || {};

                    const finalData = {
                        ...storedData,
                        ...receiptResponse.data.result,
                    }

                    localStorage.setItem("handwriteData", JSON.stringify(finalData));
                    navigate("/finance/handwrite");
                }
                else{
                    navigate("/finance/handwrite");
                }
            } catch (error) {
                navigate("/finance/handwrite");
            }
        }

    };

    return (
        <S.Container>
            {!capturedImage ? (
                <>
                    <S.Video ref={videoRef} autoPlay playsInline/>
                    <S.CaptureButton onClick={captureImage}>
                        <img src={Shutter} alt="shutter"/>
                    </S.CaptureButton>
                    <S.CloseButton onClick={() => navigate(-1)}>
                        <S.CloseImage src={X} alt="close"/>
                    </S.CloseButton>
                </>
            ) : (
                <>
                    <S.CapturedImage src={capturedImage} alt="captured"/>
                    <S.ButtonContainer>
                        <S.Button1 onClick={() => setCapturedImage(null)}>다시 찍기</S.Button1>
                        <S.Button2 onClick={handleClick}>사진 사용</S.Button2>
                    </S.ButtonContainer>
                    
                </>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }}/>
        </S.Container>
    );
};

export default Camera;

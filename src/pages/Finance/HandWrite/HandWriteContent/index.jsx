import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../api/axiosInstance.js";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";
import useApi from "../../../../hooks/useApi.js";
import { postS3 } from "../../../../api/s3API.js";
import { postAccount } from "../../../../api/financeAPI.js";
import { useAccount } from "../../../../hooks/useAccount.js";
import { formatFormData } from "../../../../utils/accountUtils.js";
import { Form, useNavigate } from "react-router-dom";
import { isSubmitDisabled } from "../../../../utils/validation.js";

import { Container } from "../../../../styles/Finance/style.js";
import * as S from "../../../../styles/Finance/HandWrite/style.js";

import BeforeHeader from "../../../../components/common/BeforeHeader/index.jsx";
import FinanceButton from "../../../../components/common/FinanceButton/index.jsx";
import SubmitButton from "../../../../components/common/SubmitButton/index.jsx";
import TextSection from "../../../../components/Finance/HandWrite/TextSection/index.jsx";
import OtherSection from "../../../../components/Finance/HandWrite/OtherSection/index.jsx";
import CalendarModal from "../../../../components/Finance/HandWrite/CalendarModal/index.jsx";
import CategoryModal from "../../../../components/Finance/HandWrite/CategoryModal/index.jsx";
import AssetModal from "../../../../components/Finance/HandWrite/AssetModal/index.jsx";
import RatingModal from "../../../../components/Finance/HandWrite/RatingModal/index.jsx";

import StateLayer1 from "../../../../assets/icons/finance/StateLayer1.svg";

const HandWriteContent = () => {
    const { formData, setFormField } = useHandWrite();
    const requiredFields = [
        "accountType", 
        "date", 
        "subName", 
        "subAssetName", 
        "amount", 
        "title", 
        "status", 
        "score", 
        "content"
    ];
    const navigate = useNavigate();
    const { request } = useApi();

    const [isDisabled, setIsDisabled] = useState(true);
    const [defaultImageFile, setDefaultImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const convertImageToFile = async () => {
            const response = await fetch(StateLayer1); // URL의 데이터를 가져오기
            const blob = await response.blob(); // Blob 객체로 변환
            const file = new File([blob], "default-image.svg", { type: "image/svg+xml" }); // File 객체로 변환
            setDefaultImageFile(file); // 변환된 파일을 상태로 저장
        };

        
        const fetchData = async () => {
            const storedData = localStorage.getItem("handwriteData");
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    // 🔹 formData의 모든 필드를 업데이트
                    Object.keys(parsedData).forEach((key) => {
                        if (parsedData[key]) {
                            setFormField(key, parsedData[key]);
                        }
                    });                    
                } catch (error) {
                    console.error("로컬스토리지 데이터 파싱 오류:", error);
                } finally {
                    setIsLoading(false);
                    localStorage.removeItem("handwriteData");
                }
            } else {
                setIsLoading(false);
            }
        };

        convertImageToFile();
        fetchData();
    }, []);


    useEffect(() => {
        setIsDisabled(isSubmitDisabled(formData || {}, requiredFields)); 
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isDisabled) return;
        if(formData.imageUrl === "") {
            try {
                const response = await axiosInstance(postS3(defaultImageFile));
                if(response.data.isSuccess) {
                    const imageUrl = response.data.result.imageUrl;
                    const imageName = response.data.result.imageName;
                    const formattedData = formatFormData({ 
                        ...formData, 
                        imageUrl,
                        imageName,
                    });
                    console.log(formattedData);
                    await axiosInstance(postAccount(formattedData));
                    navigate("/finance");
                }
            } catch (error) {
                console.error(error);
            }
        }
        else{
            const formattedData = formatFormData(formData);
            await request(postAccount(formattedData));
            navigate("/finance");
        }
    };

    if (isLoading) {
        return <></>; 
    }

    return (
        <Container>
            <BeforeHeader />
            <form onSubmit={handleSubmit}>
                {/* 지출/수익 버튼 */}
                <FinanceButton
                    activeButton={formData.accountType}
                    setActiveButton={(value) => setFormField("accountType", value)}
                />
                <TextSection/>
                <S.Line/>
                <OtherSection/>
                <SubmitButton 
                    text="작성 완료" 
                    disabled={isDisabled} 
                    customOpacity={!isDisabled ? 1 : 0.4}
                />
            </form>

            {/* 모달 컴포넌트 */}
            <CalendarModal />
            <CategoryModal type={formData.accountType}/>
            <AssetModal />
            <RatingModal/>
        </Container>
    )
};

export default HandWriteContent;
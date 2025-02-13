import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../../../hooks/useApi';
import { useAccountDetail } from '../../../../contexts/AccountDetailContext';
import { formatFormData } from '../../../../utils/accountUtils';
import { useNavigate } from 'react-router-dom';
import { isSubmitDisabled } from '../../../../utils/validation';

import { Container } from '../../../../styles/Finance/style';
import * as S from '../../../../styles/Finance/AccountDetail/style';

import BeforeHeader from '../../../../components/common/BeforeHeader';
import FinanceButton from '../../../../components/common/FinanceButton';
import SubmitButton from '../../../../components/common/SubmitButton';
import TextSection from '../../../../components/Finance/AccountDetail/TextSection';
import OtherSection from '../../../../components/Finance/AccountDetail/OtherSection';
import CalendarModal from '../../../../components/Finance/AccountDetail/CalendarModal';
import CategoryModal from '../../../../components/Finance/AccountDetail/CategoryModal';
import AssetModal from '../../../../components/Finance/AccountDetail/AssetModal';
import RatingModal from '../../../../components/Finance/AccountDetail/RatingModal';

const AccountDetailContent = () => {
    const { accountId } = useParams(); // URL에서 accountId 가져오기
    const { formData, setFormField } = useAccountDetail(JSON.parse(localStorage.getItem("selectedActivity")));
    const requiredFields = ["accountType", "date", "subName", "subAssetName", "amount", "title", "status", "score", "content"];
    const { request } = useApi();
    const navigate = useNavigate();

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        const storedActivity = JSON.parse(localStorage.getItem("selectedActivity"));
        if (storedActivity) {
            Object.keys(storedActivity).forEach((key) => {
                setFormField(key, storedActivity[key]);
            });
        }
    }, []);

    useEffect(() => {
        setIsDisabled(isSubmitDisabled(formData || {}, requiredFields)); // ✅ formData 변경 감지
    }, [formData]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = formatFormData(formData);
        try {
            await request({
                method: "PATCH",
                url: `/api/account/${accountId}`, // 해당 accountId에 대한 PATCH 요청
                body: formattedData, // 수정할 데이터 전달
            });
            console.log("PATCH 요청 성공");
            navigate(-1); // 이전 페이지로 이동
        } catch (err) {
            console.error("PATCH 요청 실패:", err);
        }
    };

    return (
        <Container>
            <BeforeHeader />
            <form onSubmit={handleSubmit}>
                <FinanceButton 
                    activeButton={formData.accountType} 
                    setActiveButton={(value) => setFormField("accountType", value)}
                />
                <TextSection />
                <S.Line />
                <OtherSection />
                
                <SubmitButton 
                    text="수정 완료" 
                    disabled={isDisabled} 
                    customOpacity={!isDisabled ? 1 : 0.4}
                />
            </form>

            <CalendarModal />
            <CategoryModal type={formData.accountType}/>
            <AssetModal />
            <RatingModal />

        </Container>
    );
};

export default AccountDetailContent;

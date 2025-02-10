import React from "react";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";
import { useAccount } from "../../../../hooks/useAccount.js";
import { formatFormData } from "../../../../utils/accountUtils.js";
import { useNavigate } from "react-router-dom";

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

const HandWriteContent = () => {
    const { formData, setFormField } = useHandWrite();
    const { handleRequest, loading, error } = useAccount();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = formatFormData(formData);
        console.log("작성 완료 데이터:", formattedData);
        navigate(-1);
        await handleRequest("POST", formattedData);
    };

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
                <SubmitButton text="작성 완료" />
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
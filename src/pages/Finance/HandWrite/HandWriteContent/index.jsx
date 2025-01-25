import React from "react";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
            <CategoryModal />
            <AssetModal />
            <RatingModal/>
        </Container>
    )
};

export default HandWriteContent;
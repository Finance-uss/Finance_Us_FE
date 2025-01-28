import React, { useState } from 'react';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import AmountHighlight from '../../../../components/User/Highlight';
import Toggle from '../../../../components/User/Toggle';
import { useNavigate } from 'react-router-dom';

const CalendarSetPage = () => {
    const navigate = useNavigate();

    const [isHighlightEnabled, setIsHighlightEnabled] = useState(true);
    const [currentColor, setCurrentColor] = useState('#FFD700');
    const [activePicker, setActivePicker] = useState(null);

    const handleBackClick = () => {
        navigate('/user');
    };

    const handleColorIndicatorClick = () => {
        setActivePicker((prev) => (prev === label ? null : label));
    };

    const handleColorChange = (color) => {
        setCurrentColor(color); // 선택한 색상을 업데이트
        setActivePicker(null); // 색상을 선택하면 팝업을 닫음
    };

    return (
        <PageContainer>
            {/* BackHeader */}
            <BackHeader title="캘린더 관리" onBackClick={handleBackClick} />

            {/* 금액 하이라이트 설정 */}
            <Section>
                <Title>금액 하이라이트 설정</Title>
                <Description>하루 중 일정 금액 이상 경제 활동이 발생할 때,</Description>

                {/* Toggle (금액 하이라이트 활성화) */}
                <ToggleWrapper>
                    <Toggle
                        id="highlight-toggle"
                        checked={isHighlightEnabled}
                        onChange={() => setIsHighlightEnabled(!isHighlightEnabled)}
                    />
                </ToggleWrapper>
            </Section>

            <HighlightWrapper>
                {/* 지출 금액 설정 */}
                <AmountHighlight 
                    label="지출" 
                    isActive={activePicker === '지출'}
                    onColorIndicatorClick={() => handleColorIndicatorClick('지출')}
                    onColorChange={handleColorChange}
                />

                {/* 수입 금액 설정 */}
                <AmountHighlight
                    label="수입"
                    isActive={activePicker === '수입'}
                    onColorIndicatorClick={() => handleColorIndicatorClick('수입')}
                    onColorChage={handleColorChange}
                />
            </HighlightWrapper>
        </PageContainer>
    );
};

export default CalendarSetPage;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
`;

const Section = styled.div`
    position: relative;
    padding-top: 40px;
    padding-bottom: 40px;

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
`;

const HighlightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`

const Title = styled.span`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
`;

const Description = styled.p`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    margin: 0;
`;

const ToggleWrapper = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%); 
`;

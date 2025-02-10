import React, { useState } from 'react';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import AmountHighlight from '../../../../components/User/Highlight';
import Toggle from '../../../../components/User/Toggle';
import { useNavigate } from 'react-router-dom';

const CalendarSetPage = () => {
    const navigate = useNavigate();

    const [isHighlightEnabled, setIsHighlightEnabled] = useState(true);
    const [colors, setColors] = useState({ 지출: 'rgba(255, 215, 0, 1)', 수입: 'rgba(131, 150, 195, 1)' });

    const handleBackClick = () => {
        navigate('/user');
    };

    // ✅ 색상 변경
    const handleColorChange = (color, label) => {
        setColors((prevColors) => ({
            ...prevColors,
            [label]: color, // 해당 Highlight 색상 업데이트
        }));
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

            {/* ✅ 토글이 켜져 있을 때만 HighlightWrapper 렌더링 */}
            {isHighlightEnabled && (
                <HighlightWrapper>
                    <AmountHighlight
                        label="지출"
                        selectedColor={colors.지출}
                        onColorChange={(color) => handleColorChange(color, '지출')}
                    />
                    <AmountHighlight
                        label="수입"
                        selectedColor={colors.수입}
                        onColorChange={(color) => handleColorChange(color, '수입')}
                    />
                </HighlightWrapper>
            )}
        </PageContainer>
    );
};

export default CalendarSetPage;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    position: relative;
`;

const Section = styled.div`
    position: relative;
    padding-top: 40px;
    padding-bottom: 40px;
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import AmountHighlight from '../../../../components/User/Highlight';
import Toggle from '../../../../components/User/Toggle';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../api/axiosInstance';

const CalendarSetPage = () => {
    const navigate = useNavigate();

    const [isHighlightEnabled, setIsHighlightEnabled] = useState(true);
    const [amounts, setAmounts] = useState({ 지출: 0, 수입: 0 });
    const [colors, setColors] = useState({ 지출: '', 수입: '' });

    const handleBackClick = () => {
        navigate('/user');
    };

    // API에서 데이터 가져오기
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }

            const response = await axiosInstance.get(`/api/user/user-preference`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.isSuccess) {
                const data = response.data.result;
                setIsHighlightEnabled(data.highlightSwitch);

                setAmounts({ 
                    지출: data.expenseAmount || 0, 
                    수입: data.incomeAmount || 0 
                });

                setColors({
                    지출: data.expenseColor || 'rgba(255, 215, 0, 1)',
                    수입: data.incomeColor || 'rgba(131, 150, 195, 1)',
                });
            }
        } catch (error) {
            console.error("❌ 데이터 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 토글 상태 변경 및 저장
    const handleToggleChange = async () => {
        const newValue = !isHighlightEnabled;
        setIsHighlightEnabled(newValue);
        await updateSettings({ highlightSwitch: newValue });
    };

    // 금액 변경 (지출/수입)
    const handleAmountChange = async (value, label) => {
        if (!/^\d*$/.test(value)) return; // 숫자만 입력 가능하도록 제한

        console.log(`[${label}] 입력한 값:`, value); // 입력된 값 확인

        setAmounts((prev) => {
            const updatedAmounts = { ...prev, [label]: value };
            console.log("📝 상태 업데이트 후 amounts:", updatedAmounts);
            return updatedAmounts;
        });

        // API 요청 전에 콘솔로 보낼 데이터 확인
        const updateData = label === '지출' ? { expenseAmount: Number(value) } : { incomeAmount: Number(value) };
        console.log("📡 API로 보낼 데이터:", updateData);

        await updateSettings(updateData);

        setAmounts((prev) => ({ ...prev, ...updateData }));
    };

    // 색상 변경 (지출/수입)
    const handleColorChange = async (color, label) => {
        setColors((prev) => {
            const updatedColors = { ...prev, [label]: color };
            console.log("상태 업데이트 후 colors:", updatedColors);
            return updatedColors;
        });
    
        await updateSettings(label === '지출' ? { expenseColor: color } : { incomeColor: color });
    
        // API 성공 후 프론트 상태 업데이트
        setColors((prev) => ({
            ...prev,
            [label]: color
        }));
    };

    // API 업데이트
    const updateSettings = async (updateData = {}) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }

            const payload = {
                highlightSwitch: isHighlightEnabled,
                expenseAmount: Number(amounts.지출),
                incomeAmount: Number(amounts.수입),
                expenseColor: colors.지출,
                incomeColor: colors.수입,
                ...updateData,
            };

            console.log("API로 보낼 데이터:", payload);

            const response = await axiosInstance.patch(`/api/user/user-preference`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                params: payload,
            });

            console.log("서버 응답:", response.data);

            if (response.data.isSuccess) {
                console.log("🔄 변경된 데이터 다시 불러오기...");
                fetchData(); // ✅ 최신 데이터 다시 불러오기
            } else {
                console.error("❌ 설정 업데이트 실패:", response.data);
            }
        } catch (error) {
            console.error("❌ 설정 업데이트 중 오류 발생:", error);
        }
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
                        onChange={handleToggleChange}
                    />
                </ToggleWrapper>
            </Section>

            {/* 토글이 켜져 있을 때만 HighlightWrapper 렌더링 */}
            {isHighlightEnabled && (
                <HighlightWrapper>
                    <AmountHighlight
                        label="지출"
                        amount={amounts.지출}
                        selectedColor={colors.지출}
                        onAmountChange={(value) => handleAmountChange(value, '지출')}
                        onColorChange={(color) => handleColorChange(color, '지출')}
                    />
                    <AmountHighlight
                        label="수입"
                        amount={amounts.수입}
                        selectedColor={colors.수입}
                        onAmountChange={(value) => handleAmountChange(value, '수입')}
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

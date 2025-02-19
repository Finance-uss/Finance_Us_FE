import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../../../../api/axiosInstance';
import BackHeader from '../../../../components/User/BackHeader';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import PlusCateButton from '../../../../components/User/PlusCateButton';
import AmountInputContainer from '../../../../components/User/AmountInputContainer';
import AmountInput from '../../../../components/User/AmountInput';

const IncomePage = () => {
    const navigate = useNavigate();
    const [totalIncome, setTotalIncome] = useState('');
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // 수익 목표 금액 조회 API (GET)
    const loadIncomeGoals = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("로그인이 필요합니다.");
                return;
            }

            const response = await axiosInstance.get(`/api/mypage/goal-asset`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { type: "income" },
            });

            console.log("서버에서 불러온 데이터:", response.data.result);
            
            if (!response.data.isSuccess) {
                setErrorMessage("목표 금액 데이터를 불러올 수 없습니다.");
                return;
            }

            const goalData = response.data.result;

            setTotalIncome(goalData.monthlyGoal || 0); // 총 목표 금액 설정
            setCategories(goalData.subCategories || []); // 카테고리 목록 설정
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요.");
            console.error("목표 금액 조회 실패:", error);
        }
    };

    // 페이지 처음 로드 시 목표 금액 데이터 불러오기
    useEffect(() => {
        loadIncomeGoals(); 
      }, []);

    // 카테고리 목표 금액 수정 시 반영
    const updateCategoryAmount = (subId, value) => {
        if (!/^\d*$/.test(value)) return; // 숫자만 입력 가능
    
        setCategories((prev) => {
            const updatedCategories = prev.map((sub) =>
                sub.id === subId ? { ...sub, goal: value } : sub
            );
    
            // 업데이트된 categories를 기반으로 총 목표 금액 계산
            const updatedTotal = updatedCategories.reduce(
                (sum, sub) => sum + Number(sub.goal || 0),
                0
            );
            setTotalExpense(updatedTotal);
    
            return updatedCategories;
        });
    };

    // 목표 금액 저장
    const saveChanges = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }

            const subGoals = categories.map((sub) => ({
                id: sub.id,
                goal: Number(sub.goal) || 0, // 숫자로 변환
            }));

            console.log("서버로 보낼 데이터 (body):", subGoals);

            const response = await axiosInstance.patch(
                `/api/mypage/goal-asset`,
                {
                    type: "INCOME", // 수익 목표
                    subGoals: subGoals, // 배열을 body에 직접 전달
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("서버 응답:", response.data);

            if (response.data.isSuccess) {
                alert("수익 목표 금액이 저장되었습니다.");
                navigate("/user");
            } else {
                setErrorMessage("목표 금액 저장에 실패했습니다.");
                console.error("❌ 서버 응답 오류:", response.data);
            }
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요.");
            if (error.response) {
                console.error("❌ 저장 실패 (서버 에러 응답 데이터):", error.response.data);
                console.error("❌ 저장 실패 (서버 응답 상태 코드):", error.response.status);
                console.error("❌ 저장 실패 (서버 응답 헤더):", error.response.headers);
            } else if (error.request) {
                console.error("❌ 저장 실패 (서버 응답 없음):", error.request);
            } else {
                console.error("❌ 저장 실패 (기타 오류):", error.message);
            }
        }
    };

    return (
        <PageContainer>
            <HeaderWrapper>
                <BackHeaderWrapper>
                  <BackHeader title="수익 목표 금액 설정" onBackClick={() => navigate('/user')} />
                </BackHeaderWrapper>
            </HeaderWrapper>
            <ContentWrapper>
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                <SectionTitle>이번 달 총 수익 목표 금액</SectionTitle>
                <AmountInputWrapper>
                    <AmountInput
                        value={totalIncome}
                        onChange={() => {}} readOnly 
                    />
                </AmountInputWrapper>
                <SectionTitle style={{ marginTop: '40px' }}>이번 달 카테고리 별 수익 목표 금액</SectionTitle>
                <CategoryList>
                    {categories.map((item) => (
                        <AmountInputContainer
                            key={sub.id}
                            mainName={sub.mainCategory} // 대분류 전달
                            name={sub.subCategory} // 소분류 전달
                            value={sub.goal || ""}
                            onChange={(value) => updateCategoryAmount(sub.id, value)}
                        />
                    ))}
                </CategoryList>
            </ContentWrapper>
            <CompleteButtonComponent label="수익 목표 금액 설정 완료" onSave={saveChanges} />
        </PageContainer>
    );
};

export default IncomePage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
`;

const BackHeaderWrapper = styled.div`
  padding: 0 20px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: 80px;
  padding-bottom: 100px;
  overflow-y: auto;
`;

const SectionTitle = styled.h2`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin: 0;
`;

const AmountInputWrapper = styled.div`
  margin-top: 16px;
`;

const CategoryList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const PlusCateButtonWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

const ErrorText = styled.p`
    color: red;
    text-align: center;
    font-size: 14px;
    margin-bottom: 20px;
`;
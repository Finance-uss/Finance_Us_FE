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
            const response = await axiosInstance.get(`/api/mypage/goal-asset`, {
                params: { type: "income" },
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
    
            if (!response.data.isSuccess) {
                setErrorMessage("목표 금액 데이터를 불러올 수 없습니다.");
                return;
            }
    
            const goalData = response.data.result;
    
            setTotalIncome(goalData.monthlyGoal || ""); 
            setCategories(goalData.subCategories || []); 
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요.");
            console.error("목표 금액 조회 실패:", error);
        }
    };

    // 페이지 처음 로드 시 목표 금액 데이터 불러오기
    useEffect(() => {
        loadIncomeGoals(); 
      }, []);

    // 새로운 카테고리 추가
    const addCategory = () => {
        const newId = categories.length + 1; 
        const newCategory = {
            id: newId,
            name: `새 카테고리 ${newId}`,
            subCategories: [{ id: `${newId}-1`, name: "소분류 없음", goal: 0 }], // ✅ 기본 소분류 추가
        };
        setCategories((prev) => [...prev, newCategory]);
    };

    // 총 목표 금액 업데이트
    const updateTotalIncome = (value) => {
        if (!/^\d*$/.test(value)) return; // 숫자 이외의 값은 무시
        setTotalIncome(value);
      };

    // 카테고리별 목표 금액 업데이트
    const updateCategoryAmount = (id, value) => {
        if (!/^\d*$/.test(value)) return; 
        setCategories((prev) =>
          prev.map((item) => (item.id === id ? { ...item, goal: value } : item))
        );
    };

    // 특정 카테고리 삭제 
    const removeCategory = (id) => {
        setCategories((prev) => prev.filter((item) => item.id !== id));
    };

    // 목표 금액 저장
    const saveChanges = async () => {
        try {
            const payload = {
                type: "expense",
                subGoals: categories.map((item) => ({
                    id: item.id,
                    goal: item.goal || 0,
                })),
            };

            const response = await axiosInstance.patch(`/api/mypage/goal-asset`, payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (response.data.isSuccess) {
                alert("지출 목표 금액이 저장되었습니다.");
                navigate("/user");
            } else {
                setErrorMessage("목표 금액 저장에 실패했습니다.");
            }
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요.");
            console.error("목표 금액 저장 실패:", error);
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
                        onChange={updateTotalIncome} 
                    />
                </AmountInputWrapper>
                <SectionTitle style={{ marginTop: '40px' }}>이번 달 카테고리 별 수익 목표 금액</SectionTitle>
                <CategoryList>
                    {categories.map((item) => (
                        <AmountInputContainer
                          key={item.id}
                          category={`${item.mainCategory}/${item.subCategory}`} 
                          value={item.goal || ""} 
                          onChange={(value) => updateCategoryAmount(item.id, value)}
                          onRemove={() => removeCategory(item.id)}
                        />
                    ))}
                </CategoryList>
                <PlusCateButtonWrapper>
                    <PlusCateButton onClick={addCategory} />
                </PlusCateButtonWrapper>
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
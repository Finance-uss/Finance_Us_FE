import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import PlusCateButton from '../../../../components/User/PlusCateButton';
import AmountInputContainer from '../../../../components/User/AmountInputContainer';
import AmountInput from '../../../../components/User/AmountInput';

const ExpensePage = () => {
    const navigate = useNavigate();

    const [totalExpense, setTotalExpense] = useState('');
    const [categories, setCategories] = useState([]);

    const loadCategories = async () => {
        try {
          // API 호출 로직 (더미 데이터 사용)
          const response = [
            { id: 0, category: '식비', subcategories: ['외식', '배달', '식재료'] },
            { id: 1, category: '교통', subcategories: ['대중교통', '택시', '주유'] },
            { id: 2, category: '여가/취미', subcategories: ['영화/공연', '취미 용품', '여행'] },
            { id: 3, category: '건강/의료', subcategories: ['병원비', '약국', '건강 식품'] },
          ];
    
          setCategories(response); 
        } catch (error) {
          console.error('카테고리 로드 실패:', error);
        }
    };

    useEffect(() => {
        loadCategories(); 
    }, []);

    const addCategory = () => {
        const newId = categories.length;
        setCategories([
        ...categories,
        {
            id: newId,
            category: '대분류',
            subcategories: ['소분류'], 
            amount: '',
        },
        ]);
    };

    const updateTotalExpense = (value) => {
        if (!/^\d*$/.test(value)) return; // 숫자 이외의 값은 무시
        setTotalExpense(value);
      };

    const updateCategoryAmount = (id, value) => {
        if (!/^\d*$/.test(value)) return; 
        setCategories((prev) =>
        prev.map((item) => (item.id === id ? { ...item, amount: value } : item))
        );
    };

    const removeCategory = (id) => {
        setCategories((prev) => prev.filter((item) => item.id !== id));
    };

    const saveChanges = () => {
        const updatedData = {
          totalExpense,
          categories: categories.map((item) => ({
            category: item.category,
            subcategory: item.subcategories[0],
            amount: item.amount,
          })),
        };
    
        console.log('저장된 데이터:', updatedData);
        // 실제 저장 로직(API 호출 등) 추가
      };

    return (
        <PageContainer>
            <HeaderWrapper>
                <BackHeader title="지출 목표 금액 설정" onBackClick={() => navigate('/user')} />
            </HeaderWrapper>
            <ContentWrapper>
                <SectionTitle>이번 달 총 지출 목표 금액</SectionTitle>
                <AmountInputWrapper>
                    <AmountInput
                        value={totalExpense}
                        onChange={updateTotalExpense}
                    />
                </AmountInputWrapper>
                <SectionTitle style={{ marginTop: '40px' }}>이번 달 카테고리 별 지출 목표 금액</SectionTitle>
                <CategoryList>
                    {categories.map((item) => (
                        <AmountInputContainer
                            key={item.id}
                            category={`${item.category}/${item.subcategories[0] || ''}`} 
                            value={item.amount || ''} 
                            onChange={(value) => updateCategoryAmount(item.id, value)}
                            onRemove={() => removeCategory(item.id)}
                        />
                    ))}
                </CategoryList>
                <PlusCateButtonWrapper>
                    <PlusCateButton onClick={addCategory} />
                </PlusCateButtonWrapper>
            </ContentWrapper>
            <CompleteButtonComponent label="지출 목표 금액 설정 완료" onSave={saveChanges} />
        </PageContainer>
    );
};

export default ExpensePage;

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

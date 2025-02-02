import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import PlusCateButton from '../../../../components/User/PlusCateButton';
import AmountInputContainer from '../../../../components/User/AmountInputContainer';
import AmountInput from '../../../../components/User/AmountInput';

const IncomePage = () => {
    const navigate = useNavigate();

    const [totalExpense, setTotalExpense] = useState('');
    const [categories, setCategories] = useState([]);

    // API 호출을 통해 카테고리 데이터 가져오기
    const loadCategories = async () => {
        try {
        // API 호출 로직 (더미 데이터 사용)
        const response = [
            { id: 0, category: '급여', subcategories: ['월급', '상여금', '수당'] },
            { id: 1, category: '투자 수익', subcategories: ['주식', '예금 이자', '부동산'] },
            { id: 2, category: '기타 수익', subcategories: ['중고 거래', '용돈', '환불/환급'] },
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
            subcategories: ['소분류'], // 기본값으로 소분류 추가
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

    const handleSave = () => {
        console.log('수익 설정 저장:', categories);
        // 저장 로직 추가
    };

    return (
        <PageContainer>
            <HeaderWrapper>
                <BackHeaderWrapper>
                  <BackHeader title="수익 목표 금액 설정" onBackClick={() => navigate('/user')} />
                </BackHeaderWrapper>
            </HeaderWrapper>
            <ContentWrapper>
                <SectionTitle>이번 달 총 수익 목표 금액</SectionTitle>
                <AmountInputWrapper>
                    <AmountInput
                        value={totalExpense}
                        onChange={updateTotalExpense} 
                    />
                </AmountInputWrapper>
                <SectionTitle style={{ marginTop: '40px' }}>이번 달 카테고리 별 수익 목표 금액</SectionTitle>
                <CategoryList>
                    {categories.map((item, index) => (
                        <AmountInputContainer
                            key={item.id}
                            category={`${item.category}/${item.subcategories[0] || ''}`} 
                            value={item.amount || ''} // amount 초기값 처리
                            onChange={(value) => updateCategoryAmount(item.id, value)}
                            onRemove={() => removeCategory(item.id)}
                        />
                    ))}
                </CategoryList>
                <PlusCateButtonWrapper>
                    <PlusCateButton onClick={addCategory} />
                </PlusCateButtonWrapper>
            </ContentWrapper>
            <CompleteButtonComponent label="수익 목표 금액 설정 완료" onSave={handleSave} />
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

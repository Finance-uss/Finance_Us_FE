import React, { useState } from 'react';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import TopBar from '../../../../components/common/TopBar';
import CateContainer from '../../../../components/User/CateContainer';
import PlusCateButton from '../../../../components/User/PlusCateButton';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
    const defaultCategories = [
        {
          id: 0,
          title: "식비",
          subcategories: ["외식", "배달", "식재료"],
        },
        {
          id: 1,
          title: "교통",
          subcategories: ["대중교통", "택시", "주유"],
        },
        {
          id: 2,
          title: "여가/취미",
          subcategories: ["영화/공연", "취미 용품", "여행"],
        },
        {
          id: 3,
          title: "건강/의료",
          subcategories: ["병원비", "약국", "건강 식품"],
        },
    ];
    const navigate = useNavigate();
    
    const [cateContainers, setCateContainers] = useState(defaultCategories); // 기본 4개

    const addCateContainer = () => {
        const newId = cateContainers.length;
        setCateContainers((prev) => [
            ...prev,
            { id: newId, title: `새 카테고리 ${newId + 1}`, subcategories: [] },
        ]);
    };

    // CateContainer 삭제 함수
    const removeCateContainer = (id) => {
        setCateContainers((prev) => prev.filter((container) => container.id !== id));
    };

    // 변경사항 저장 함수
    const handleSave = () => {
        console.log('카테고리 변경사항 저장:', cateContainers);
        // 여기에 실제 저장 로직 추가 (API 호출)
    };

    const handleBackClick = () => {
        navigate('/user');
    };

    return (
        <CategoryPageContainer>
            <FixedHeaderWrapper>
                <BackHeader title="카테고리 설정" onBackClick={handleBackClick} />
                <TopBarWrapper>
                    <TopBar leftText="지출" rightText="수익" />
                </TopBarWrapper>
            </FixedHeaderWrapper>
            <ContentWrapper>
                {/* CateContainer 렌더링 */}
                {cateContainers.map((container) => (
                    <CateContainer
                        key={container.id}
                        id={container.id}
                        title={container.title}
                        subcategories={container.subcategories} // 전달
                        onRemove={removeCateContainer}
                    />
                ))}
                {/* PlusCateButton 렌더링 */}
                <PlusCateButtonWrapper>
                    <PlusCateButton onClick={addCateContainer} />
                </PlusCateButtonWrapper>
            </ContentWrapper>
            <CompleteButtonComponent label="지출 카테고리 설정 완료" onSave={handleSave} />
        </CategoryPageContainer>
    );
};

export default CategoryPage;

const CategoryPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-x: hidden; /* 가로 스크롤 방지 */
    overflow-y: hidden; /* 세로 스크롤 방지 */
`;

const FixedHeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10; /* 고정된 헤더 레이어 */
    background-color: white; /* 헤더 배경 */
`;

const TopBarWrapper = styled.div`
    position: absolute;
    top: 88px; /* 상단에서 88px 아래 */
    padding: 0 20px; /* 양 옆 20px 패딩 */
`;

const ContentWrapper = styled.div`
    margin-top: 156px;
    display: flex;
    flex-direction: column;
    gap: 40px; /* CateContainer 간 간격 */
    padding: 0 20px; /* 양 옆 20px 패딩 */
    flex: 1;
    overflow-y: auto; /* 세로 스크롤 가능 */
    overflow-x: hidden; /* 가로 스크롤 방지 */
    padding-bottom: 120px; /* CompleteButton과 겹치지 않도록 여백 */
`;

const PlusCateButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0;
`;
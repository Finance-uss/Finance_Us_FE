import React, { useState } from 'react';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import TopBar from '../../../../components/common/TopBar';
import CateContainer from '../../../../components/User/CateContainer';
import PlusCateButton from '../../../../components/User/PlusCateButton';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import { useNavigate } from 'react-router-dom';

const CategoryExpensePage = () => {
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
    const [selectedTab, setSelectedTab] = useState(0); 

    const [cateContainers, setCateContainers] = useState(defaultCategories); 

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

    // 탭 클릭 이벤트 핸들러
    const handleTabClick = (index) => {
        setSelectedTab(index);
        if (index === 0) {
            navigate("/user/expense-category"); // 지출 페이지
        } else {
            navigate("/user/income-category"); // 수익 페이지
        }
    };

    return (
        <CategoryPageContainer>
            <FixedHeaderWrapper>
                <BackHeaderWrapper>
                    <BackHeader title="카테고리 설정" onBackClick={handleBackClick} />
                </BackHeaderWrapper>
                <TopBarWrapper>
                    <TopBar
                        leftText="지출"
                        rightText="수익"
                        onTabClick={handleTabClick}
                        selectedTab={selectedTab} 
                    />
                </TopBarWrapper>
            </FixedHeaderWrapper>
            <ContentWrapper>
                {/* CateContainer 렌더링 */}
                {cateContainers.map((container) => (
                    <CateContainer
                        key={container.id}
                        id={container.id}
                        title={container.title}
                        subcategories={container.subcategories} 
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

export default CategoryExpensePage;

const CategoryPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
`;

const FixedHeaderWrapper = styled.div`
    position: fixed;
    width: 100%;
    z-index: 10; 
    background-color: white; 
`;

const BackHeaderWrapper = styled.div`
    padding: 0 20px;
`;

const TopBarWrapper = styled.div`
    position: absolute;
    width: calc(100% - 40px);
    padding: 0 20px; 
`;

const ContentWrapper = styled.div`
    margin-top: 156px;
    display: flex;
    flex-direction: column;
    gap: 40px; 
    padding: 0 20px; 
    flex: 1;
    overflow-y: auto; 
    overflow-x: hidden; 
    padding-bottom: 120px; 
`;

const PlusCateButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0;
`;
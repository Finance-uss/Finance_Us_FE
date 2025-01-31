import React, { useState } from 'react';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import TopBar from '../../../../components/common/TopBar';
import CateContainer from '../../../../components/User/CateContainer';
import PlusCateButton from '../../../../components/User/PlusCateButton';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import { useNavigate } from 'react-router-dom';

const CategoryIncomePage = () => {
    const defaultCategories = [ 
        {
        id: 0,
        title: "급여",
        subcategories: ["월급", "상여금", "수당"],
        },
        {
        id: 1,
        title: "투자 수익",
        subcategories: ["주식", "예금 이자", "부동산"],
        },
        {
        id: 2,
        title: "기타 수익",
        subcategories: ["중고 거래", "용돈", "환불/환급"],
        },
    ];
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(1); 
    const [cateContainers, setCateContainers] = useState(defaultCategories);

    const addCateContainer = () => {
        const newId = cateContainers.length;
        setCateContainers((prev) => [
        ...prev,
        { id: newId, title: `새 카테고리 ${newId + 1}`, subcategories: [] },
        ]);
    };

    const removeCateContainer = (id) => {
        setCateContainers((prev) => prev.filter((container) => container.id !== id));
    };

    const handleSave = () => {
        console.log('수익 카테고리 변경사항 저장:', cateContainers);
        // 실제 저장 로직 추가
    };

    const handleBackClick = () => {
        navigate('/user');
    };

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
                <BackHeader title="카테고리 설정" onBackClick={handleBackClick} />
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
            <CompleteButtonComponent label="수익 카테고리 설정 완료" onSave={handleSave} />
        </CategoryPageContainer>
    );
};

export default CategoryIncomePage;

const CategoryPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
`;

const FixedHeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    background-color: white;
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

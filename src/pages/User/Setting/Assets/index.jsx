import React, { useState } from 'react';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import CateContainer from '../../../../components/User/CateContainer';
import PlusCateButton from '../../../../components/User/PlusCateButton';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import { useNavigate } from 'react-router-dom';

const AssetsPage = () => {
  const defaultCategories = [
    {
      id: 0,
      title: "결제 수단",
      subcategories: ["신용카드", "체크카드", "선불카드"],
    },
    {
      id: 1,
      title: "은행 계좌",
      subcategories: ["급여 통장", "저축 통장", "CMA 계좌"],
    },
    {
      id: 2,
      title: "현금",
      subcategories: ["현금", "비상금", "기타 현금"],
    },
  ];

  const navigate = useNavigate();
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
    console.log("자산 카테고리 저장:", cateContainers);
    // 저장 로직 추가
  };

  const handleBackClick = () => {
    navigate('/user'); // 마이페이지로 돌아가기
  };

  return (
    <AssetsPageContainer>
      <FixedHeaderWrapper>
        <BackHeader title="자산 설정" onBackClick={handleBackClick} />
      </FixedHeaderWrapper>
      <ContentWrapper>
        {cateContainers.map((container) => (
          <CateContainer
            key={container.id}
            id={container.id}
            title={container.title}
            subcategories={container.subcategories}
            onRemove={removeCateContainer}
          />
        ))}
        <PlusCateButtonWrapper>
          <PlusCateButton onClick={addCateContainer} />
        </PlusCateButtonWrapper>
      </ContentWrapper>
      <CompleteButtonComponent label="카테고리 설정 완료" onSave={handleSave} />
    </AssetsPageContainer>
  );
};

export default AssetsPage;

const AssetsPageContainer = styled.div`
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

const ContentWrapper = styled.div`
  margin-top: 108px;
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

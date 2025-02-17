import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../../../api/axiosInstance';
import BackHeader from '../../../../components/User/BackHeader';
import CateContainer from '../../../../components/User/CateContainer';
import PlusCateButton from '../../../../components/User/PlusCateButton';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import { useNavigate } from 'react-router-dom';

const AssetsPage = () => {
  const navigate = useNavigate();
  const [cateContainers, setCateContainers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // 자산 조회 API 호출
  const fetchAssets = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axiosInstance.get('/api/mypage/asset', {
        headers: { Authorization: `Bearer ${storedToken}` }
      });

      console.log("자산 조회 응답:", response.data);

      if (response.data.isSuccess) {
        setCateContainers(response.data.result);
        setErrorMessage("");
      } else {
        setErrorMessage("자산 데이터를 불러올 수 없습니다.");
      }
    } catch (error) {
      setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요.");
      console.error("자산 조회 실패:", error);
    }
  };

  // 페이지 진입 시 데이터 로드
  useEffect(() => {
    fetchAssets();
  }, []);

  // 메인 자산 추가 API
  const addCateContainer = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axiosInstance.post("/api/mypage/asset/main", null, {
        headers: { Authorization: `Bearer ${storedToken}` },
        params: { mainName: "새 자산" }
      });

      if (response.data.isSuccess) {
        setCateContainers(prev => [...prev, response.data.result]);
        console.log("새 자산 추가됨:", response.data.result);
      } else {
        setErrorMessage("자산 추가에 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("자산 추가 중 오류가 발생했습니다.");
      console.error("자산 추가 실패:", error);
    }
  };

  // 메인 자산 삭제 API
  const handleRemoveMainCategory = async (categoryId) => {
    const storedToken = localStorage.getItem("token");
    try {
      const response = await axiosInstance.delete(`/api/mypage/asset/main`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        params: { mainId: categoryId },
      });

      if (response.data.isSuccess) {
        setCateContainers(prev => prev.filter(category => category.id !== categoryId));
      } else {
        console.error("자산 삭제 실패:", response.data.message);
      }
    } catch (error) {
      console.error("자산 삭제 요청 실패:", error);
    }
  };

  const handleBackClick = () => {
    navigate('/user'); // 마이페이지로 돌아가기
  };

  return (
    <AssetsPageContainer>
      <FixedHeaderWrapper>
          <BackHeaderWrapper>
              <BackHeader title="자산 설정" onBackClick={handleBackClick} />
          </BackHeaderWrapper>
      </FixedHeaderWrapper>
      <ContentWrapper>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {cateContainers.length > 0 ? (
          cateContainers.map((container) => (
            <CateContainer
              key={container.id}
              id={container.id}
              title={container.name} 
              subcategories={container.subAssets || []} 
              onRemove={() => handleRemoveMainCategory(container.id)}
              isAssetPage={true} 
              refreshAssets={fetchAssets}
            />
          ))
        ) : (
          <NoAssetsText>등록된 자산이 없습니다.</NoAssetsText>
        )}
        <PlusCateButtonWrapper>
          <PlusCateButton onClick={addCateContainer} />
        </PlusCateButtonWrapper>
      </ContentWrapper>
      <CompleteButtonComponent label="카테고리 설정 완료" />
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

const BackHeaderWrapper = styled.div`
    padding: 0 20px;
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

const ErrorText = styled.p`
  color: red;
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
`;

const NoAssetsText = styled.p`
  text-align: center;
  font-size: 16px;
  color: gray;
  margin-top: 20px;
`;
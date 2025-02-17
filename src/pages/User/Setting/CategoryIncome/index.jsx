import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../api/axiosInstance';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import TopBar from '../../../../components/common/TopBar';
import CateContainer from '../../../../components/User/CateContainer';
import PlusCateButton from '../../../../components/User/PlusCateButton';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';
import { useNavigate } from 'react-router-dom';

const CategoryIncomePage = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(1); 
    const [cateContainers, setCateContainers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
        console.log("🟡 현재 저장된 토큰:", storedToken);

        if (!storedToken) {
            setErrorMessage("로그인이 필요합니다.");
        } else {
            console.log("[CategoryIncomePage] fetchCategories 실행됨!");
            fetchCategories(storedToken);
        }
    }, []);

    // API에서 카테고리 데이터 가져오기
    const fetchCategories = async (storedToken) => {
        try {
            console.log("[CategoryIncomePage] 카테고리 불러오기 요청 시작");
            const response = await axiosInstance.get(`/api/mypage/category`, {
                headers: { Authorization: `Bearer ${storedToken}` }, // 토큰 추가
                params: { type: "income" }, // type 추가
            });

            console.log("[CategoryIncomePage] API 응답:", response.data);

            if (response.data.isSuccess) {
                console.log("[CategoryIncomePage] 응답 데이터 구조:", response.data.result);
                setCateContainers(response.data.result);
                setErrorMessage(""); // 에러 메시지 초기화
            } else {
                setErrorMessage("카테고리 데이터를 불러올 수 없습니다.");
            }
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요.");
            console.error("카테고리 불러오기 실패:", error);
        }
    };

    // 대분류 추가 API 요청
    const addCateContainer = async () => {
        const newCategory = { name: "새 카테고리", categoryType: "INCOME" };

        try {
            const storedToken = localStorage.getItem("token");
            const response = await axiosInstance.post("/api/mypage/category/main", newCategory, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });

            if (response.data.isSuccess) {
                const newCategoryData = response.data.result;
                
                setCateContainers(prev => [...prev, newCategoryData]); 
                console.log("새 카테고리 추가됨:", newCategoryData);
            } else {
                setErrorMessage("카테고리 추가에 실패했습니다.");
            }
        } catch (error) {
            setErrorMessage("카테고리를 추가하는 중 오류가 발생했습니다.");
            console.error("카테고리 추가 실패:", error);
        }
    };

    // 대분류 삭제 API 요청
    const handleRemoveMainCategory = async (categoryId) => {
        const storedToken = localStorage.getItem("token");
        try {
            const response = await axiosInstance.delete(`/api/mypage/category/main`, {
                headers: { Authorization: `Bearer ${storedToken}` },
                params: { mainId: categoryId },
            });

            if (response.data.isSuccess) {
                console.log("대분류 삭제 성공:", categoryId);
                setCateContainers(prev => prev.filter(category => category.id !== categoryId));
            } else {
                console.error("대분류 삭제 실패:", response.data.message);
            }
        } catch (error) {
            console.error("대분류 삭제 요청 실패:", error);
        }
    };

    const handleBackClick = () => {
        navigate('/user');
    };

    // 탭 클릭 이벤트 핸들러
    const handleTabClick = (index) => {
        setSelectedTab(index);
        if (index === 0) {
            navigate("/user/expense-category");
        } else {
            navigate("/user/income-category");
            const storedToken = localStorage.getItem("token");
            fetchCategories(storedToken); 
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
                {/* 에러 메시지 표시 */}
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

                {/* CateContainer 렌더링 (대분류 & 소분류) */}
                {cateContainers.map((container) => (
                    <CateContainer
                        key={container.id}
                        id={container.id}
                        title={container.name} // 대분류 이름
                        subcategories={container.subCategories} 
                        onRemove={() => handleRemoveMainCategory(container.id)}
                        isAssetPage={false} 
                    />
                ))}
                {/* PlusCateButton 렌더링 */}
                <PlusCateButtonWrapper>
                    <PlusCateButton onClick={addCateContainer} />
                </PlusCateButtonWrapper>
            </ContentWrapper>
            <CompleteButtonComponent label="수익 카테고리 설정 완료" />
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

const ErrorText = styled.p`
    color: red;
    text-align: center;
    font-size: 14px;
    margin-bottom: 20px;
`;
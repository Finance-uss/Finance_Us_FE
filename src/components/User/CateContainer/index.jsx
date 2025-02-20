import React, { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { Container, Title, ButtonWrapper, ButtonBox, TitleWrapper, CloseIcon, EditableInput } from '../../../styles/User/CateContainer/style';
import CateButton from '../../../components/common/CateButton/index';
import PlusButton from '../../../components/common/PlusButton'
import deleteCate from '../../../assets/icons/common/User/DeleteCate.svg';

const CateContainer = ({ id, title, subcategories, onRemove, isAssetPage }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false); // 대분류 제목 수정 상태
    const [editedTitle, setEditedTitle] = useState(title); // 수정된 제목
    const [buttons, setButtons] = useState(subcategories); // 소분류 목록
    const [editingIndex, setEditingIndex] = useState(null); // 소분류 수정 상태

    const storedToken = localStorage.getItem("token");

    // 대분류 제목 수정 API
    const updateCategoryName = async () => {
        try {
            if (isAssetPage) {
                const endpoint = "/api/mypage/asset/main";
    
                const response = await axiosInstance.patch(endpoint, null, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                    params: { mainId: id, mainName: editedTitle } 
                });
    
                console.log("메인 자산 수정 성공:", response.data);
            } else {
                const endpoint = "/api/mypage/category/main";
    
                const response = await axiosInstance.patch(endpoint, { id, name: editedTitle }, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });
    
                console.log("메인 카테고리 수정 성공:", response.data);
            }
        } catch (error) {
            console.error(`${isAssetPage ? "메인 자산" : "메인 카테고리"} 수정 실패:`, error);
    
            if (error.response) {
                console.error("서버 응답 코드:", error.response.status);
                console.error("서버 응답 데이터:", error.response.data);
            }
        }
    };

    // 서브 추가 (카테고리 & 자산 분리)
    const addSubCategory = async () => {
        try {
            const endpoint = isAssetPage ? "/api/mypage/asset/sub" : "/api/mypage/category/sub";
            const requestData = isAssetPage
            ? { mainId: id, subName: "새 서브 자산" }
            : { mainId: id, name: "새 소분류", goal: 0 };
            
            console.log("서브 추가 요청 데이터:", requestData);

            const response = await axiosInstance.post(endpoint, requestData, {
                headers: { 
                    Authorization: `Bearer ${storedToken}`,
                    "Content-Type": "application/json"  // JSON 타입 명시
                },
                params: requestData
            });

            console.log("서브 추가 응답:", response.data);

            if (response.data.isSuccess) {
                console.log("서브 추가 성공:", response.data.result);
                setButtons([...buttons, response.data.result]);

                if (typeof refreshAssets === 'function') {
                    refreshAssets();
                }
            } else {
                console.error("서브 추가 실패 (서버 응답 오류):", response.data.message);
            }
        } catch (error) {
            console.error("서브 추가 실패:", error);   
        }
    };

    // 서브 수정 (카테고리 & 자산 분리)
    const updateSubCategory = async (subId, newName) => {
        try {
            if (isAssetPage) {
                const endpoint = "/api/mypage/asset/sub";
    
                const response = await axiosInstance.patch(endpoint, null, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                    params: { subId: subId, subName: newName } 
                });
    
                console.log("서브 자산 수정 성공:", response.data);
            } else {
                const endpoint = "/api/mypage/category/sub";
    
                const response = await axiosInstance.patch(endpoint, { id: subId, name: newName }, {
                    headers: { Authorization: `Bearer ${storedToken}` }
                });
    
                console.log("서브 카테고리 수정 성공:", response.data);
            }
        } catch (error) {
            console.error(`${isAssetPage ? "서브 자산" : "서브 카테고리"} 수정 실패:`, error);
    
            if (error.response) {
                console.error("서버 응답 코드:", error.response.status);
                console.error("서버 응답 데이터:", error.response.data);
            }
        }
    };

    // 서브 삭제 (카테고리 & 자산 분리)
    const removeSubCategory = async (subId) => {
        try {
            const endpoint = isAssetPage ? "/api/mypage/asset/sub" : "/api/mypage/category/sub";
            const params = isAssetPage ? { subId } : { subId };

            console.log("서브 삭제 요청 params:", params);

            const response = await axiosInstance.delete(endpoint, {
                headers: { Authorization: `Bearer ${storedToken}` },
                params
            });

            if (response.data.isSuccess) {
                setButtons(prev => prev.filter(sub => sub.id !== subId));
            } else {
                console.error("서브 삭제 실패:", response.data.message);
            }
        } catch (error) {
            console.error("서브 삭제 요청 실패:", error);
        }
    };

    return (
        <Container>
            <TitleWrapper>
                {isEditingTitle ? (
                    <EditableInput
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={() => { setIsEditingTitle(false); updateCategoryName(); }}
                        autoFocus
                    />
                ) : (
                    <Title onClick={() => setIsEditingTitle(true)}>{editedTitle}</Title>
                )}
                <CloseIcon src={deleteCate} alt="close icon" onClick={onRemove} />
            </TitleWrapper>
            <ButtonWrapper>
                {buttons.map((sub, index) => (
                    <ButtonBox key={sub.id}>
                        {editingIndex === index ? (
                            <EditableInput
                                value={sub.name}
                                onChange={(e) =>
                                    setButtons(prev =>
                                        prev.map((s, i) => (i === index ? { ...s, name: e.target.value } : s))
                                    )
                                }
                                onBlur={() => {
                                    setEditingIndex(null);
                                    updateSubCategory(sub.id, sub.name);
                                }}
                                autoFocus
                            />
                        ) : (
                            <CateButton
                                label={sub.name}
                                onClick={() => setEditingIndex(index)}
                                onClose={() => removeSubCategory(sub.id)}
                            />
                        )}
                    </ButtonBox>
                ))}
                <ButtonBox>
                    <PlusButton onClick={addSubCategory} />
                </ButtonBox>
            </ButtonWrapper>
        </Container>
    );
};

export default CateContainer;



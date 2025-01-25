import React from "react";
import * as S from "../../../../styles/Finance/HandWrite/style.js";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";

const categoryData = [
    { main: "식비", sub: ["식당", "카페", "배달 음식"] },
    { main: "교통비", sub: ["버스", "지하철", "택시"] },
    { main: "쇼핑", sub: ["의류", "전자기기", "생활용품"] },
];

const CategoryModal = () => {
    const { formData, setFormField, modals } = useHandWrite();
    if (!modals.categoryModal.isOpen) return null;

    return (
        <S.ModalOverlay onClick={modals.categoryModal.closeModal}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                {categoryData.map((mainCategory) => (
                    <S.CategoryContainer key={mainCategory.main}>
                        <S.MainCategory>{mainCategory.main}</S.MainCategory>
                        <S.SubCategoryContainer>
                            {mainCategory.sub.map((subCategory) => (
                                <S.SubCategoryButton
                                    key={subCategory}
                                    onClick={() => setFormField("subName", subCategory)}
                                    $selected={formData.subName === subCategory}
                                >
                                    {subCategory}
                                </S.SubCategoryButton>
                            ))}
                        </S.SubCategoryContainer>
                    </S.CategoryContainer>
                ))}
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default CategoryModal;
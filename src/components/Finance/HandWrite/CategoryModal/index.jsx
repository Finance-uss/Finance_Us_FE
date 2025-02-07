import React, { useEffect } from "react";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";
import useApi from "../../../../hooks/useApi.js";
import * as S from "../../../../styles/Finance/HandWrite/style.js";

const CategoryModal = ({type}) => {
    const { formData, setFormField, modals } = useHandWrite();

    const { data, loading, error, request } = useApi();

    useEffect(() => {
        if(modals.categoryModal.isOpen) {
            request({ 
                method: "GET", 
                url: "/api/mypage/category",
                params: { type },
            });
        }
    }, [modals.categoryModal.isOpen, request]);

    if (!modals.categoryModal.isOpen) return null;

    return (
        <S.ModalOverlay onClick={modals.categoryModal.closeModal}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.ModalLine onClick={modals.categoryModal.closeModal}/>
                {data && data.result.map((mainCategory) => (
                    <S.CategoryContainer key={mainCategory.id}>
                        <S.MainCategory>{mainCategory.name}</S.MainCategory>
                        <S.SubCategoryContainer>
                            {mainCategory.subCategories.map((subCategory) => (
                                <S.SubCategoryButton
                                    key={subCategory.id}
                                    onClick={() => setFormField("subName", subCategory.name)}
                                    $selected={formData.subName === subCategory.name}
                                >
                                    {subCategory.name}
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
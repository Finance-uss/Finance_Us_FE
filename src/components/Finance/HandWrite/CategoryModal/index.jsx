import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";
import useApi from "../../../../hooks/useApi.js";
import * as S from "../../../../styles/Finance/HandWrite/style.js";

const CategoryModal = ({type}) => {
    const parentRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState({ top: 0 });
    const { formData, setFormField, modals } = useHandWrite();
    const { data, request } = useApi();

    useEffect(() => {
        if(modals.categoryModal.isOpen) {
            request({ 
                method: "GET", 
                url: "/api/mypage/category",
                params: { type: type },
            });
        }
    }, [modals.categoryModal.isOpen, request]);

    useLayoutEffect(() => {
        if(parentRef.current && data) {
            const rect = parentRef.current.getBoundingClientRect();
            setOffset({ top: rect.top });
            setIsLoading(false);            
        }
    }, [modals.categoryModal.isOpen, data]);

    useEffect(() => {
        if(!isLoading) {
            console.log("isLoading: false");
        }
    }, [isLoading, offset]);

    useEffect(() => {
        if (!modals.categoryModal.isOpen) {
            setIsLoading(true);
            setOffset({ top: 0 });
        }
    }, [modals.categoryModal.isOpen]);

    if (!modals.categoryModal.isOpen) return null;
    
    return (
        <S.ModalOverlay onClick={modals.categoryModal.closeModal}>
            <S.ContentWrapper ref={parentRef}>
                <S.ModalContent onClick={(e) => e.stopPropagation()} >
                    {!isLoading && offset.top != 0 && <S.Blank1 $top={offset.top}/>}
                    <S.Blank2/>
                    <S.ModalLine onClick={modals.categoryModal.closeModal} $top={offset.top}/>
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
            </S.ContentWrapper>
            
        </S.ModalOverlay>
    );
};

export default CategoryModal;
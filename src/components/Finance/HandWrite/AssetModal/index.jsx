import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";
import useApi from "../../../../hooks/useApi.js";
import * as S from "../../../../styles/Finance/HandWrite/style.js";

const AssetModal = () => {
    const parentRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState({ top: 0 });
    const { formData, setFormField, modals } = useHandWrite();
    const { data, request } = useApi();

    useEffect(() => {
        if(modals.assetModal.isOpen) {
            request({ 
                method: "GET", 
                url: "/api/mypage/asset",
            });
        }
    }, [modals.assetModal.isOpen, request]);

    useLayoutEffect(() => {
        if(parentRef.current && data) {
            const rect = parentRef.current.getBoundingClientRect();
            setOffset({ top: rect.top });    
            setIsLoading(false);
        }
    }, [modals.assetModal.isOpen, data]);

    useEffect(() => {
        if(!isLoading) {
            console.log("isLoading: false");
        }
    }, [isLoading, offset]);

    useEffect(() => {
        if (!modals.assetModal.isOpen) {
            setIsLoading(true);
            setOffset({ top: 0 });
        }
    }, [modals.assetModal.isOpen]);

    if (!modals.assetModal.isOpen) return null;
    
    return (
        <S.ModalOverlay onClick={modals.assetModal.closeModal}>
            <S.ContentWrapper>
                <S.ModalContent onClick={(e) => e.stopPropagation()} ref={parentRef}>
                    {!isLoading && offset.top != 0 && <S.Blank1 $top={offset.top}/>}
                    <S.Blank2/>
                    <S.ModalLine onClick={modals.assetModal.closeModal} $top={offset.top}/>
                    {data && data.result.map((mainAsset) => (
                        <S.CategoryContainer key={mainAsset.id}>
                            <S.MainCategory>{mainAsset.name}</S.MainCategory>
                            <S.SubCategoryContainer>
                                {mainAsset.subAssets.map((subAsset) => (
                                    <S.SubCategoryButton
                                        key={subAsset.id}
                                        onClick={() => setFormField("subAssetName", subAsset.name)}
                                        $selected={formData.subAssetName === subAsset.name}
                                    >
                                        {subAsset.name}
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

export default AssetModal;

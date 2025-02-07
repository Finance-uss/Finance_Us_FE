import React, { useEffect } from "react";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";
import useApi from "../../../../hooks/useApi.js";
import * as S from "../../../../styles/Finance/HandWrite/style.js";


const assetData = [
    { main: "체크카드", sub: ["국민카드", "삼성카드", "우리카드"] },
    { main: "현금", sub: ["지갑", "은행", "세이프박스"] },
    { main: "대분류", sub: ["적금", "투자", "기타"] },
];

const AssetModal = () => {
    const { formData, setFormField, modals } = useHandWrite();

    const { data, loading, error, request } = useApi();

    useEffect(() => {
        if(modals.assetModal.isOpen) {
            request({ 
                method: "GET", 
                url: "/api/mypage/asset",
            });
        }
    }, [modals.assetModal.isOpen, request]);

    if (!modals.assetModal.isOpen) return null;

    return (
        <S.ModalOverlay onClick={modals.assetModal.closeModal}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.ModalLine onClick={modals.assetModal.closeModal}/>
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
        </S.ModalOverlay>
    );
};

export default AssetModal;

import React from "react";
import * as S from "../../../../styles/Finance/HandWrite/style.js";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";

const assetData = [
    { main: "체크카드", sub: ["국민카드", "삼성카드", "우리카드"] },
    { main: "현금", sub: ["지갑", "은행", "세이프박스"] },
    { main: "대분류", sub: ["적금", "투자", "기타"] },
];

const AssetModal = () => {
    const { formData, setFormField, modals } = useHandWrite();
    if (!modals.assetModal.isOpen) return null;

    return (
        <S.ModalOverlay onClick={modals.assetModal.closeModal}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                {assetData.map((mainAsset) => (
                    <S.CategoryContainer key={mainAsset.main}>
                        <S.MainCategory>{mainAsset.main}</S.MainCategory>
                        <S.SubCategoryContainer>
                            {mainAsset.sub.map((subAsset) => (
                                <S.SubCategoryButton
                                    key={subAsset}
                                    onClick={() => setFormField("subAssetName", subAsset)}
                                    $selected={formData.subAssetName === subAsset}
                                >
                                    {subAsset}
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

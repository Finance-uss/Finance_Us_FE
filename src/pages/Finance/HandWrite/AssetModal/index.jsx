import React from 'react';
import * as S from '../../../../styles/Finance/HandWrite/style';
import line from '../../../../assets/icons/finance/line.svg';

const assetData = [
    { main: "체크카드", sub: ["국민카드", "삼성카드", "우리카드"] },
    { main: "현금", sub: ["지갑", "은행", "세이프박스"] },
    { main: "대분류", sub: ["적금", "투자", "기타"] },
];

const AssetModal = ({ isOpen, onClose, asset, setAsset }) => {
    if (!isOpen) return null;

    return (
        <S.ModalOverlay>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.ModalLine src={line} alt="닫기 버튼" onClick={onClose} />
                {assetData.map((mainAsset) => (
                    <S.CategoryContainer key={mainAsset.main}>
                        <S.MainCategory>{mainAsset.main}</S.MainCategory>
                        <S.SubCategoryContainer>
                            {mainAsset.sub.map((subAsset) => (
                                <S.SubCategoryButton key={subAsset} onClick={() => setAsset(subAsset) } $selected={asset === subAsset}>
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

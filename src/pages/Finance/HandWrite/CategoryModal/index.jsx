import React from 'react';
import * as S from '../../../../styles/Finance/HandWrite/style';
import line from '../../../../assets/icons/finance/line.svg';

const categoryData = [
    { main: "식비", sub: ["식당", "카페", "배달 음식"] },
    { main: "교통비", sub: ["버스", "지하철", "택시"] },
    { main: "쇼핑", sub: ["의류", "전자기기", "생활용품"] },
];

const CategoryModal = ({ isOpen, onClose, category, setCategory }) => {
    if (!isOpen) return null;

    return (
        <S.ModalOverlay>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.ModalLine src={line} alt="닫기 버튼" onClick={onClose} />
                {categoryData.map((mainCategory) => (
                    <S.CategoryContainer key={mainCategory.main}>
                        <S.MainCategory>{mainCategory.main}</S.MainCategory>
                        <S.SubCategoryContainer>
                            {mainCategory.sub.map((subCategory) => (
                                <S.SubCategoryButton key={subCategory} onClick={() => setCategory(subCategory)} $selected={category === subCategory}>
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
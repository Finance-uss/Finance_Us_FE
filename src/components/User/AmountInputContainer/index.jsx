import React, { useState } from 'react';
import { Wrapper, CategoryLabelWrapper, EditableText, EditableInput, RemoveButton, AmountInputWrapper } from '../../../styles/User/AmountInputContainer/style';
import AmountInput from '../AmountInput/index';
import closeIcon from '../../../assets/icons/common/User/DeleteCate.svg';

const AmountInputContainer = ({ category, value, onChange, onRemove }) => {
    const [mainCategory, subCategory] = category.split('/');
    const [isEditingMain, setIsEditingMain] = useState(false);
    const [isEditingSub, setIsEditingSub] = useState(false);
    const [editedMainCategory, setEditedMainCategory] = useState(mainCategory);
    const [editedSubCategory, setEditedSubCategory] = useState(subCategory);

    // 대분류 수정 완료
    const handleMainCategoryBlur = () => {
        setIsEditingMain(false);
    };

    // 소분류 수정 완료
    const handleSubCategoryBlur = () => {
        setIsEditingSub(false);
    };

    // 엔터키로 수정 완료
    const handleKeyDown = (e, isMain) => {
        if (e.key === 'Enter') {
            if (isMain) {
                setIsEditingMain(false);
            } else {
                setIsEditingSub(false);
            }
        }
    };

    return (
        <Wrapper>
            <CategoryLabelWrapper>
                <div>
                    {isEditingMain ? (
                        <EditableInput
                            type="text"
                            value={editedMainCategory}
                            isMainCategory={true}
                            onChange={(e) => setEditedMainCategory(e.target.value)}
                            onBlur={handleMainCategoryBlur}
                            onKeyDown={(e) => handleKeyDown(e, true)}
                            autoFocus
                        />
                    ) : (
                        <EditableText
                            isMainCategory={true}
                            onClick={() => setIsEditingMain(true)}
                        >
                            {editedMainCategory}
                        </EditableText>
                    )}
                    /
                    {isEditingSub ? (
                        <EditableInput
                            type="text"
                            value={editedSubCategory}
                            isMainCategory={false}
                            onChange={(e) => setEditedSubCategory(e.target.value)}
                            onBlur={handleSubCategoryBlur}
                            autoFocus
                        />
                    ) : (
                        <EditableText
                            isMainCategory={false}
                            onClick={() => setIsEditingSub(true)}
                        >
                            {editedSubCategory}
                        </EditableText>
                    )}
                </div>
                <RemoveButton onClick={onRemove}>
                    <img src={closeIcon} alt="삭제" />
                </RemoveButton>
            </CategoryLabelWrapper>
            <AmountInputWrapper>
                <AmountInput
                    value={value}
                    onChange={onChange}
                />
            </AmountInputWrapper>
        </Wrapper>
      );
    };

export default AmountInputContainer;



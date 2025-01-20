import React, { useState } from 'react';
import { Container, Title, ButtonWrapper, ButtonBox, TitleWrapper, CloseIcon, EditableInput } from '../../../styles/User/CateContainer/style';
import CateButton from '../../../components/common/CateButton/index';
import PlusButton from '../../../components/common/PlusButton'
import deleteCate from '../../../assets/icons/common/User/DeleteCate.svg';

const CateContainer = ({ id, title, subcategories, onRemove }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false); // 대분류 제목 수정 상태
    const [editedTitle, setEditedTitle] = useState(title); // 수정된 제목
    const [buttons, setButtons] = useState(subcategories); // 소분류 목록
    const [editingIndex, setEditingIndex] = useState(null); // 소분류 수정 상태

    // 대분류 제목 수정 완료
    const handleTitleEdit = (e) => {
        if (e.key === 'Enter') {
            setIsEditingTitle(false);
        }
    };

    // 소분류 이름 수정 완료
    const handleSubcategoryEdit = (index, newName) => {
        setButtons(buttons.map((btn, i) => (i === index ? newName : btn))); // 수정된 소분류 이름 반영
        setEditingIndex(null);
    };

    return (
        <Container>
            <TitleWrapper>
                {/* 대분류 제목 */}
                {isEditingTitle ? (
                    <EditableInput
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)} // 제목 수정
                        onKeyDown={handleTitleEdit} // Enter 누르면 완료
                        autoFocus
                    />
                ) : (
                    <Title onClick={() => setIsEditingTitle(true)}>{editedTitle}</Title> // 클릭하면 수정 모드
                )}
                <CloseIcon
                    src={deleteCate}
                    alt="close icon"
                    onClick={() => onRemove(id)} // 대분류 삭제
                />
            </TitleWrapper>
            <ButtonWrapper>
                {buttons.map((label, index) => (
                    <ButtonBox key={index}>
                        {editingIndex === index ? (
                            <EditableInput
                                value={label}
                                onChange={(e) =>
                                    setButtons(
                                        buttons.map((btn, i) =>
                                            i === index ? e.target.value : btn
                                        )
                                    )
                                } // 수정 중인 소분류 이름 변경
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubcategoryEdit(index, e.target.value); // Enter로 수정 완료
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <CateButton
                                label={label}
                                onClick={() => setEditingIndex(index)} // 클릭하면 수정 모드
                                onClose={() => setButtons(buttons.filter((_, i) => i !== index))} // 소분류 삭제
                            />
                        )}
                    </ButtonBox>
                ))}
                <ButtonBox>
                    <PlusButton onClick={() => setButtons([...buttons, `새 소분류 ${buttons.length + 1}`])} />
                </ButtonBox>
            </ButtonWrapper>
        </Container>
    );
};

export default CateContainer;



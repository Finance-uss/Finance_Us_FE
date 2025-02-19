import React, { useState } from 'react';
import { Wrapper, CategoryLabelWrapper, EditableText, EditableInput, RemoveButton, AmountInputWrapper } from '../../../styles/User/AmountInputContainer/style';
import AmountInput from '../AmountInput/index';
import closeIcon from '../../../assets/icons/common/User/DeleteCate.svg';

const AmountInputContainer = ({ mainName, name, value, onChange, onRemove }) => {
    return (
        <Wrapper>
            <CategoryLabelWrapper>
                <div>
                    <EditableText isMainCategory={true}>{mainName}</EditableText>
                    {name && ` / `}
                    {name && <EditableText isMainCategory={false}>{name}</EditableText>}
                </div>
                <RemoveButton onClick={onRemove}>
                    <img src={closeIcon} alt="삭제" />
                </RemoveButton>
            </CategoryLabelWrapper>
            <AmountInputWrapper>
                <AmountInput value={value} onChange={onChange} />
            </AmountInputWrapper>
        </Wrapper>
      );
    };

export default AmountInputContainer;



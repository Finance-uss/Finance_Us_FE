import React from 'react';
import { InputContainer, StyledInput, StyledButton } from '../../../styles/User/InputWithButton/style';


const InputWithButton = ({
    type = 'text', // 기본값은 'text'
    placeholder,
    buttonText,
    onButtonClick,
    value,
    onChange,
    isButtonActive = false,
}) => {
    return (
        <InputContainer>
            <StyledInput
                type={type} // 입력 타입
                placeholder={placeholder} // 플레이스홀더
                value={value}
                onChange={onChange}
            />
            <StyledButton
                onClick={onButtonClick}
                disabled={!isButtonActive} // 활성화 여부 설정
            >
                {buttonText}
            </StyledButton>
        </InputContainer>
    );
};

export default InputWithButton;
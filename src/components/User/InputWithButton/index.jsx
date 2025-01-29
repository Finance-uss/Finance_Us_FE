import React from 'react';
import { InputContainer, StyledInput, StyledButton, StyledInputWrapper } from '../../../styles/User/InputWithButton/style';


const InputWithButton = ({
    type = 'text', // 기본값은 'text'
    placeholder,
    buttonText,
    onButtonClick,
    value,
    onChange,
    isButtonActive = false,
    isError = false,
}) => {
    return (
        <InputContainer>
            <StyledInputWrapper isError={isError}>
                <StyledInput
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    isError={isError}
                />
                <StyledButton
                    onClick={onButtonClick}
                    disabled={!isButtonActive}
                >
                    {buttonText}
                </StyledButton>
            </StyledInputWrapper>
        </InputContainer>
    );
};

export default InputWithButton;
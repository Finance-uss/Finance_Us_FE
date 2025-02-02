import React from 'react';
import { InputContainer, StyledInputWrapper, StyledInput } from '../../../styles/User/SimpleInput/style';

const SimpleInput = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    isError = false, 
    errorMessage = '', 
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
            </StyledInputWrapper>
        </InputContainer>
    );
};

export default SimpleInput;
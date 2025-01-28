import React from 'react';
import { InputContainer, StyledInput } from '../../../styles/User/SimpleInput/style';

const SimpleInput = ({
    type = 'text', // 기본 타입은 'text'
    placeholder,
    value,
    onChange,
}) => {
    return (
        <InputContainer>
            <StyledInput
                type={type} // 입력 타입 동적 설정 (e.g., text, password, email)
                placeholder={placeholder} // 플레이스홀더
                value={value}
                onChange={onChange}
            />
        </InputContainer>
    );
};

export default SimpleInput;
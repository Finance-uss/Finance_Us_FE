import React from 'react';
import { 
    InputContainer, 
    StyledInputWrapper, 
    StyledInput, 
    StyledButton, 
    TimerText 
} from '../../../styles/User/AuthCodeInputWithTimer/style';

const AuthCodeInputWithTimer = ({
    value,
    onChange,
    onButtonClick,
    isError = false,
    timer = 0, // ⏳ 타이머
}) => {
    return (
        <InputContainer>
            <StyledInputWrapper isError={isError}>
                {timer > 0 && <TimerText>{formatTime(timer)}</TimerText>} {/* ⏳ 타이머 표시 */}
                <StyledInput
                    type="text"
                    placeholder="인증 코드 입력"
                    value={value}
                    onChange={onChange}
                    maxLength={6} // ✅ 6자리 입력 제한
                />
                <StyledButton
                    onClick={onButtonClick}
                    disabled={value.length !== 6} // ✅ 6자리 입력 시 활성화
                >
                    확인
                </StyledButton>
            </StyledInputWrapper>
        </InputContainer>
    );
};

export default AuthCodeInputWithTimer;

// ⏳ 타이머 형식 변환 함수 (mm:ss)
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

import React, { useState } from 'react';
import { 
    Container, 
    Title, 
    InputContainer, 
    Input, 
    PopupContainer, 
    Overlay, 
    ButtonContainer, 
    ButtonWrapper, 
    StyledButton 
} from '../../styles/NewPW/style'; 
import SubmitButton from '../../components/common/SubmitButton'; 
import { useNavigate } from 'react-router-dom'; 

const NewPW = () => {
    const navigate = useNavigate(); 
    const [newPassword, setNewPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [isPasswordValid, setIsPasswordValid] = useState(false); 
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false); 
    const [isPopupVisible, setIsPopupVisible] = useState(false); 

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,12}$/;
        const valid = passwordRegex.test(password);
        setIsPasswordValid(valid);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
      
        if (!newPassword || !isPasswordValid || newPassword !== confirmPassword) {
            return; 
        }

        setIsPopupVisible(true);
    };

    const handleBackToLogin = () => {
        navigate("/login"); 
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <Container>
            <Title>새로운 비밀번호 입력</Title>
            <InputContainer>
                <Input
                    type="text"
                    placeholder="새로운 비밀번호"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    onFocus={() => setIsPasswordInputFocused(true)}
                    onBlur={() => setIsPasswordInputFocused(false)}
                    required
                />
            </InputContainer>
            {isPasswordInputFocused && (
                <>
                    {newPassword && !isPasswordValid ? (
                        <p style={{ color: 'red' }}>
                            비밀번호는 영어 대/소문자, 숫자 중 2종류 이상을 조합한 8자~12자 이내여야 합니다.
                        </p>
                    ) : (
                        <p style={{ color: '#142755' }}>
                            영어 대/소문자, 숫자 중 2종류 이상을 조합하여 8자~12자로 구성해야 합니다.
                        </p>
                    )}
                </>
            )}
            <InputContainer>
                <Input
                    type="text"
                    placeholder="새로운 비밀번호 재입력"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
            </InputContainer>
            {confirmPassword && newPassword !== confirmPassword && (
                <p style={{ color: 'red' }}>
                    비밀번호가 일치하지 않습니다.
                </p>
            )}
            <ButtonWrapper>
                <SubmitButton 
                    text="비밀번호 변경하기" 
                    onClick={handleSubmit} 
                    disabled={!isPasswordValid || !newPassword || !confirmPassword} 
                    customOpacity={isPasswordValid && newPassword && confirmPassword ? 1 : 0.4}
                />
            </ButtonWrapper>

            {isPopupVisible && (
                <>
                    <Overlay onClick={closePopup} />
                    <PopupContainer>
                        <p>비밀번호 설정을 완료하였습니다.</p>
                        <ButtonContainer>
                            <StyledButton onClick={closePopup}>닫기</StyledButton>
                            <StyledButton onClick={handleBackToLogin}>로그인하기</StyledButton>
                        </ButtonContainer>
                    </PopupContainer>
                </>
            )}
        </Container>
    );
};

export default NewPW;

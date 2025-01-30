import React, { useState } from 'react';
import axios from 'axios';
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
import { useAuth } from '../../contexts/AuthContext';
import SubmitButton from '../../components/common/SubmitButton'; 
import { useNavigate } from 'react-router-dom'; 

const URL = import.meta.env.VITE_API_URL;

const NewPW = () => {
    const navigate = useNavigate(); 
    const { formData, setFormField } = useAuth();
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [isPasswordValid, setIsPasswordValid] = useState(false); 
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false); 
    const [isPopupVisible, setIsPopupVisible] = useState(false); 

    const handleNewPasswordChange = (e) => {
        setFormField("password", e.target.value);

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,12}$/;
        const valid = passwordRegex.test(e.target.value);
        setIsPasswordValid(valid);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.password || !isPasswordValid || formData.password !== confirmPassword) {
            return; 
        }

        try {
            const response = await axios.patch(`${URL}/api/user/resetPassword`, {
                Authrization: formData.email,
                password: formData.password
            });

            if(response.data.isSuccess) {
                setIsPopupVisible(true);        
            }
            else{
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }

        
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
                    value={formData.password}
                    onChange={handleNewPasswordChange}
                    onFocus={() => setIsPasswordInputFocused(true)}
                    onBlur={() => setIsPasswordInputFocused(false)}
                    required
                />
            </InputContainer>
            {isPasswordInputFocused && (
                <>
                    {formData.password && !isPasswordValid ? (
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
            {confirmPassword && formData.password !== confirmPassword && (
                <p style={{ color: 'red' }}>
                    비밀번호가 일치하지 않습니다.
                </p>
            )}
            <ButtonWrapper>
                <SubmitButton 
                    text="비밀번호 변경하기" 
                    onClick={handleSubmit} 
                    disabled={!isPasswordValid || !formData.password || !confirmPassword} 
                    customOpacity={isPasswordValid && formData.password && confirmPassword ? 1 : 0.4}
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

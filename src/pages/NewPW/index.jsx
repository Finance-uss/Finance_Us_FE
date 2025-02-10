import React, { useState } from "react";
import axios from "axios";
import { 
    Container, 
    Title, 
    InputContainer, 
    Input, 
    ButtonWrapper 
} from "../../styles/NewPW/style"; 
import { useAuth } from "../../contexts/AuthContext";
import SubmitButton from "../../components/common/SubmitButton"; 
import { useNavigate } from "react-router-dom";
import PasswordChangePopup from "../../components/PW"; 

const URL = import.meta.env.VITE_API_URL;

const NewPW = () => {
    const navigate = useNavigate(); 
    const { formData, setFormField } = useAuth();
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [isPasswordValid, setIsPasswordValid] = useState(false); 
    const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false); 
    const [isPopupVisible, setIsPopupVisible] = useState(false); 

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setFormField("password", password); 

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,12}$/;  
        const valid = passwordRegex.test(password); 
        setIsPasswordValid(valid);  
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 비밀번호 유효성 검사
        if (!formData.password || !isPasswordValid || formData.password !== confirmPassword) {
            console.log("비밀번호 유효성 검사 실패");
            return;
        }
    
        try {
            const response = await axios.patch(`${URL}/api/user/resetPassword`, {},
                {
                    params: {
                        email: formData.email, 
                        password: formData.password 
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                }
            );
    
            // 응답 처리
            console.log("비밀번호 변경 응답:", response.data);
            if (response.data.isSuccess) {
                console.log("메시지:", response.data.message);
                console.log("변경된 필드:", response.data.result.updatedField); 
                setIsPopupVisible(true); 
            } else {
                console.log(response.data.message); 
            }
        } catch (error) {
            console.error("비밀번호 변경 실패:", error.response ? error.response.data : error.message);
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
                <PasswordChangePopup onClose={closePopup} onLogin={handleBackToLogin} />
            )}
        </Container>
    );
};

export default NewPW;

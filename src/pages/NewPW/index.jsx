import React, { useState } from "react";
import axios from "axios";
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
} from "../../styles/NewPW/style"; 
import { useAuth } from "../../contexts/AuthContext";
import SubmitButton from "../../components/common/SubmitButton"; 
import { useNavigate } from "react-router-dom"; 

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
        setFormField("password", password);  // 폼 데이터 업데이트

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,12}$/;  // 비밀번호 유효성 검사
        const valid = passwordRegex.test(password);  // 유효성 검사
        setIsPasswordValid(valid);  // 유효성 상태 업데이트
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
    
        console.log("전송할 비밀번호:", formData.password); // 폼 데이터에서 비밀번호 확인
        console.log("Token:", formData.token); // 폼 데이터에서 토큰 확인
    
        try {
            // PATCH 요청에서 query 파라미터로 password를 전달
            const response = await axios.patch(
                `${URL}/api/user/resetPassword`, 
                {}, // 본문은 빈 객체로 보내기
                {
                    headers: {
                        'Content-Type': 'application/json',  // 요청의 Content-Type 헤더 설정
                        'Authorization': `Bearer ${formData.token}`  // Authorization 헤더에 토큰 추가
                    },
                    params: {
                        password: formData.password  // 비밀번호를 쿼리 파라미터로 전달
                    }
                }
            );
    
            console.log("비밀번호 변경 성공:", response.data);
            if (response.data.isSuccess) {
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

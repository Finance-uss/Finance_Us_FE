import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
    Container, 
    Title, 
    Form, 
    Input, 
    ButtonContainer, 
    Message 
} from '../../styles/SetPW/style'; 
import SubmitButton from '../../components/common/SubmitButton'; 
import { useNavigate } from 'react-router-dom'; 

const SetPW = () => {
    const navigate = useNavigate();
    const { formData, setFormField } = useAuth();
    const [passwordMessage, setPasswordMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isError, setIsError] = useState(false); 

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setFormField('password', password);
        
        // 비밀번호 유효성 검사
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,12}$/; 
        
        if (password.length > 0) {
            setPasswordMessage('비밀번호 제한사항: 영어 대/소문자, 숫자 중 2종류 이상을 조합하여 8자리~12자리로 구성해야 합니다.');
            setIsError(false); // 오류 상태 초기화
        }

        if (passwordRegex.test(password)) {
            setIsPasswordValid(true);
            setPasswordMessage(''); 
        } else {
            setIsPasswordValid(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 비밀번호 유효성 검사
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,12}$/;
        if (!passwordRegex.test(formData.password)) {
            setIsPasswordValid(false);
            setPasswordMessage('비밀번호는 영어 대/소문자, 숫자를 조합한 8자~12자 이내여야 합니다.');
            setIsError(true); 
            return; 
        }

        // 비밀번호를 formData에 저장하고 다음 페이지로 이동
        setFormField("password", formData.password); // 비밀번호를 formData에 저장
        console.log("저장된 비밀번호:", formData.password); // 확인용 로그
        navigate("/profileSetting"); // 프로필 입력 페이지로 이동
    };

    return (
        <Container>
            <Title>회원 가입</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    required
                />
                {passwordMessage && (
                    <Message 
                        style={{ color: isError ? 'red' : '#142755' }} 
                    >
                        {passwordMessage}
                    </Message>
                )}
                <ButtonContainer>
                    <SubmitButton 
                        text="프로필 입력하러 가기" 
                        onClick={handleSubmit} 
                        customOpacity={isPasswordValid ? 1 : 0.4} 
                    />
                </ButtonContainer>
            </Form>
        </Container>
    );
};

export default SetPW;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { 
    Container, 
    Title, 
    Form, 
    InputContainer, 
    Input, 
    VerifyButton, 
    ButtonContainer, 
    SubmitButtonStyled 
} from '../../styles/SignUp/style'; 
import SubmitButton from '../../components/common/SubmitButton'; 
import { useNavigate } from 'react-router-dom'; 

const URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
    const navigate = useNavigate(); 
    const { formData, setFormField } = useAuth();    
    const [authCode, setAuthCode] = useState(''); 
    const [isCodeValid, setIsCodeValid] = useState(false); 
    const [emailMessage, setEmailMessage] = useState(''); 
    const [authCodeMessage, setAuthCodeMessage] = useState('');
    const [timer, setTimer] = useState(0);
    const [isEmailValid, setIsEmailValid] = useState(false); 
    const [isResend, setIsResend] = useState(false); 

    const handleEmailChange = (e) => {
        setFormField('email', e.target.value);
        setEmailMessage(''); 
        setIsEmailValid(false); 
    };

    const handleAuthCodeChange = (e) => {
        setAuthCode(e.target.value); 
        setAuthCodeMessage(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isCodeValid) {
            console.log("이메일:", formData.email, "인증번호:", authCode);
        }
    };

    const handleNavigateToPassword = () => {
        if (isCodeValid) {
            navigate("/setpw"); 
        }
    };

    const validateAuthCode =  async () => {
        try {
            console.log("email: " + formData.email + " authcode: " + authCode);

            const response = await axios.get(`${URL}/api/auth/numberCheck`, { 
                params: {
                    email: formData.email, 
                    number: authCode
                }
            });

            if (response.data.isSuccess) {
                setIsCodeValid(true);
                setAuthCodeMessage('');
            } else {
                setIsCodeValid(false);
                setAuthCodeMessage('인증번호가 일치하지 않습니다.');
            }
        }
        catch (error) {
            console.error('인증번호 확인 에러:', error);
            setAuthCodeMessage('서버 에러가 발생했습니다. 나중에 다시 시도해주세요.');
            setIsCodeValid(false);
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleVerifyEmail = async () => {
        if (isValidEmail(formData.email)) {
            try {
                console.log('이메일 인증 요청:', formData.email);
                const response = await axios.post(`${URL}/api/auth/mailSend`, formData.email, { headers: { 'Content-Type': 'text/plain' } }); // 요청 보낼 경로와 데이터
                if (response.data.isSuccess) {
                    setEmailMessage("이메일이 전송되었습니다. 이메일을 확인해주세요.");
                    setIsEmailValid(true);
                    setTimer(180); 
                    setIsResend(true);
                } else {
                    setEmailMessage(response.data.message);
                    setIsEmailValid(false);
                }
            } catch (error) {
                console.error('이메일 인증 요청 에러:', error);
                setEmailMessage("서버 에러가 발생했습니다. 나중에 다시 시도해주세요.");
                setIsEmailValid(false);
            }
        } else {
            setEmailMessage("올바르지 않은 이메일 형식입니다.");
            setIsEmailValid(false); 
        }
    };

    // 타이머 관리
    useEffect(() => {
        let countdown;
        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(countdown);
        }
        return () => clearInterval(countdown);
    }, [timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <Container>
            <Title>회원 가입</Title>
            <Form onSubmit={handleSubmit}>
                <InputContainer>
                    <Input
                        type="email"
                        placeholder="이메일 주소"
                        value={formData.email}
                        onChange={handleEmailChange}
                        required
                        style={{
                            borderBottom: '1px solid #ccc', 
                            boxShadow: 'none',
                        }}
                    />
                    <VerifyButton 
                        type="button" 
                        onClick={handleVerifyEmail}
                        style={{ 
                            backgroundColor: isValidEmail(formData.email) ? '#142755' : '#cccccc', 
                            cursor: isValidEmail(formData.email) ? 'pointer' : 'not-allowed'
                        }}
                    >
                        {isResend ? '재전송' : '인증'}
                    </VerifyButton>
                </InputContainer>
                {emailMessage && (
                    <p style={{ 
                        color: isEmailValid ? '#142755' : 'red' , marginTop: '0px', fontSize: '14px'
                    }}>
                        {emailMessage}
                    </p>
                )} 
                <InputContainer>
                    <Input
                        type="text"
                        placeholder="인증번호"
                        value={authCode}
                        onChange={handleAuthCodeChange}
                        onBlur={validateAuthCode} 
                        required
                        style={{
                            borderBottom: '1px solid #ccc', 
                            boxShadow: 'none',
                        }}
                    />
                    {timer > 0 && (
                        <span style={{ 
                            fontSize: '16px', 
                            color: '#B4B4B4', 
                            marginLeft: '8px' 
                        }}>
                            {formatTime(timer)}
                        </span>
                    )}
                </InputContainer>
                {authCodeMessage && (
                    <p style={{ 
                        color: 'red', marginTop: '0px', fontSize: '14px'}}>
                        {authCodeMessage}
                    </p>
                )}
                <ButtonContainer>
                    <SubmitButtonStyled 
                        as={SubmitButton}
                        text="비밀번호 입력하러 가기" 
                        onClick={handleNavigateToPassword} 
                        disabled={!isCodeValid} 
                        customOpacity={isCodeValid ? 1 : 0.4}
                    />
                </ButtonContainer>
            </Form>
        </Container>
    );
};

export default SignUp;

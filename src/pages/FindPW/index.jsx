import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Title, InputContainer, Input, VerifyButton, ButtonContainer, ErrorMessage } from "../../styles/FindPW/style"; // ErrorMessage 추가
import SubmitButton from '../../components/common/SubmitButton'; 
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const URL = import.meta.env.VITE_API_URL; 

const FindPW = () => {
    const navigate = useNavigate(); 
    const { formData, setFormField } = useAuth();
    const [authCode, setAuthCode] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [authCodeMessage, setAuthCodeMessage] = useState('');
    const [timer, setTimer] = useState(0); 
    const [isResend, setIsResend] = useState(false); 

    useEffect(() => {
        setFormField("email", ""); 
    }, []);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        setFormField('email', e.target.value);
        setEmailMessage(''); 
    };

    const handleAuthCodeChange = (e) => {
        setAuthCode(e.target.value);
        setAuthCodeMessage(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (timer === 0) {
            setAuthCodeMessage('타이머가 만료되었습니다. 재전송 버튼을 눌러주세요.');
        } else if (authCode && timer > 0) {
            validateAuthCode(authCode);
        }
    };

    const validateAuthCode = async () => {
        try {
            const response = await axios.get(`${URL}/api/auth/numberCheck`, {
                params: {
                    email: formData.email,
                    number: authCode
                }
            });
            if (response.data.isSuccess) {
                setAuthCodeMessage(''); 
                setFormField('token', response.data.token); 
                navigate("/newPw"); 
            } else {
                setAuthCodeMessage('인증번호가 일치하지 않습니다.');
            }
        } catch (error) {
            setAuthCodeMessage('서버 에러가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };

    const handleVerifyEmail = async () => {
        if (isValidEmail(formData.email)) {
            try {
                const responese = await axios.post(`${URL}/api/auth/mailSend`, formData.email, { 
                    headers: { 'Content-Type': 'text/plain' } 
                });

                if (responese.data.isSuccess) {
                    setEmailMessage("이메일이 전송되었습니다. 이메일을 확인해주세요.");
                    setTimer(180); 
                    setIsResend(true); 
                    setFormField('Authorization', ''); 
                    setAuthCodeMessage(''); 
                } else {
                    setEmailMessage("존재하지 않는 계정입니다.");
                }
            } catch (error) {
                setEmailMessage('서버 에러가 발생했습니다. 나중에 다시 시도해주세요.');
            }
        }
    };

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
            <Title>비밀번호 찾기</Title>
            <InputContainer>
                <Input
                    type="email"
                    placeholder="이메일 주소"
                    value={formData.email}
                    onChange={handleEmailChange}
                    required
                />
                <VerifyButton 
                    type="button" 
                    onClick={handleVerifyEmail}
                    style={{ 
                        backgroundColor: isValidEmail(formData.email) ? '#142755' : '#cccccc', 
                        cursor: isValidEmail(formData.email) ? 'pointer' : 'not-allowed',
                        opacity: formData.email ? 1 : 0.4 
                    }}
                >
                    {isResend ? '재전송' : '인증'}
                </VerifyButton>
            </InputContainer>
            {emailMessage && (
                <ErrorMessage style={{ 
                    color: emailMessage.includes("이메일이 전송") ? '#142755' : 'red'
                }}>
                    {emailMessage}
                </ErrorMessage>
            )}
            <InputContainer>
                <Input
                    type="text"
                    placeholder="인증번호"
                    value={authCode}
                    onChange={handleAuthCodeChange}
                    required
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
                <ErrorMessage>
                    {authCodeMessage}
                </ErrorMessage>
            )}
            <ButtonContainer>
                <SubmitButton 
                    text="다음" 
                    onClick={handleSubmit} 
                    disabled={!authCode || timer === 0 || authCodeMessage} 
                    customOpacity={authCode && timer > 0 ? 1 : 0.4}
                />
            </ButtonContainer>
        </Container>
    );
};

export default FindPW;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Container, 
    Title, 
    InputContainer, 
    Input, 
    VerifyButton,
    ButtonContainer 
} from '../../styles/FindPW/style'; // 스타일 파일 경로를 확인하세요.
import SubmitButton from '../../components/common/SubmitButton'; 
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const URL = import.meta.env.VITE_API_URL; 

const FindPW = () => {
    const navigate = useNavigate(); 
    const { formData, setFormField } = useAuth();
    const [authCode, setAuthCode] = useState('');
    const [emailMessage, setEmailMessage] = useState(''); // 이메일 전송 메시지 상태
    const [authCodeMessage, setAuthCodeMessage] = useState(''); // 인증번호 불일치 메시지 상태
    const [timer, setTimer] = useState(0); // 타이머 상태
    const [isResend, setIsResend] = useState(false); // 인증 버튼 상태

    useEffect(() => {
        setFormField("email", ""); // 이메일 값을 초기화
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
            setAuthCodeMessage('타이머가 만료되었습니다. 재전송 버튼을 눌러주세요.'); // 타이머가 만료된 경우 메시지 표시
        } else if (authCode && timer > 0) { // 타이머가 0이 아닐 때만 다음으로 이동
            console.log("이메일:", formData.email, "인증번호:", authCode);
            validateAuthCode(authCode); // 인증번호 검증   
        }
    };

    const validateAuthCode = async() => {
        try {
            // 인증번호 검증 API 호출
            const response = await axios.get(`${URL}/api/auth/numberCheck`, {
                params: {
                    email: formData.email,
                    number: authCode
                }
            });
            console.log(response.data);

            if(response.data.isSuccess) {
                setAuthCodeMessage(''); 
                navigate("/newPw"); // 비밀번호 입력 페이지로 이동
            } else {
                setAuthCodeMessage('인증번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('인증번호 확인 에러:', error);
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
                    setIsResend(true); // 인증 버튼을 재전송으로 변경
                    setFormField('Authorization', ''); // 이메일 재전송 시 인증코드 초기화
                    setAuthCodeMessage(''); // 인증 메시지 초기화
                } else {
                    setEmailMessage("존재하지 않는 계정입니다.");
                }
            } catch (error) {
                setEmailMessage('서버 에러가 발생했습니다. 나중에 다시 시도해주세요.');
            }
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
                        opacity: formData.email ? 1 : 0.4 // 이메일 입력 시 투명도 변경
                    }}
                >
                    {isResend ? '재전송' : '인증'}
                </VerifyButton>
            </InputContainer>
            {emailMessage && (
                <p style={{ 
                    color: emailMessage.includes("이메일이 전송") ? '#142755' : 'red'
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
                <p style={{ 
                    color: 'red'
                }}>
                    {authCodeMessage}
                </p>
            )}
            <ButtonContainer>
                <SubmitButton 
                    text="다음" 
                    onClick={handleSubmit} 
                    disabled={!authCode || timer === 0 || authCodeMessage} // 인증번호가 없거나, 타이머가 0이거나, 인증번호가 틀리면 비활성화
                    customOpacity={authCode && timer > 0 ? 1 : 0.4}
                />
            </ButtonContainer>
        </Container>
    );
};

export default FindPW;

import React, { useState, useEffect } from 'react';
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

const SignUp = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState(''); 
    const [authCode, setAuthCode] = useState(''); 
    const [isCodeValid, setIsCodeValid] = useState(false); // 인증번호 유효성 상태
    const [emailMessage, setEmailMessage] = useState(''); // 이메일 전송 메시지 상태
    const [authCodeMessage, setAuthCodeMessage] = useState(''); // 인증번호 불일치 메시지 상태
    const [timer, setTimer] = useState(0); // 타이머 상태
    const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태
    const [isResend, setIsResend] = useState(false); // 인증 버튼 상태

    const handleEmailChange = (e) => {
        setEmail(e.target.value); 
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
            console.log("이메일:", email, "인증번호:", authCode);
        }
    };

    const handleNavigateToPassword = () => {
        if (isCodeValid) {
            navigate("/setpw"); 
        }
    };

    const validateAuthCode = () => {
        if (authCode === "1234") {
            setIsCodeValid(true); 
            setAuthCodeMessage(''); 
        } else {
            setIsCodeValid(false); 
            setAuthCodeMessage('인증번호가 일치하지 않습니다.');
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleVerifyEmail = () => {
        if (isValidEmail(email)) {
            setEmailMessage("이메일이 전송되었습니다. 이메일을 확인해주세요.");
            setIsEmailValid(true); 
            setTimer(180); 
            setIsResend(true);
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
                        value={email}
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
                            backgroundColor: isValidEmail(email) ? '#142755' : '#cccccc', 
                            cursor: isValidEmail(email) ? 'pointer' : 'not-allowed'
                        }}
                    >
                        {isResend ? '재전송' : '인증'}
                    </VerifyButton>
                </InputContainer>
                {emailMessage && (
                    <p style={{ 
                        color: isEmailValid ? '#142755' : 'red', 
                        marginTop: '8px', 
                        fontSize: '14px', 
                        fontStyle: 'normal', 
                        fontWeight: 400, 
                        lineHeight: '100%' 
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
                        color: 'red', 
                        marginTop: '8px', 
                        fontSize: '14px', 
                        fontStyle: 'normal', 
                        fontWeight: 400, 
                        lineHeight: '100%' 
                    }}>
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

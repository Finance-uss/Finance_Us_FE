import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Title, 
    InputContainer, 
    Input, 
    VerifyButton,
    ButtonContainer 
} from '../../styles/FindPW/style'; // 스타일 파일 경로를 확인하세요.
import SubmitButton from '../../components/common/SubmitButton'; 
import { useNavigate } from 'react-router-dom'; 

const FindPW = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState(''); 
    const [authCode, setAuthCode] = useState(''); 
    const [isCodeValid, setIsCodeValid] = useState(false); // 인증번호 유효성 상태
    const [emailMessage, setEmailMessage] = useState(''); // 이메일 전송 메시지 상태
    const [authCodeMessage, setAuthCodeMessage] = useState(''); // 인증번호 불일치 메시지 상태
    const [timer, setTimer] = useState(0); // 타이머 상태
    const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태
    const [isResend, setIsResend] = useState(false); // 인증 버튼 상태
    const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 여부

    const handleEmailChange = (e) => {
        setEmail(e.target.value); 
        setEmailMessage(''); 
        setIsEmailValid(false); 
    };

    const handleAuthCodeChange = (e) => {
        const code = e.target.value;
        setAuthCode(code); 
        setAuthCodeMessage(''); 
        // 인증번호가 입력될 때 유효성 검사
        if (code) {
            setIsCodeValid(true);
        } else {
            setIsCodeValid(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (timer === 0 && emailVerified) {
            setAuthCodeMessage('타이머가 만료되었습니다. 재전송 버튼을 눌러주세요.'); // 타이머가 만료된 경우 메시지 표시
        } else if (isCodeValid && timer > 0) { // 타이머가 0이 아닐 때만 다음으로 이동
            console.log("이메일:", email, "인증번호:", authCode);
            navigate("/newPw"); // 비밀번호 입력 페이지로 이동
        }
    };

    const validateAuthCode = () => {
        // 인증번호 검증 로직 (예시)
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
            // 서버에서 이메일 존재 여부를 확인하는 로직 필요
            const existingEmails = ["user@example.com"]; // 예시: 존재하는 이메일 리스트
            if (existingEmails.includes(email)) {
                setEmailMessage("이메일이 전송되었습니다. 이메일을 확인해주세요.");
                setIsEmailValid(true); 
                setTimer(180); 
                setIsResend(true); // 인증 버튼을 재전송으로 변경
                setAuthCode(''); // 이메일 재전송 시 인증코드 초기화
                setAuthCodeMessage(''); // 인증 메시지 초기화
                setIsCodeValid(false); // 인증 코드 초기화
                setEmailVerified(true); // 이메일 인증 완료
            } else {
                setEmailMessage("존재하지 않는 계정입니다.");
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
            setIsCodeValid(false); // 타이머가 끝나면 인증번호 유효성 초기화
            setEmailVerified(false); // 이메일 인증 상태 초기화
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
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <VerifyButton 
                    type="button" 
                    onClick={handleVerifyEmail}
                    style={{ 
                        backgroundColor: isValidEmail(email) ? '#142755' : '#cccccc', 
                        cursor: isValidEmail(email) ? 'pointer' : 'not-allowed',
                        opacity: email ? 1 : 0.4 // 이메일 입력 시 투명도 변경
                    }}
                >
                    {isResend ? '재전송' : '인증'}
                </VerifyButton>
            </InputContainer>
            {emailMessage && (
                <p style={{ 
                    color: isEmailValid ? '#142755' : 'red'
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
                    disabled={!isCodeValid || timer === 0} // 타이머가 0일 때 비활성화
                    customOpacity={isCodeValid && timer > 0 ? 1 : 0.4}
                />
            </ButtonContainer>
        </Container>
    );
};

export default FindPW;

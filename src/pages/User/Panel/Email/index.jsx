import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader';
import InputWithButton from '../../../../components/User/InputWithButton';
import SimpleInput from '../../../../components/User/SimpleInput';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';

const ChangeEmailPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [message, setMessage] = useState('');

    // 이메일 형식 유효성 검사
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // 이메일 입력 핸들러
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(validateEmail(value)); // 이메일 형식 검사
    };

    // 인증 버튼 클릭 핸들러
    const handleEmailVerification = () => {
        setIsEmailSent(true);
        setMessage('이메일이 전송되었습니다. 이메일을 확인해주세요.');
        setCountdown(180); // 3분 타이머 시작
    };

    // 3분 타이머 설정
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // 완료 버튼 클릭 핸들러
    const handleSave = () => {
        console.log('이메일 변경 완료');
        console.log('입력한 이메일:', email);
        console.log('입력한 비밀번호:', password);
        // 이메일 변경 API 호출 예정
    };

    // 뒤로 가기 버튼 클릭 핸들러
    const handleBackClick = () => {
        navigate('/user');
    };

    return (
        <Container>
            <BackHeader title="이메일 변경" onBackClick={handleBackClick} />
            <Form>
                <InputWithButton
                    type="email"
                    placeholder="새 이메일"
                    buttonText={isEmailSent ? '재전송' : '인증'}
                    onButtonClick={handleEmailVerification}
                    value={email}
                    onChange={handleEmailChange}
                    isButtonActive={isEmailValid} // 이메일 형식이 맞을 때 활성화
                />
                {message && <Message>{message}</Message>}

                <PasswordInputContainer>
                    <SimpleInput
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {countdown > 0 && <Timer>{formatTime(countdown)}</Timer>}
                </PasswordInputContainer>
            </Form>
            <CompleteButtonComponent label="이메일 변경 완료" onSave={handleSave} />
        </Container>
    );
};

export default ChangeEmailPage;

// ⏰ 타이머 형식 변환 함수 (mm:ss)
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

// 스타일 정의
const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    height: auto;
    padding: 0 20px 24px 20px; 
    gap: 20px;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const Message = styled.p`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: #142755;
    margin-top: 10px;
`;

const PasswordInputContainer = styled.div`
    position: relative;
`;

const Timer = styled.span`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    color: #666;
`;

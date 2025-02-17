import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../../../../api/axiosInstance';
import BackHeader from '../../../../components/User/BackHeader';
import InputWithButton from '../../../../components/User/InputWithButton';
import AuthCodeInputWithTimer from '../../../../components/User/AuthCodeInputWithTimer';
import CompleteButtonComponent from '../../../../components/User/CompleteButton';

const ChangeEmailPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState(''); // 인증 코드 상태 추가
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // 이메일 형식 유효성 검사
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // 이메일 입력 핸들러
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(validateEmail(value)); // 이메일 형식 검사
    };

    // 인증 코드 입력 핸들러 추가
    const handleAuthCodeChange = (e) => {
        setAuthCode(e.target.value);
    };

    // 이메일 인증 요청
    const handleEmailVerification = async () => {
        if (!isEmailValid) {
            setErrorMessage("올바른 이메일 형식을 입력해주세요.");
            return;
        }
    
        try {
            setLoading(true);
            const response = await axiosInstance.post('/api/auth/mailSend', email, {
                headers: { 'Content-Type': 'text/plain' }
            });
    
            if (response.data.isSuccess) {
                setIsEmailSent(true);
                setMessage('이메일이 전송되었습니다. 이메일을 확인해주세요.');
                setCountdown(180); // 3분 타이머 시작
                setErrorMessage('');
            } else {
                setErrorMessage(response.data.message || '이메일 인증에 실패했습니다.');
            }
        } catch (error) {
            console.error('이메일 인증 오류:', error);
            setErrorMessage('서버 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    // 3분 타이머 설정
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // 인증 코드 확인 (GET /api/auth/numberCheck)
    const handleEmailCodeCheck = async () => {
        if (!authCode) {
            setErrorMessage('인증 코드를 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.get('/api/auth/numberCheck', {
                params: { email, number: authCode }
            });

            if (response.data.isSuccess) {
                setIsVerified(true);
                setMessage('이메일 인증이 완료되었습니다.');
                setErrorMessage('');
            } else {
                setErrorMessage(response.data.message || '인증 코드가 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('인증 코드 확인 오류:', error);
            setErrorMessage('서버 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    // 이메일 변경 요청 (PATCH /api/user/resetMail)
    const handleSave = async () => {
        if (!isVerified) {
            setErrorMessage('이메일 인증을 완료해주세요.');
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.patch('/api/user/resetMail', null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                params: { email }
            });

            if (response.data.isSuccess) {
                alert('이메일이 성공적으로 변경되었습니다.');
                navigate('/user');
            } else {
                setErrorMessage(response.data.message || '이메일 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('이메일 변경 오류:', error);
            setErrorMessage('서버 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
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
                    isButtonActive={isEmailValid && !loading} // 유효성 검사 및 로딩 중 아닐 때 활성화
                />
                {message && <Message>{message}</Message>}
                
                {isEmailSent && (
                    <AuthCodeInputWithTimer
                        value={authCode}
                        onChange={handleAuthCodeChange}
                        onButtonClick={() => console.log("인증 확인 버튼 클릭!")}
                        timer={countdown} // 타이머 추가
                    />
                )}

                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            </Form>
            <CompleteButtonComponent label="이메일 변경 완료" onSave={handleSave} />
        </Container>
    );
};

export default ChangeEmailPage;

// 타이머 형식 변환 함수 (mm:ss)
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

const ErrorText = styled.p`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: red;
    margin-top: 10px;
`;
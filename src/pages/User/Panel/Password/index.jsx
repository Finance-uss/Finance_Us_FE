import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../../../../api/axiosInstance';
import BackHeader from '../../../../components/User/BackHeader'; 
import InputWithButton from '../../../../components/User/InputWithButton';
import SimpleInput from '../../../../components/User/SimpleInput';
import CompleteButtonComponent from '../../../../components/User/CompleteButton'; 

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(null); 
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
    const [isNewPasswordError, setIsNewPasswordError] = useState(false);
    const [isConfirmError, setIsConfirmError] = useState(false);

    // 뒤로 가기 버튼 클릭 이벤트 핸들러
    const handleBackClick = () => {
        navigate('/user'); 
    };

    // 비밀번호 유효성 검사
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
        return regex.test(password);
    };

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setCurrentPassword(value);
        setIsPasswordValid(validatePassword(value));
        setIsPasswordCorrect(null);
    };

    // 새 비밀번호 입력
    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        setIsNewPasswordError(!validatePassword(value) && value.length > 0);
        setIsConfirmError(confirmPassword.length > 0 && value !== confirmPassword);
    };

    // 새 비밀번호 확인 입력
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setIsConfirmError(value !== newPassword);
    };

    // 비밀번호 확인 버튼 클릭
    const handleCheckPassword = async () => {
        // 실제 API 요청으로 비밀번호 확인 (여기서는 Mock 데이터 사용)
        const isCorrect = currentPassword === 'hello123'; // Mock 비밀번호
        setIsPasswordCorrect(isCorrect);
        if (isCorrect) {
            setResponseMessage('일치한 비밀번호입니다.');
            setShowNewPasswordFields(true);
        } else {
            setResponseMessage('현재 비밀번호가 일치하지 않습니다.');
            setShowNewPasswordFields(false);
        }
    };

    // 완료 버튼 클릭 시 저장 로직
    const handleSave = () => {
        console.log('비밀번호 변경 완료');
        console.log('새 비밀번호:', newPassword);
        console.log('새 비밀번호 확인:', confirmPassword);
    };

    return (
        <Container>
            <BackHeader title="비밀번호 변경" onBackClick={handleBackClick} />
            <Form>
                <InputWithButton
                    type="text" 
                    placeholder="현재 비밀번호"
                    buttonText="확인"
                    onButtonClick={handleCheckPassword}
                    value={currentPassword}
                    onChange={handlePasswordChange}
                    isButtonActive={isPasswordValid} 
                    isError={isPasswordCorrect === false}
                />
                {isPasswordCorrect === false && <ErrorMessage>{responseMessage}</ErrorMessage>}
                {isPasswordCorrect === true && <SuccessMessage>{responseMessage}</SuccessMessage>}

                {showNewPasswordFields && (
                    <>
                        <Divider />
                        <SimpleInput
                            type="text"
                            placeholder="새 비밀번호"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            isError={isNewPasswordError}
                        />
                        {isNewPasswordError && (
                            <ErrorMessage>
                                비밀번호는 영어 대/소문자, 숫자 중 2종류 이상을 조합한<br />8자~12자 이내여야 합니다.
                            </ErrorMessage>
                        )}

                        <SimpleInput
                            type="text"
                            placeholder="새 비밀번호 확인"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            isError={isConfirmError}
                        />
                        {isConfirmError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </>
                )}
            </Form>
            <CompleteButtonComponent label="비밀번호 변경 완료" onSave={handleSave} />
        </Container>
    );
};

export default ChangePasswordPage;

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

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #ccc;
    margin-top: 20px;
    margin-bottom: 40px;
    width: 100%;
`;

const ErrorMessage = styled.p`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color:  #F17357;
    margin-top: 5px;
`;

const SuccessMessage = styled.p`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: #142755;
    margin-top: 5px;
`;
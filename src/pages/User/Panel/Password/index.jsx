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
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])[A-Za-z\d!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/]{8,12}$/;
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
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }
    
            const response = await axiosInstance.get(`/api/user/passwordCheck`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { password: currentPassword }
            });
    
            console.log("[GET 요청] 비밀번호 확인 API 호출");
            console.log("[응답 데이터]:", response.data);
    
            if (response.data.isSuccess) {
                setIsPasswordCorrect(true);
                setResponseMessage("비밀번호가 일치합니다.");
                setShowNewPasswordFields(true);
            } else {
                setIsPasswordCorrect(false);
                setResponseMessage("현재 비밀번호가 일치하지 않습니다.");
                setShowNewPasswordFields(false);
            }
        } catch (error) {
            console.error("비밀번호 확인 오류:", error);
            setIsPasswordCorrect(false);
            setResponseMessage("비밀번호 확인 중 오류가 발생했습니다.");
        }
    };

    // 비밀번호 변경 API 요청
    const handleSave = async () => {
        if (newPassword !== confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        if (newPassword === currentPassword) {
            alert("새 비밀번호는 현재 비밀번호와 다르게 설정해야 합니다.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }
    
            console.log("🔹 회원 정보 조회 API 호출 중...");
    
            // 회원 정보 조회 API 호출
            const response = await axiosInstance.get("/api/user", {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if (response.data.isSuccess) {
                const userEmail = response.data.result.email; // API 응답에서 이메일 가져오기
                console.log("회원 정보 조회 성공! 이메일:", userEmail);
    
                if (!userEmail) {
                    alert("이메일 정보를 찾을 수 없습니다.");
                    return;
                }
                console.log("[PATCH 요청] 비밀번호 변경 API 호출 중...");
    
                // 비밀번호 변경 API 호출
                const updateResponse = await axiosInstance.patch(`/api/user/resetPassword`, null, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        email: userEmail, // 조회한 이메일 사용
                        password: newPassword
                    }
                });
    
                console.log("[비밀번호 변경 응답]:", updateResponse.data);
    
                if (updateResponse.data.isSuccess) {
                    alert("비밀번호가 성공적으로 변경되었습니다.");
                    navigate('/user');
                } else {
                    alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
                }
            } else {
                alert("회원 정보를 가져오지 못했습니다.");
            }
        } catch (error) {
            console.error("비밀번호 변경 오류:", error);
            alert("비밀번호 변경 중 오류가 발생했습니다.");
        }
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
                                비밀번호는 영어 대/소문자, 숫자, 특수문자를 포함한<br />8자~12자 이내여야 합니다.
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
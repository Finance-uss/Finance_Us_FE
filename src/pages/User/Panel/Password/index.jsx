import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackHeader from '../../../../components/User/BackHeader'; 
import InputWithButton from '../../../../components/User/InputWithButton';
import SimpleInput from '../../../../components/User/SimpleInput';
import CompleteButtonComponent from '../../../../components/User/CompleteButton'; 

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [responseMessage, setResponseMessage] = useState(''); // 응답 메시지
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPasswordFields, setShowNewPasswordFields] = useState(false); // 새 비밀번호 필드 표시 여부

    // 뒤로 가기 버튼 클릭 이벤트 핸들러
    const handleBackClick = () => {
        navigate('/user'); // /user 페이지로 이동
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
    };

    // 확인 버튼 클릭 핸들러
    const handleCheckPassword = async () => {
        // API 호출로 비밀번호 확인 (여기선 mock response)
        const isPasswordCorrect = currentPassword === 'hello123'; // Mock 데이터
        if (isPasswordCorrect) {
            setResponseMessage('일치한 비밀번호입니다.');
            setShowNewPasswordFields(true); // 새 비밀번호 필드 표시
        } else {
            setResponseMessage('비밀번호가 틀렸습니다. 다시 입력해주세요.');
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
                    type="text" // 비밀번호를 보여야 하므로 text 타입
                    placeholder="현재 비밀번호"
                    buttonText="확인"
                    onButtonClick={handleCheckPassword}
                    value={currentPassword}
                    onChange={handlePasswordChange}
                    isButtonActive={isPasswordValid} // 비밀번호 유효성에 따라 활성화
                />
                {responseMessage && (
                    <Message isSuccess={responseMessage.includes('일치')}>
                        {responseMessage}
                    </Message>
                )}
                {showNewPasswordFields && (
                    <>
                        <Divider />
                        <SimpleInput
                            type="text"
                            placeholder="새 비밀번호"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <SimpleInput
                            type="text"
                            placeholder="새 비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Hint>
                            영어 대/소문자, 숫자 중 2종류 이상을 조합하여 8자~12자로 구성해야 합니다.
                        </Hint>
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
`;

const Message = styled.p`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: ${({ isSuccess }) => (isSuccess ? '#142755' : '#FF0000')};
    margin-top: 10px;
`;

const Hint = styled.p`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: #142755;
    margin-top: 10px;
`;
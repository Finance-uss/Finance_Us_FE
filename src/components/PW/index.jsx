import React from 'react';
import styled from 'styled-components';

const PasswordChangePopup = ({ onClose, onLogin }) => {
    return (
        <ModalBackdrop>
            <ModalContainer>
                <ModalTitle>비밀번호 설정을 완료하였습니다.</ModalTitle>
                <ButtonContainer>
                    <CancelButton onClick={onClose}>닫기</CancelButton>
                    <ConfirmButton onClick={onLogin}>로그인하기</ConfirmButton>
                </ButtonContainer>
            </ModalContainer>
        </ModalBackdrop>
    );
};

export default PasswordChangePopup;


const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalContainer = styled.div`
    width: 80%;
    height: 147px;
    background: #fff;
    border-radius: 15px;
    text-align: center;
`;

const ModalTitle = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    height: 101px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 46px;
`;

const CancelButton = styled.button`
    width: 50%;
    background: #B4B4B4;
    border: none;
    border-right: 0.5px solid #fff;
    color: #fff;
    cursor: pointer;
    border-radius: 0px 0px 0px 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
`;

const ConfirmButton = styled.button`
    width: 50%;
    background: #B4B4B4;
    border: none;
    border-right: 0.5px solid #fff;
    color: #fff;
    cursor: pointer;
    border-radius: 0px 0px 15px 0px;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
`;
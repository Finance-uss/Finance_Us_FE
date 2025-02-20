import React from 'react';
import styled from 'styled-components';

function DeleteConfirmModal({ title, onCancel, onConfirm }) {
    return (
        <ModalBackdrop>
            <ModalContainer>
                <ModalTitle>{title}</ModalTitle>
                <ButtonContainer>
                    <CancelButton onClick={onCancel}>취소</CancelButton>
                    <DeleteButton onClick={onConfirm}>삭제</DeleteButton>
                </ButtonContainer>
            </ModalContainer>
        </ModalBackdrop>
    );
}

export default DeleteConfirmModal;

/* styled-components */
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
    z-index: 9999;
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

const DeleteButton = styled.button`
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

import React from 'react';
import { ModalOverlay, ModalContainer, Message, ButtonContainer, CancelButton, Button } from '../../../styles/User/ConfirmModal/style.js';

const ConfirmModal = ({ message, confirmText, cancelText, onConfirm, onCancel }) => {
    return (
        <ModalOverlay>
            <ModalContainer>
                <Message>{message}</Message>
                <ButtonContainer>
                    {cancelText && <CancelButton onClick={onCancel}>{cancelText}</CancelButton>}
                    <Button onClick={onConfirm}>{confirmText}</Button>
                </ButtonContainer>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default ConfirmModal;

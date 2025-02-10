import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CompleteButton } from '../../../styles/User/CompleteButton/style';

const CompleteButtonComponent = ({ label, onSave }) => {
    const navigate = useNavigate(); // navigate 선언

    const handleClick = () => {
        if (onSave) {
            onSave(); // 저장 로직 실행
        }
        navigate('/user');
    };

    return (
        <CompleteButton onClick={handleClick}>
            {label}
        </CompleteButton>
    );
};

export default CompleteButtonComponent;

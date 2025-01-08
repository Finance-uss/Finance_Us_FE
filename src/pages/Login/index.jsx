// src/pages/Login/index.jsx
import React from 'react';
import SubmitButton from '../../components/common/SubmitButton';
import FinanceButton from '../../components/common/FinanceButton';

const Login = () => {
    const handleSubmit = () => {
        alert("로그인 버튼이 클릭되었습니다!");
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>로그인 페이지</h1>
            <SubmitButton text="로그인" onClick={handleSubmit} />
            <h1>재무 관리 버튼</h1>
            <FinanceButton />
        </div>
    );
};

export default Login;

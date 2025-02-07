import React from 'react';
import { useParams } from 'react-router-dom';

const AccountDetail = () => {
    const { accountId } = useParams(); // URL에서 accountId 가져오기

    return (
        <div>
            <h2>가계부 상세 페이지</h2>
            <p>현재 선택된 가계부 ID: {accountId}</p>
        </div>
    );
};

export default AccountDetail;

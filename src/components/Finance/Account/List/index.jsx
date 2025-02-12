import React, { useState } from 'react';
import AccountItem from './Item';


//여러 아이템(activities)을 리스트로 표시
const AccountList = ({ activities, onDeleteSuccess }) => {
    if (!activities) {
        return null; // 또는 로딩 스피너 등을 표시
    }
    
    return (
        <>
            {activities.map((activity) => (
                <AccountItem 
                    key={activity.accountId} 
                    activity={activity} 
                    onDeleteSuccess={onDeleteSuccess}
                />
            ))}
        </>
    );
}

export default AccountList;
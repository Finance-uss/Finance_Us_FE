import React, { useState } from 'react';
import AccountItem from './Item';


//여러 아이템(activities)을 리스트로 표시
const AccountList = ({ activities }) => {
    return (
        <>
            {activities.map((activity) => (
                <AccountItem key={activity.accountId} activity={activity} />
            ))}
        </>
    );
}

export default AccountList;
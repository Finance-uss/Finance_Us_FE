import React from 'react';
import { useDate } from '../../../contexts/DateContext';
import { useAccountData } from '../../../hooks/useAccountData';

import NavBar from '../../../components/common/NavBar/index';
import Satisfaction from '../../../components/Finance/Satisfaction';
import Calendar from '../../../components/Finance/Calendar/index';
import FinancePlusButton from '../../../components/common/FloatingButton/FinancePlusButton';
import AccountList from '../../../components/Finance/Account/List';
import BottomBar from '../../../components/common/BottomBar';

import { Container, Today } from '../../../styles/Finance/style';
import Bell from '../../../assets/icons/common/Bell.svg';

const FinanceMain = () => {
    const { selectedDate } = useDate();
    const { accountData, loading, error } = useAccountData(selectedDate, `/api/calendar/${selectedDate.year}/${selectedDate.month}/${selectedDate.day}`);
    
    const accounts = [
        {
            accountId: 1,
            score: 5,
            title: '식비',
            amount: 10000,
            subName: '맛있는 점심',
            imageUrl: '',
        },
    ];

    // {accountData && accountData.map((account) => (
    //     <AccountDetail
    //         key={account.id}
    //         score={account.score}
    //         title={account.title}
    //         amount={account.amount}
    //         subName={account.subName}
    //         imageUrl={account.imageUrl}
    //     />
    // ))}

    

    return (
        <Container>
            <NavBar icon={Bell} modalTop="75px"/>
            <Satisfaction />
            <Calendar header={`지출 0원 수익 0원`} />
            <FinancePlusButton />
            <Today>{selectedDate.day}일</Today>
            <AccountList activities={accounts} />
            <BottomBar />
        </Container>
    );
};

export default FinanceMain;
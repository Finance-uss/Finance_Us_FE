import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../../api/axiosInstance';
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
    const [monthData, setMonthData] = useState(null);
    // ✅ `useAccountData` 항상 호출, selectedDate.day가 없으면 null 반환
    const apiUrl = selectedDate.day 
        ? `/api/calendar/${selectedDate.year}/${selectedDate.month}/${selectedDate.day}`
        : null;

    const { accountData, loading, error, refetch } = useAccountData(selectedDate, apiUrl);

    useEffect(() => {
        selectedDate.day = null;
    }, []);

    useEffect(() => {
        const postRequest = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/calendar/${selectedDate.year}/${selectedDate.month}`
                );
                setMonthData(response.data.result);
            } catch (error) {
                console.error(error);
            }
        };
        postRequest();
    }, [selectedDate]);

    useEffect(() => {
        selectedDate.day = null;
    }, [selectedDate.month, selectedDate.year]);

    if(!monthData) {
        return null;
    }
    return (
        <Container>
            <NavBar icon={Bell} modalTop="75px"/>
            <Satisfaction score={monthData.totalScore}/>
            <Calendar header={`지출 ${monthData.totalExpense.toLocaleString()}원 수익 ${monthData.totalIncome.toLocaleString()}원`} />
            <FinancePlusButton />
            {selectedDate.day && <Today>{selectedDate.day}일</Today>}
            {accountData && (
                <AccountList 
                    activities={accountData}
                    onDeleteSuccess={refetch} 
                />
            )}
            <BottomMargin />
            <BottomBar />
        </Container>
    );
};

export default FinanceMain;

const BottomMargin = styled.div`
    height: 77px;
`;
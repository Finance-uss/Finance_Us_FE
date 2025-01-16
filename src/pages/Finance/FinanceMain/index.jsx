import React, {useState} from 'react';
import NavBar from '../../../components/common/NavBar/index';
import Satisfaction from '../../../components/Finance/Satisfaction';
import Calendar from '../../../components/Finance/Calendar/index';
import FinancePlusButton from '../../../components/common/FloatingButton/FinancePlusButton';

import { FinanceContainer } from '../../../styles/Finance/FinanceMain/style';
import Bell from '../../../assets/icons/common/Bell.svg';

const FinanceMain = () => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    });
    return (
        <FinanceContainer>
            <NavBar icon={Bell} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <Satisfaction selectedDate={selectedDate}/>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <FinancePlusButton />
        </FinanceContainer>
    );
};

export default FinanceMain;
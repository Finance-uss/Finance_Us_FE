import React, {useState} from 'react';
import NavBar from '../../components/common/NavBar/index';
import Calendar from '../../components/Finance/Calendar/index';

import { FinanceContainer } from '../../styles/Finance/style';
import Bell from '../../assets/icons/common/Bell.svg';

const Finance = () => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState({
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    });
    return (
        <FinanceContainer>
            <NavBar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        </FinanceContainer>
    );
};

export default Finance;
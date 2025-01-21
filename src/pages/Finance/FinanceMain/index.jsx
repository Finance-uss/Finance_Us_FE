import React, { useContext } from 'react';
import { FinanceContext } from '../../../contexts/financeContext';
import NavBar from '../../../components/common/NavBar/index';
import Satisfaction from '../../../components/Finance/Satisfaction';
import Calendar from '../../../components/Finance/Calendar/index';
import FinancePlusButton from '../../../components/common/FloatingButton/FinancePlusButton';
import BottomBar from '../../../components/common/BottomBar';

import { Container } from '../../../styles/Finance/style';
import Bell from '../../../assets/icons/common/Bell.svg';

const FinanceMain = () => {
    const { selectedDate, setSelectedDate } = useContext(FinanceContext);

    return (
        <Container>
            <NavBar icon={Bell} selectedDate={selectedDate} setSelectedDate={setSelectedDate} top="44px"/>
            <Satisfaction selectedDate={selectedDate}/>
            <Calendar header={`지출 0원 수익 0원`} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <FinancePlusButton />
            <BottomBar />
        </Container>
    );
};

export default FinanceMain;
import React from 'react';
import NavBar from '../../../components/common/NavBar/index';
import Satisfaction from '../../../components/Finance/Satisfaction';
import Calendar from '../../../components/Finance/Calendar/index';
import FinancePlusButton from '../../../components/common/FloatingButton/FinancePlusButton';
import BottomBar from '../../../components/common/BottomBar';

import { Container } from '../../../styles/Finance/style';
import Bell from '../../../assets/icons/common/Bell.svg';

const FinanceMain = () => {
    return (
        <Container>
            <NavBar icon={Bell} modalTop="75px"/>
            <Satisfaction />
            <Calendar header={`지출 0원 수익 0원`} />
            <FinancePlusButton />
            <BottomBar />
        </Container>
    );
};

export default FinanceMain;
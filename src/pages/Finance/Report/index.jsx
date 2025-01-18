import React, { useContext } from 'react';
import BeforeHeader from '../../../components/common/BeforeHeader';
import NavBar from '../../../components/common/NavBar';
import { FinanceContext } from '../../../contexts/financeContext';
import * as S from '../../../styles/Finance/Report/style';

const Report = () => {
    const { selectedDate, setSelectedDate } = useContext(FinanceContext);
    return (
        <S.Container>
            <BeforeHeader text="경제 활동 만족도 레포트" />
            <NavBar selectedDate={selectedDate} setSeletedDate={setSelectedDate} modalTop="132px"/>
        </S.Container>
    );
};

export default Report;
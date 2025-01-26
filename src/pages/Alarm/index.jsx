import React from 'react';
import BeforeHeader from '../../components/common/BeforeHeader';
import AlarmList from '../../components/Alarm/AlarmList/inedx';
import {Container} from '../../styles/Alarm/style';
const Alarm = () => {
    return (
        <Container>
            <BeforeHeader text="알림"/>
             <AlarmList/>
        </Container>
    );
};

export default Alarm;
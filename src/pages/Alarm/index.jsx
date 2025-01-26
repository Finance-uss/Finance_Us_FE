import React from 'react';
import BeforeHeader from '../../components/common/BeforeHeader';
import AlarmList from '../../components/Alarm/AlarmList';
import {Container} from '../../styles/Alarm/style'

const Alarm = () => {
    return (
        <Container>
            <BeforeHeader text="알림"/>
            <div style={{ marginTop: '40px' }}></div>
             <AlarmList/>
        </Container>
    );
};

export default Alarm;
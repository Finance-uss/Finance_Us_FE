import React from 'react';
import BeforeHeader from '../../components/common/BeforeHeader';
import AlarmList from '../../components/Alarm/AlarmList/inedx';
const Alarm = () => {
    return (
        <>
            <BeforeHeader text="알림"/>
             <AlarmList/>
        </>
    );
};

export default Alarm;
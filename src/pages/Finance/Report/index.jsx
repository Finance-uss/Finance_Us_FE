import React, { useEffect } from 'react';
import { useAccountData } from '../../../hooks/useAccountData';
import { useDate } from '../../../contexts/DateContext';

import BeforeHeader from '../../../components/common/BeforeHeader';
import NavBar from '../../../components/common/NavBar';
import Activity from '../../../components/Finance/Account/Activity';
import { Container } from '../../../styles/Finance/style';

const Report = () => {
    const { selectedDate } = useDate();
    const { accountData: activities, loading, error } = useAccountData(
        selectedDate, 
        `/api/account/report/${selectedDate.year}/${selectedDate.month}`
    );

    return (
        <Container>
            <BeforeHeader text="경제 활동 만족도 레포트" />
            <NavBar modalTop="142px" />
            {/* 아쉬운 활동 줄이기 (★1~2점) */}
            {activities?.reduceActivity?.length > 0 && (
                <Activity 
                    title="아쉬운 활동 줄이기 ★1~2점" 
                    activities={activities.reduceActivity} 
                />
            )}

            {/* 만족스러운 활동 늘리기 (★4~5점) */}
            {activities?.satisfactoryActivity?.length > 0 && (
                <Activity 
                    title="만족스러운 활동 늘리기 ★4~5점" 
                    activities={activities.satisfactoryActivity} 
                />
            )}

            {/* 괜찮은 활동 유지하기 (★3점) */}
            {activities?.maintainActivity?.length > 0 && (
                <Activity 
                    title="괜찮은 활동 유지하기 ★3점" 
                    activities={activities.maintainActivity} 
                />
            )}

        </Container>
    );
};

export default Report;
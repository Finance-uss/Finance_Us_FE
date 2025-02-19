import React from 'react';
import { useAccountData } from '../../../hooks/useAccountData';
import { useDate } from '../../../contexts/DateContext';

import BeforeHeader from '../../../components/common/BeforeHeader';
import NavBar from '../../../components/common/NavBar';
import Activity from '../../../components/Finance/Account/Activity';
import { Container } from '../../../styles/Finance/style';

import styled from 'styled-components';

const Report = () => {
    const { selectedDate } = useDate();
    const { accountData: activities, loading, error, refetch } = useAccountData(
        selectedDate, 
        `/api/account/report/${selectedDate.year}/${selectedDate.month}`
    );

    return (
        <Container>
            <BeforeHeader text="경제 활동 만족도 레포트" />
            <Blank />
            <NavBar modalTop="68px" />
            {/* 아쉬운 활동 줄이기 (★1~2점) */}
            {activities?.reduceActivity?.length > 0 && (
                <Activity 
                    title="아쉬운 활동 줄이기 ★1~2점" 
                    activities={activities.reduceActivity}
                    onDeleteSuccess={refetch}
                />
            )}

            {/* 만족스러운 활동 늘리기 (★4~5점) */}
            {activities?.satisfactoryActivity?.length > 0 && (
                <Activity 
                    title="만족스러운 활동 늘리기 ★4~5점" 
                    activities={activities.satisfactoryActivity}
                    onDeleteSuccess={refetch} 
                />
            )}

            {/* 괜찮은 활동 유지하기 (★3점) */}
            {activities?.maintainActivity?.length > 0 && (
                <Activity 
                    title="괜찮은 활동 유지하기 ★3점" 
                    activities={activities.maintainActivity}
                    onDeleteSuccess={refetch} 
                />
            )}

        </Container>
    );
};

export default Report;

const Blank = styled.div`
    height: 20px;
`;
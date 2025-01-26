import React from 'react';
import BeforeHeader from '../../../components/common/BeforeHeader';
import NavBar from '../../../components/common/NavBar';
import { Container } from '../../../styles/Finance/style';

const Report = () => {

    return (
        <Container>
            <BeforeHeader text="경제 활동 만족도 레포트" />
            <NavBar modalTop="142px" />
        </Container>
    );
};

export default Report;
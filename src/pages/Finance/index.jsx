import React from 'react';
import { Outlet } from 'react-router-dom';
import { FinanceProvider } from '../../contexts/financeContext';

const Finance = () => {
    return (
        <FinanceProvider>
            <Outlet />
        </FinanceProvider>
    );
};

export default Finance;
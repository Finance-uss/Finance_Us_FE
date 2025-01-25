import React from 'react';
import { HandWriteProvider } from '../../../contexts/HandWriteContext';
import HandWriteContent from './HandWriteContent';

const HandWrite = () => {
    return (
        <HandWriteProvider>
            <HandWriteContent/>
        </HandWriteProvider>
    );
};

export default HandWrite;
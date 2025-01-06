import React, { useState } from 'react';
import { ButtonContainer, Button } from '../../../styles/common/FinanceButton/style';

const FinanceButton = () => {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    return (
        <ButtonContainer>
            <Button
                $active={activeButton === 'expense'} 
                onClick={() => handleButtonClick('expense')}
                style={{ color: activeButton === 'expense' ? '#ffffff' : activeButton === 'income' ? '#818C99' : '#000000' }} // 지출 버튼 클릭 시 흰색, 수익 버튼 클릭 시 회색
            >
                지출
            </Button>
            <Button
                $active={activeButton === 'income'}
                onClick={() => handleButtonClick('income')}
                style={{ color: activeButton === 'income' ? '#ffffff' : activeButton === 'expense' ? '#818C99' : '#000000' }} // 수익 버튼 클릭 시 흰색, 지출 버튼 클릭 시 회색
            >
                수익
            </Button>
        </ButtonContainer>
    );
};

export default FinanceButton;

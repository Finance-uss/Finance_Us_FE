import React from "react";
import * as S from "../../../../styles/common/NavBar/YearMonthModal/style.js";
import YearSelector from "./YearSelector/index.jsx";
import MonthSelector from "./MonthSelector/index.jsx";

const YearMonthModal = ({ selectedDate, onYearChange, onMonthChange }) => {
    return (
        <S.ModalWrapper>
            <S.ModalContent>
                <YearSelector 
                    onDateChange={onYearChange} 
                    initialYear={selectedDate.year}  
                />
                <MonthSelector 
                    onDateChange={onMonthChange} 
                    initialMonth={selectedDate.month}
                />
            </S.ModalContent>
        </S.ModalWrapper>
    );
};

export default YearMonthModal;

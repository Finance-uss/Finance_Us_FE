import React, { useState } from "react";
import * as S from "../../../../styles/common/NavBar2/DateRangeSelector/style.js"; // 스타일 경로
import YearMonthRangeModal from "./YearMonthRangeModal/index.jsx";
import CaretDown from "../../../../assets/icons/common/NavBar/CaretDown.svg";
import { useDate } from "../../../../contexts/DateContext.jsx";
import { useModal } from "../../../../hooks/useModal.js";

const DateRangeSelector = () => {
    const { selectedDate, setSelectedDate } = useDate();
    const { isOpen, toggleModal } = useModal();
    
    // 상태 변수만 선언 (기본값은 각 Selector에서 설정)
    const [startYear, setStartYear] = useState(selectedDate.startYear);
    const [startMonth, setStartMonth] = useState(selectedDate.startMonth);
    const [endYear, setEndYear] = useState(selectedDate.endYear);
    const [endMonth, setEndMonth] = useState(selectedDate.endMonth);

    const handleOpenModal = () => {
        toggleModal();
    };

    const handleDateChange = () => {
        setSelectedDate({
            startYear,
            startMonth,
            endYear,
            endMonth,
        });
    };

    return (
        <>
            <S.DateSelectContainer>
                <S.SelectedDateText>
                    {startYear}년 {startMonth}월 ~ {endYear}년 {endMonth}월
                </S.SelectedDateText>
                <S.DropdownIcon 
                    src={CaretDown} 
                    alt="Caretdown Icon" 
                    onClick={handleOpenModal} 
                />
            </S.DateSelectContainer>
            {isOpen && (
                <YearMonthRangeModal 
                    startYear={startYear}
                    startMonth={startMonth}
                    endYear={endYear}
                    endMonth={endMonth}
                    setStartYear={setStartYear}
                    setStartMonth={setStartMonth}
                    setEndYear={setEndYear}
                    setEndMonth={setEndMonth}
                    toggleModal={toggleModal}
                    handleDateChange={handleDateChange} 
                />
            )}
        </>
    );
};

export default DateRangeSelector;

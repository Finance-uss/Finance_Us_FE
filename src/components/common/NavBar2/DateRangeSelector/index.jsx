import React, { useState } from "react";
import * as S from "../../../../styles/common/NavBar2/DateRangeSelector/style.js"; // 스타일 경로
import YearMonthRangeModal from "./YearMonthRangeModal/index.jsx";
import CaretDown from "../../../../assets/icons/common/NavBar/CaretDown.svg";
import { useDate } from "../../../../contexts/DateContext.jsx";
import { useModal } from "../../../../hooks/useModal.js";

const DateRangeSelector = () => {
    const { selectedDate, setSelectedDate } = useDate();
    const { isOpen, toggleModal } = useModal();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [startYear, setStartYear] = useState(selectedDate.startYear || currentYear);
    const [startMonth, setStartMonth] = useState(selectedDate.startMonth || currentMonth);
    const [endYear, setEndYear] = useState(selectedDate.endYear || currentYear);
    const [endMonth, setEndMonth] = useState(selectedDate.endMonth || currentMonth);

    const handleOpenModal = () => {
        toggleModal();
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
                    modalTop={0} // 적절한 값으로 설정
                    onClose={toggleModal}
                    startYear={startYear}
                    startMonth={startMonth}
                    endYear={endYear}
                    endMonth={endMonth}
                    setStartYear={setStartYear}
                    setStartMonth={setStartMonth}
                    setEndYear={setEndYear}
                    setEndMonth={setEndMonth}
                />
            )}
        </>
    );
};

export default DateRangeSelector;

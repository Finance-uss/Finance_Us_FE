import React, { useState } from "react";
import * as S from "../../../../styles/common/NavBar2/DateRangeSelector/style.js"; 
import YearMonthRangeModal from "./YearMonthRangeModal/index.jsx";
import CaretDown from "../../../../assets/icons/common/NavBar/CaretDown.svg";
import { useModal } from "../../../../hooks/useModal.js";

const DateRangeSelector = ({ onPeriodChange }) => {
    const { isOpen, toggleModal } = useModal();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [startYear, setStartYear] = useState(currentYear);
    const [startMonth, setStartMonth] = useState(currentMonth);
    const [endYear, setEndYear] = useState(currentYear);
    const [endMonth, setEndMonth] = useState(currentMonth);

    const handleOpenModal = () => {
        toggleModal();
    };

    const handleConfirm = () => {
        console.log("확인 버튼이 클릭되었습니다."); // 추가된 로그
        console.log("Selected Period:", startYear, startMonth, endYear, endMonth);
        onPeriodChange(startYear, startMonth, endYear, endMonth);
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
                    modalTop={0} 
                    onClose={toggleModal} // 모달 닫기
                    onConfirm={handleConfirm} 
                    startYear={startYear}
                    startMonth={startMonth}
                    endYear={endYear}
                    endMonth={endMonth}
                    setStartYear={setStartYear}
                    setStartMonth={setStartMonth}
                    setEndYear={setEndYear}
                    setEndMonth={setEndMonth} // 확인 버튼 클릭 시 호출
                />
            )}
        </>
    );
};

export default DateRangeSelector;

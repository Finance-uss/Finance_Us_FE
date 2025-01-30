import React, { useEffect, useState } from "react";
import * as S from "../../../../../styles/common/NavBar/DateSelector/YearMonthModal/style.js";
import YearSelector from "./YearSelector/index.jsx";
import MonthSelector from "./MonthSelector/index.jsx";
import { useDate } from "../../../../../contexts/DateContext.jsx";

const YearMonthRangeModal = ({ modalTop }) => {
    const { selectedDate, setSelectedDate } = useDate();

    const [curModalTop, setCurModalTop] = useState(modalTop);
    const [isStartSelected, setIsStartSelected] = useState(true); // 시작/종료 선택 상태

    // 상태 초기화
    const [startYear, setStartYear] = useState(selectedDate.startYear);
    const [startMonth, setStartMonth] = useState(selectedDate.startMonth);
    const [endYear, setEndYear] = useState(selectedDate.endYear);
    const [endMonth, setEndMonth] = useState(selectedDate.endMonth);

    useEffect(() => {
        const scrollY = window.scrollY;
        setCurModalTop(scrollY + modalTop);
    }, [modalTop]);

    const handleYearChange = (year) => {
        if (isStartSelected) {
            setStartYear(year);
            setSelectedDate((prev) => ({ ...prev, startYear: year }));  // 자동 반영
        } else {
            setEndYear(year);
            setSelectedDate((prev) => ({ ...prev, endYear: year }));  // 자동 반영
        }
    };

    const handleMonthChange = (month) => {
        if (isStartSelected) {
            setStartMonth(month);
            setSelectedDate((prev) => ({ ...prev, startMonth: month }));  // 자동 반영
        } else {
            setEndMonth(month);
            setSelectedDate((prev) => ({ ...prev, endMonth: month }));  // 자동 반영
        }
    };

    const toggleSelection = () => {
        setIsStartSelected((prev) => !prev);
    };

    const handleSave = () => {
        // 최종 저장 기능 (필요시 추가)
        console.log("저장된 값:", { startYear, startMonth, endYear, endMonth });
    };

    return (
        <S.ModalWrapper $modalTop={curModalTop}>
            <S.ModalContent>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h5>
                        <button onClick={toggleSelection} style={{ marginRight: '10px', cursor: 'pointer' }}>
                            시작: {startYear}년 {startMonth}월
                        </button>
                        <button onClick={toggleSelection} style={{ cursor: 'pointer' }}>
                            종료: {endYear || startYear}년 {endMonth || startMonth}월
                        </button>
                    </h5>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <YearSelector 
                        onYearChange={handleYearChange} 
                        selectedYear={isStartSelected ? startYear : endYear} 
                    />
                    <MonthSelector 
                        onMonthChange={handleMonthChange} 
                        selectedMonth={isStartSelected ? startMonth : endMonth} 
                    />
                </div>
            </S.ModalContent>
        </S.ModalWrapper>
    );
};

export default YearMonthRangeModal;

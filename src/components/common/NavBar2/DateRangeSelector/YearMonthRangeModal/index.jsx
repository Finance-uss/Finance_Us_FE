import React, { useEffect, useState, useRef } from "react";
import * as S from "../../../../../styles/common/NavBar2/DateRangeSelector/YearMonthRangeModal/style.js"; // style.js 경로 수정
import YearSelector from "./YearSelector/index.jsx";
import MonthSelector from "./MonthSelector/index.jsx";

const YearMonthRangeModal = ({ 
    modalTop, 
    onClose, 
    startYear, 
    startMonth, 
    endYear, 
    endMonth, 
    setStartYear, 
    setStartMonth, 
    setEndYear, 
    setEndMonth 
}) => {
    const [curModalTop, setCurModalTop] = useState(modalTop);
    const [isStartSelected, setIsStartSelected] = useState(true);
    const isStartSelectedRef = useRef(isStartSelected);

    useEffect(() => {
        setTimeout(() => {
            setCurModalTop(window.scrollY + modalTop);
        }, 0);
    }, [modalTop]);

    useEffect(() => {
        isStartSelectedRef.current = isStartSelected;
    }, [isStartSelected]);

    const handleYearChange = (year) => {
        if (isStartSelectedRef.current) {
            setStartYear(year);
        } else {
            setEndYear(year);
        }
    };

    const handleMonthChange = (month) => {
        if (isStartSelectedRef.current) {
            setStartMonth(month);
        } else {
            setEndMonth(month);
        }
    };

    return (
        <S.ModalWrapper $modalTop={curModalTop}>
            <S.ModalContent>
                <S.ButtonContainer>
                    <S.Button 
                        onClick={() => setIsStartSelected(true)} 
                        isSelected={isStartSelected}
                    >
                        시작: {startYear}년 {startMonth}월
                    </S.Button>
                    <S.Button 
                        onClick={() => setIsStartSelected(false)} 
                        isSelected={!isStartSelected}
                    >
                        종료: {endYear}년 {endMonth}월
                    </S.Button>
                </S.ButtonContainer>
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
                <S.ViewButton onClick={onClose}>보기</S.ViewButton>
            </S.ModalContent>
        </S.ModalWrapper>
    );
};

export default YearMonthRangeModal;

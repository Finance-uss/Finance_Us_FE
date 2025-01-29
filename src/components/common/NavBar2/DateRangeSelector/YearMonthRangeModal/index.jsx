import React, { useState, useEffect } from "react";
import * as S from "../../../../../styles/common/NavBar2/DateRangeSelector/YearMonthRangeModal/style.js";
import YearSelector from "./YearSelector/index.jsx";
import MonthSelector from "./MonthSelector/index.jsx";
import { useDate } from "../../../../../contexts/DateContext.jsx"; 

const YearMonthRangeModal = ({ modalTop }) => {
    const [curModalTop, setCurModalTop] = useState(modalTop);
    const { selectedDate, setSelectedDate } = useDate(); 
    const [isStartSelected, setIsStartSelected] = useState(true); 

    useEffect(() => {
        const scrollY = window.scrollY;
        setCurModalTop(scrollY + modalTop);
    }, [modalTop]);

    const handleYearChange = (year) => {
        if (isStartSelected) {
            setSelectedDate((prev) => ({ ...prev, year })); 
        } else {
            setSelectedDate((prev) => ({ ...prev, endYear: year }));
        }
    };

    const handleMonthChange = (month) => {
        if (isStartSelected) {
            setSelectedDate((prev) => ({ ...prev, month })); 
        } else {
            setSelectedDate((prev) => ({ ...prev, endMonth: month }));
        }
    };

    const toggleSelection = () => {
        setIsStartSelected((prev) => !prev);
    };

    return (
        <S.ModalWrapper $modalTop={curModalTop}>
            <S.ModalContent>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h5>
                        <button onClick={toggleSelection} style={{ marginRight: '10px', cursor: 'pointer' }}>
                            시작: {selectedDate.year}년 {selectedDate.month}월
                        </button>
                        <button onClick={toggleSelection} style={{ cursor: 'pointer' }}>
                            종료: {selectedDate.endYear || selectedDate.year}년 {selectedDate.endMonth || selectedDate.month}월
                        </button>
                    </h5>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <YearSelector onYearChange={handleYearChange} />
                    <MonthSelector onMonthChange={handleMonthChange} />
                </div>
            </S.ModalContent>
        </S.ModalWrapper>
    );
};

export default YearMonthRangeModal;

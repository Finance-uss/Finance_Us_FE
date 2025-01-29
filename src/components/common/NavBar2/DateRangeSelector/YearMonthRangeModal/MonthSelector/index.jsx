import React, { useEffect } from "react";
import * as S from "../../../../../../styles/common/NavBar2/DateRangeSelector/YearMonthRangeModal/MonthSelector/style.js"; // 스타일 경로
import { useDate } from "../../../../../../contexts/DateContext.jsx";
import { useScrollSelector } from "../../../../../../hooks/useScrollSelector.js";

const MonthSelector = () => {
    const itemCount = 12; // 1월부터 12월까지
    const itemHeight = 34;

    const { selectedDate, setSelectedDate } = useDate();
    const { ref, selected } = useScrollSelector(
        selectedDate.month - 1, 
        itemCount,
        itemHeight,
        (monthIndex) => {
            const newMonth = monthIndex + 1; 
            setSelectedDate((prev) => ({ ...prev, month: newMonth })); 
        }
    );

    useEffect(() => {
        const currentMonth = new Date().getMonth() + 1;
        setSelectedDate((prev) => ({ ...prev, month: currentMonth }));
    }, [setSelectedDate]);

    // 월 배열 생성 (1부터 12까지)
    const months = Array.from({ length: itemCount }, (_, i) => i + 1);

    return (
        <S.List ref={ref}>
            {months.map((month, index) => (
                <S.ListItem key={index} $isSelected={month === selected + 1}>
                    {month}월
                </S.ListItem>
            ))}
        </S.List>
    );
};

export default MonthSelector;

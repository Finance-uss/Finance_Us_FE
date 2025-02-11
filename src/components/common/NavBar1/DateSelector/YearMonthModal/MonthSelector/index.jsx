import React from "react";
import * as S from "../../../../../../styles/common/NavBar/DateSelector/YearMonthModal/MonthSelector/style.js";
import { useDate } from "../../../../../../contexts/DateContext.jsx";
import { useScrollSelector } from "../../../../../../hooks/useScrollSelector.js";

const MonthSelector = ({ onDateChange }) => {
    const itemCount = 12;
    const itemHeight = 34;

    const { selectedDate, setSelectedDate } = useDate();
    const { ref, selected } = useScrollSelector(
        selectedDate.month,
        itemCount,
        itemHeight,
        (month) => {
            setSelectedDate((prev) => ({ ...prev, month }));
            onDateChange(selectedDate.year, month); // 날짜 변경 시 API 호출
        }
    );

    const months = ["", "", ...Array.from({ length: 12 }, (_, i) => i + 1), "", ""];

    return (
        <S.List ref={ref}>
            {months.map((month, index) => (
                <S.ListItem key={index} $isSelected={month === selected}>
                    {month !== "" ? `${month}월` : ""}
                </S.ListItem>
            ))}
        </S.List>
    );
};

export default MonthSelector;

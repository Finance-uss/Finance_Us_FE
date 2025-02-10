import React, { useEffect } from "react";
import * as S from "../../../../../../styles/common/NavBar/DateSelector/YearMonthModal/MonthSelector/style.js";
import { useDate } from "../../../../../../contexts/DateContext.jsx";
import { useScrollSelector } from "../../../../../../hooks/useScrollSelector.js";

const MonthSelector = ({ onMonthChange, selectedMonth }) => {
    const itemCount = 12;
    const itemHeight = 34;

    const { selectedDate } = useDate();
    const { ref, selected, setSelected } = useScrollSelector(
        selectedDate.month,
        itemCount,
        itemHeight,
        (month) => {
            onMonthChange(month);  // 부모 컴포넌트에 월 변경 알림
        }
    );

    const months = ["", "", ...Array.from({ length: 12 }, (_, i) => i + 1), "", ""];

    // selectedMonth가 변경될 때 selected를 업데이트
    useEffect(() => {
        if (setSelected) {
            setSelected(selectedMonth); // setSelected가 함수인 경우에만 호출
        }
    }, [selectedMonth]);

    return (
        <S.List ref={ref}>
            {months.map((month, index) => (
                <S.ListItem key={index} $isSelected={month === selected || month === selectedMonth}>
                    {month !== "" ? `${month}월` : ""}
                </S.ListItem>
            ))}
        </S.List>
    );
};

export default MonthSelector;

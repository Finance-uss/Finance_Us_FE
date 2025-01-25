import React from "react";
import * as S from "../../../../../../styles/common/NavBar/DateSelector/YearMonthModal/YearSelector/style.js";
import { useDate } from "../../../../../../contexts/DateContext.jsx";
import { useScrollSelector } from "../../../../../../hooks/useScrollSelector.js";

const YearSelector = () => {
    const START_YEAR = 2000;
    const END_YEAR = 2050;
    const itemCount = END_YEAR - START_YEAR + 1;
    const itemHeight = 34;

    const { selectedDate, setSelectedDate } = useDate();
    const { ref, selected } = useScrollSelector(
        selectedDate.year - START_YEAR + 1,
        itemCount,
        itemHeight,
        (yearIndex) => setSelectedDate((prev) => ({ ...prev, year: START_YEAR + yearIndex - 1 }))
    );

    const years = ["", "", ...Array.from({ length: itemCount }, (_, i) => START_YEAR + i), "", ""];

    return (
        <S.List ref={ref}>
            {years.map((year, index) => (
                <S.ListItem key={index} $isSelected={year === selected + START_YEAR - 1}>
                    {year !== "" ? `${year}년` : ""}
                </S.ListItem>
            ))}
        </S.List>
    );
};

export default YearSelector;

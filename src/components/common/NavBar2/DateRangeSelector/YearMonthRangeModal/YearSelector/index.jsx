import React, { useEffect } from "react";
import * as S from "../../../../../../styles/common/NavBar2/DateRangeSelector/YearMonthRangeModal/YearSelector/style.js"; // 스타일 경로
import { useDate } from "../../../../../../contexts/DateContext.jsx";
import { useScrollSelector } from "../../../../../../hooks/useScrollSelector.js";

const YearSelector = () => {
    const START_YEAR = 2000;
    const END_YEAR = 2050;
    const itemCount = END_YEAR - START_YEAR + 1;
    const itemHeight = 34;

    const { selectedDate, setSelectedDate } = useDate();
    const { ref, selected } = useScrollSelector(
        selectedDate.year - START_YEAR, 
        itemCount,
        itemHeight,
        (yearIndex) => {
            const newYear = START_YEAR + yearIndex;
            setSelectedDate((prev) => ({ ...prev, year: newYear })); 
        }
    );

    // 컴포넌트가 마운트될 때 현재 년도를 기본값으로 설정
    useEffect(() => {
        const currentYear = 2025;
        setSelectedDate((prev) => ({ ...prev, year: currentYear }));
    }, [setSelectedDate]);

    // 연도 배열 생성 (2000부터 2050까지)
    const years = Array.from({ length: itemCount }, (_, i) => START_YEAR + i);

    return (
        <S.List ref={ref}>
            {years.map((year, index) => (
                <S.ListItem key={index} $isSelected={year === selected + START_YEAR}>
                    {year}년
                </S.ListItem>
            ))}
        </S.List>
    );
};

export default YearSelector;

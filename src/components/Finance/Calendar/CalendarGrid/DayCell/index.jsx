import React from "react";
import * as S from "../../../../../styles/Finance/Calendar/style.js";

const DayCell = ({ day, isSelected, onClick, highlightColor }) => {
    return (
        <S.DayCell 
            $isSelected={isSelected} 
            $highlightColor={highlightColor}
            onClick={onClick}
        >
            {day ? day.getDate() : ""}
        </S.DayCell>
    );
};

export default DayCell;
import React from "react";
import * as S from "../../../../styles/Finance/Calendar/style.js";
import DayCell from "./DayCell";

const CalendarGrid = ({ days, selectedDate, onClickDay, isSameDay }) => {
    return (
        <S.TableGrid>
            {days.map((day, i) => (
                <DayCell 
                    key={day ? day.getDate() : `empty-${i}`}
                    day={day}
                    isSelected={day && isSameDay(selectedDate, day)}
                    onClick={() => onClickDay(day)}
                />
            ))}
        </S.TableGrid>
    );
};

export default CalendarGrid;
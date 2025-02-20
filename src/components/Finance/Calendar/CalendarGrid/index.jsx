import React from "react";
import * as S from "../../../../styles/Finance/Calendar/style.js";
import DayCell from "./DayCell";

const CalendarGrid = ({ days, selectedDate, onClickDay, isSameDay, highlightData }) => {
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getHighlightColorForDay = (day) => {
        if (!day || !highlightData) return null;
        const formatted = formatDate(day);
        const match = highlightData.find(item => item.date === formatted);
        return match ? match.highlightColor : null;
    };
    
    return (
        <S.TableGrid>
            {days.map((day, i) => (
                <DayCell 
                    key={day ? day.getDate() : `empty-${i}`}
                    day={day}
                    isSelected={day && isSameDay(selectedDate, day)}
                    onClick={() => onClickDay(day)}
                    highlightColor={getHighlightColorForDay(day)}
                />
            ))}
        </S.TableGrid>
    );
};

export default CalendarGrid;
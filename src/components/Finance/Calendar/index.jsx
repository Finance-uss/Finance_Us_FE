import React from "react";
import * as S from "../../../styles/Finance/Calendar/style.js";
import Header from "./Header";
import CalendarGrid from "./CalendarGrid";
import { useCalendar } from "../../../hooks/useCalendar.js";

const Calendar = ({ top, header }) => {
    const { calendarDays, selectedDate, onClickDay, isSameDay } = useCalendar();

    return (
        <S.CalendarContainer $top={top}>
            <Header header={header} />
            <CalendarGrid 
                days={calendarDays} 
                selectedDate={selectedDate} 
                onClickDay={onClickDay}
                isSameDay={isSameDay}
            />
        </S.CalendarContainer>
    );
};

export default Calendar;

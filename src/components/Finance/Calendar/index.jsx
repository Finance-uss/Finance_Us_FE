import * as S from "../../../styles/Finance/Calendar/style"

const Calendar = ({
    selectedDate,
    setSelectedDate
}) => {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const isSameDay = (originDate, compareDate) => {
        if(
            originDate.year === compareDate.getFullYear() &&
            originDate.month === compareDate.getMonth() + 1 &&
            originDate.day === compareDate.getDate()
        ) {
            return true;
        }
        return false;
    };

    const onClickDay = (day) => {
        if (day && !isSameDay(selectedDate, day)) {
            setSelectedDate({ ...selectedDate, day: day.getDate() });
        }
    };

    const buildCalendarDays = () => {
        const startDay = new Date(
            selectedDate.year, 
            selectedDate.month - 1,
            1
        ).getDay();

        const endDate = new Date(
            selectedDate.year, 
            selectedDate.month, 
            0
        ).getDate();

        const days = Array.from({ length: startDay }, () => null);

        days.push(
            ...Array.from({ length: endDate }, (_, i) => 
                new Date(selectedDate.year, selectedDate.month - 1, i + 1)
            )
        );

        return days;
    };

    const buildCalendarTag = (calendarDays) => {
        return calendarDays.map((day, i) => {
            return (
                <S.DayCell
                    key={day ? day.getDate() : `empty-${i}`}
                    $isSelected={day && day.getDate() === selectedDate.day}
                    onClick={() => onClickDay(day)}
                >
                    {day ? day.getDate() : ""}
                </S.DayCell>
            );
        });
    };

    const calendarDays = buildCalendarDays();

    return (
        <S.CalendarContainer>
            <S.SummaryWrapper>
                <S.Summary>
                    지출 0원 수익 0원
                </S.Summary>
            </S.SummaryWrapper>
            <S.TableHeader>
                {daysOfWeek.map((day, i) => (
                    <S.DayHeader key={i}>
                        {day}
                    </S.DayHeader>
                ))}
            </S.TableHeader>
            <S.TableGrid>
                {calendarDays.map((day, i) => (
                    <S.DayCell
                        key={day ? day.getDate() : `empty-${i}`}
                        $isSelected={day && day.getDate() === selectedDate.day}
                        onClick={() => onClickDay(day)}
                    >
                        {day ? day.getDate() : ""}
                    </S.DayCell>
                ))}
            </S.TableGrid>
        </S.CalendarContainer>
    );
};

export default Calendar;
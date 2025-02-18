import { useDate } from "../contexts/DateContext.jsx";

export const useCalendar = () => {
    const { selectedDate, setSelectedDate } = useDate();

    const isSameDay = (originDate, compareDate) => {
        return (
            originDate.year === compareDate.getFullYear() &&
            originDate.month === compareDate.getMonth() + 1 &&
            originDate.day === compareDate.getDate()
        );
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

    const onClickDay = (day) => {
        if (day && !isSameDay(selectedDate, day)) {
            setSelectedDate({ ...selectedDate, day: day.getDate() });
        }
    };

    const calendarDays = buildCalendarDays();

    return { selectedDate, setSelectedDate, calendarDays, onClickDay, isSameDay };
};

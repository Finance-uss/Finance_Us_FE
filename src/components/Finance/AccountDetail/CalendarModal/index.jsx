import React from "react";
import * as S from "../../../../styles/Finance/HandWrite/style.js";
import { useDate } from "../../../../contexts/DateContext.jsx";
import { useAccountDetail } from "../../../../contexts/AccountDetailContext.jsx";
import Calendar from "../../Calendar/index.jsx";

const CalendarModal = () => {
    const { selectedDate } = useDate();
    const { modals } = useAccountDetail();
    if(!modals.calendarModal.isOpen) return null;

    return (
        <S.ModalOverlay onClick={modals.calendarModal.closeModal}>
            <Calendar
                top='-39px'
                header={`${selectedDate.year}년 ${selectedDate.month}월`}
            />
        </S.ModalOverlay>
    );
};

export default CalendarModal;
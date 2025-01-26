import React from "react";
import * as S from "../../../../styles/Finance/HandWrite/style.js";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";
import Calendar from "../../Calendar/index.jsx";

const CalendarModal = () => {
    const { formData, modals } = useHandWrite();
    if(!modals.calendarModal.isOpen) return null;

    return (
        <S.ModalOverlay onClick={modals.calendarModal.closeModal}>
            <Calendar
                top="-39px"
                header={`${formData.date.year}년 ${formData.date.month}월`}
            />
        </S.ModalOverlay>
    );
};

export default CalendarModal;
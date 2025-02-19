import React from "react";
import * as S from "../../../../styles/common/NavBar/DateSelector/style.js";
import CaretDown from "../../../../assets/icons/common/NavBar/CaretDown.svg";
import YearMonthModal from "./YearMonthModal/index.jsx";
import { useDate } from "../../../../contexts/DateContext.jsx";
import { useModal } from "../../../../hooks/useModal.js";

const DateSelector = ({ modalTop, position }) => {
    const { selectedDate } = useDate();
    const { isOpen, toggleModal } = useModal();

    return (
        <>
            <S.DateSelectContiner>
                <S.SelectedDateText>
                    {selectedDate.year}년 {selectedDate.month}월
                </S.SelectedDateText>
                <S.DropdownIcon 
                    src={CaretDown} 
                    alt="Caretdown Icon" 
                    onClick={toggleModal} 
                />
            </S.DateSelectContiner>
            {isOpen && <YearMonthModal modalTop={modalTop} toggleModal={toggleModal} position={position}/>}
        </>
    )
}

export default DateSelector;
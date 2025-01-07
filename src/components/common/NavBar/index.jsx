import React, { useState } from "react";
import * as S from "../../../styles/common/NavBar/style.js";
import YearMonthModal from "./YearMonthModal/index.jsx";

import CaretDownIcon from "../../../assets/icons/common/NavBar/CaretDown.svg";

const NavBar = ({ selectedDate, setSelectedDate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleYearChange = (year) => {
        setSelectedDate((prev) => ({ ...prev, year })); // 연도만 변경
    };

    const handleMonthChange = (month) => {
        setSelectedDate((prev) => ({ ...prev, month })); // 월만 변경
    };

    return (
        <>
            <S.NavBarWrapper>
                <S.SelectedDateText>
                    {selectedDate.year}년 {selectedDate.month}월 
                </S.SelectedDateText>
                <S.DropdownIcon src={CaretDownIcon} alt="Caretdown Icon" onClick={() => setIsModalOpen(!isModalOpen)}/>
            </S.NavBarWrapper>

            {isModalOpen && (
                <YearMonthModal
                    selectedDate={selectedDate}
                    onClose={() => setIsModalOpen(false)} // 모달 닫기
                    onYearChange={handleYearChange}
                    onMonthChange={handleMonthChange}
                />
            )}
            
        </>
        
    );
};

export default NavBar;

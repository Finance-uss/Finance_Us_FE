import React, { useEffect, useState } from "react";
import * as S from "../../../../../styles/common/NavBar/DateSelector/YearMonthModal/style.js";
import YearSelector from "./YearSelector/index.jsx";
import MonthSelector from "./MonthSelector/index.jsx";

const YearMonthModal = ({ toggleModal }) => {
    return (
        <S.ModalWrapper onClick={toggleModal}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <YearSelector />
                <MonthSelector />
            </S.ModalContent>
        </S.ModalWrapper>
    );
};

export default YearMonthModal;

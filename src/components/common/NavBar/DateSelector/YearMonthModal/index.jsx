import React, { useEffect, useState } from "react";
import * as S from "../../../../../styles/common/NavBar/DateSelector/YearMonthModal/style.js";
import YearSelector from "./YearSelector/index.jsx";
import MonthSelector from "./MonthSelector/index.jsx";

const YearMonthModal = ({ modalTop, toggleModal, position }) => {
    const [curModalTop, setCurModalTop] = useState(modalTop);
    
    useEffect(() => {
        const scrollY = window.scrollY;
        setCurModalTop(scrollY + modalTop);
    }, []);

    return (
        <S.ModalWrapper onClick={toggleModal}>
            <S.ModalContent $modalTop={curModalTop} onClick={(e) => e.stopPropagation()}>
                <YearSelector />
                <MonthSelector />
            </S.ModalContent>
        </S.ModalWrapper>
    );
};

export default YearMonthModal;

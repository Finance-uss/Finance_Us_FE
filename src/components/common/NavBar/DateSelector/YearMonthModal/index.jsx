import React, { useEffect, useState } from "react";
import * as S from "../../../../../styles/common/NavBar/DateSelector/YearMonthModal/style.js";
import YearSelector from "./YearSelector/index.jsx";
import MonthSelector from "./MonthSelector/index.jsx";

const YearMonthModal = ({modalTop}) => {
    const [curModalTop, setCurModalTop] = useState(modalTop);
    
    useEffect(() => {
        const scrollY = window.scrollY;
        setCurModalTop(scrollY + modalTop);
    }, []);

    return (
        <S.ModalWrapper $modalTop={curModalTop}>
            <S.ModalContent>
                <YearSelector />
                <MonthSelector />
            </S.ModalContent>
        </S.ModalWrapper>
    );
};

export default YearMonthModal;

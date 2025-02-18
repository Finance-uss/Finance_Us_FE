import React from "react";
import * as S from "../../../styles/common/NavBar2/style.js"; 
import DateRangeSelector from "./DateRangeSelector/index.jsx";

const NavBar2 = ({ marginTop, modalTop, onPeriodChange }) => {
    return (
        <S.NavBarWrapper $marginTop={marginTop}>
            <DateRangeSelector modalTop={modalTop} onPeriodChange={onPeriodChange} />
        </S.NavBarWrapper>
    );
};

export default NavBar2;

import React from "react";
import * as S from "../../../styles/common/NavBar/style.js";
import DateSelector from "./DateSelector/index.jsx";
import AlarmIcon from "./AlarmIcon/index.jsx";

const NavBar1 = ({ icon, marginTop, modalTop, onDateChange }) => {
    return (
        <S.NavBarWrapper $marginTop={marginTop}>
            <DateSelector modalTop={modalTop} onDateChange={onDateChange} />
            {icon && <AlarmIcon icon={icon} />}
        </S.NavBarWrapper>
    );
};

export default NavBar1;

import React from "react";
import * as S from "../../../styles/common/NavBar/style.js";
import DateSelector from "./DateSelector/index.jsx";
import AlarmIconComponent from "../SearchHeader/Alarm/index.jsx";

const NavBar = ({ icon, marginTop, modalTop }) => {

    return (
        <S.NavBarWrapper $marginTop={marginTop}>
            <DateSelector modalTop={modalTop}/>
            {icon && <AlarmIconComponent />}
        </S.NavBarWrapper>
    );
};

export default NavBar;


import React from "react";
import * as S from "../../../styles/common/NavBar/style.js";
import DateSelector from "./DateSelector/index.jsx";
import AlarmIconComponent from "../SearchHeader/Alarm/index.jsx";

const NavBar = ({ icon, marginTop, modalTop, position }) => {

    return (
        <>
            {position === "fixed" && <S.Blank/>}
            <S.NavBarWrapper $marginTop={marginTop} $position={position}>
                <DateSelector modalTop={modalTop} position={position}/>
                {icon && <AlarmIconComponent />}
            </S.NavBarWrapper>
        </>
    );
};

export default NavBar;


import React from "react";
import * as S from "../../../styles/common/NavBar/style.js";
import DateSelector from "./DateSelector/index.jsx";
import AlarmIconComponent from "../SearchHeader/Alarm/index.jsx";

const NavBar = ({ icon, marginTop, position }) => {

    return (
        <>
            {position === "fixed" && <S.Blank/>}
            <S.NavBarWrapper $marginTop={marginTop} $position={position}>
                <DateSelector/>
                {icon && <AlarmIconComponent />}
            </S.NavBarWrapper>
        </>
    );
};

export default NavBar;


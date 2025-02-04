import React from "react";
import * as S from "../../../styles/common/NavBar/style.js";
import DateSelector from "./DateSelector/index.jsx";
import AlarmIcon from "./AlarmIcon/index.jsx";

const NavBar = ({ icon, marginTop, modalTop }) => {

    return (
        <S.NavBarWrapper $marginTop={marginTop}>
            <DateSelector modalTop={modalTop}/>
            {icon && <AlarmIcon icon={icon} />}
        </S.NavBarWrapper>
    );
};

export default NavBar;


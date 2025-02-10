import React from "react";
import * as S from "../../../styles/common/NavBar2/style.js"; // 스타일 경로는 필요에 따라 추가
import DateRangeSelector from "./DateRangeSelector/index.jsx";

const NavBar2 = ({ marginTop }) => {
    return (
        <S.NavBarWrapper $marginTop={marginTop}>
            <DateRangeSelector />
        </S.NavBarWrapper>
    );
};

export default NavBar2;

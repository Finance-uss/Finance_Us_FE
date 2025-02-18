import React from "react";
import * as S from "../../../../styles/Finance/Calendar/style.js";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Header = ({ header }) => {
    return (
        <>
            <S.SummaryWrapper>
                <S.Summary>{header}</S.Summary>
            </S.SummaryWrapper>
            <S.TableHeader>
                {daysOfWeek.map((day, i) => (
                    <S.DayHeader key={i}>{day}</S.DayHeader>
                ))}
            </S.TableHeader>
        </>
    );
};

export default Header;
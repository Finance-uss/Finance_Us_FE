import React from "react";
import * as S from "../../../styles/Finance/Satisfaction/style";
import { Link } from "react-router-dom";
import CaretRight from "../../../assets/icons/finance/CaretRight.svg";

const Satisfaction = ({ selectedDate }) => {
    return (
        <S.SatisfactionContainer>
            <S.SatisfactionText>
                이번 달 경제 활동 만족도<br/>
                <span>★ 0.0</span>
            </S.SatisfactionText>
            <Link 
                to={{
                    pathname: "report",
                    state: { selectedDate }
                }}
            >
                <S.CaretRight 
                    src={CaretRight} 
                    alt="CaretRight"
                />
            </Link>
        </S.SatisfactionContainer>
    );
};

export default Satisfaction;

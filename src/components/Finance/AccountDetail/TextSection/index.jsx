import React from "react";
import * as S from "../../../../styles/Finance/HandWrite/style.js";
import { useAccountDetail } from "../../../../contexts/AccountDetailContext.jsx";
import InputField from "../InputField/index.jsx";

const TextSection = () => {
    const { inputFields } = useAccountDetail();

    return (
        <S.TextSection>
            {inputFields.map((field, index) => (
                <InputField key={index} {...field} />
            ))}
        </S.TextSection>
    )
}

export default TextSection;
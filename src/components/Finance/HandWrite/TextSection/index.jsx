import React from "react";
import * as S from "../../../../styles/Finance/HandWrite/style.js";
import { useHandWrite } from "../../../../contexts/HandWriteContext.jsx";
import InputField from "../InputField/index.jsx";

const TextSection = () => {
    const { inputFields } = useHandWrite();

    return (
        <S.TextSection>
            {inputFields.map((field, index) => (
                <InputField key={index} {...field} />
            ))}
        </S.TextSection>
    )
}

export default TextSection;
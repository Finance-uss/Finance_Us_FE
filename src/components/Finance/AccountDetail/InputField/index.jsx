import React from "react";
import * as S from "../../../../styles/Finance/HandWrite/style.js";

const InputField = ({ label, name, value, placeholder, readOnly, onChange, onClick }) => {
    return (
        <S.InputContainer onClick={onClick}>
            <S.Label>{label}</S.Label>
            <S.Input
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                readOnly={readOnly}
                onChange={onChange}
            />
        </S.InputContainer>
    );

};

export default InputField;
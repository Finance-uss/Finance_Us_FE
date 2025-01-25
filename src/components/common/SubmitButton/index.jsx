import React from "react";
import { SubmitButton as StyledSubmitButton } from "../../../styles/common/SubmitButton/style"; 

const SubmitButton = ({ text, onClick, customOpacity }) => {
    return (
        <StyledSubmitButton onClick={onClick} opacity={customOpacity}>
            {text}
        </StyledSubmitButton>
    );
};

export default SubmitButton; 

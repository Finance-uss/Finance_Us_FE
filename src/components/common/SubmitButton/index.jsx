import React from "react";
import { SubmitButton as StyledSubmitButton } from "../../../styles/common/SubmitButton/style"; 

const SubmitButton = ({ text, onClick }) => {
    return <StyledSubmitButton onClick={onClick}>{text}</StyledSubmitButton>; 
};

export default SubmitButton; 

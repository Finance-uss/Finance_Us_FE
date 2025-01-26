import styled from "styled-components";

export const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 32px;
`;

export const StyledInput = styled.input`
    position: absolute; 
    left: 0; 
    width: 82.45%;
    right: 10px; 
    height: 100%;
    padding: 0 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    background: var(--sub-color3, #F7F7F7);
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    opacity: 1;
`;

export const Unit = styled.span`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 16px;
    font-weight: 400;
    line-height: 10.09px;
`;

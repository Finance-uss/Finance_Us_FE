import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: calc(100% - 40px);
    height: auto;
    padding: 44px 20px 24px 20px;
`;

export const Title = styled.h1`
    font-size: 22px;
    font-weight: 700;
    line-height: 16px;
    margin: 125px 250px 40px 0px;
    letter-spacing: 0.2px;
`;

export const InputContainer = styled.div`
    display: flex; 
    align-items: center; 
    width: 100%; 
`;

export const Input = styled.input`
    flex: 1; 
    padding: 10px;
    border: none;
    border-bottom: 1px solid #d9d9d9; 
    margin-bottom: 5px;
    box-sizing: border-box;
    font-size: 16px; 
    width: 100%;

    &:focus {
        outline: none; 
    }

    &::placeholder {
        color: #b4b4b4; 
    }    
`;

export const Select = styled.select`
    width: 100%; 
    padding: 10px;
    border: none;
    border-bottom: 1px solid #d9d9d9; 
    margin-bottom: 10px;
    box-sizing: border-box; 
    font-size: 16px; 

    &:focus {
        outline: none;
    }
`;

export const Message = styled.p`
    margin: 10px 0;
    font-size: 14px;
    color: ${({ $error }) => ($error ? "#F17357" : "#142577")};
    color: ${({ $valid }) => ($valid ? "#142577" : "")}; 
`;

export const CheckButton = styled.button`
    padding: 5px; 
    width: 70px;
    background-color: #d9d9d9; 
    color: #ffffff;
    font-size: 16px;
    border: none;
    cursor: pointer;
`;
export const ButtonContainer = styled.div`
    margin-top: 40px; 
    width: 100%;
`;
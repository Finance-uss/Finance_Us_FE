import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    box-sizing: border-box; 
    padding: 20px;
`;

export const Title = styled.h1`
    margin-top: 125px; 
    margin-bottom: 40px;
    font-size: 22px;
    font-weight: 700;
    line-height: 16px; 
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
    color: black;
    width: 100%;

    &:focus {
        outline: none; 
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
    margin: 5px 0;
    font-size: 14px;
    color: ${({ $error }) => ($error ? "red" : "#142577")};
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
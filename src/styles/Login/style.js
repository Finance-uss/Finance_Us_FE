import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
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

export const Input = styled.input`
    width: 100%;
    padding: 5px;
    margin: 10px 0;
    border: none;
    border-bottom: 1px solid #d9d9d9; 
    box-sizing: border-box;

    &:focus {
        outline: none; 
    }
    &::placeholder {
        color: #b4b4b4;
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 40px; 
`;

export const LinkContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
    cursor: pointer;
    color: #b4b4b4;
`;

export const ErrorMessage = styled.p`
    color: #F17357; 
    margin: 10px 0;
    font-size: 12px; 
`;

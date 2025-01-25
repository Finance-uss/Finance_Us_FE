import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    box-sizing: border-box; 
    padding: 26px;
    color: #b4b4b4;
`;

export const Title = styled.h1`
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    letter-spacing: 0.2px;
    margin-top: 125px;
    margin-bottom: 40px;
    color: black;
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
`;

export const ButtonContainer = styled.div`
    margin-top: 40px; 
`;

export const LinkContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
    cursor: pointer;
`;

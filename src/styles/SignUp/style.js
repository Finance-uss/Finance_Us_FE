import styled from 'styled-components';

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
    margin: 125px 0 40px 0; 
    letter-spacing: 0.2px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0px; 
`;

export const Input = styled.input`
    flex: 1; 
    padding: 5px;
    border: none;
    border-bottom: 1px solid #d9d9d9; 
    outline: none;
    &::placeholder {
        color: #b4b4b4;
    } 
`;

export const VerifyButton = styled.button`
    padding: 8px 12px;
    background-color: #d9d9d9;
    color: #ffffff;
    border: none;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #142755; 
    }

    &:disabled {
        background-color: #cccccc; 
        cursor: not-allowed;
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 40px; 
`;

export const SubmitButtonStyled = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #142755;
    color: #ffffff;
    border: none;
    cursor: pointer;
    opacity: ${({ customOpacity }) => customOpacity || 1}; 
    transition: opacity 0.3s ease;

    &:disabled {
        cursor: not-allowed;
    }
`;

export const ErrorMessage = styled.p`
    color: #F17357; 
    margin: 10px 0; 
    font-size: 12px; 
`;

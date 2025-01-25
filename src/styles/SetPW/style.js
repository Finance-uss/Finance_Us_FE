import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    justify-content: center;
    padding: 10px;
`;

export const Title = styled.h1`
    font-size: 22px;
    font-weight: 700;
    margin-top: 125px; 
    align-self: flex-start; 
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Input = styled.input`
    padding: 10px;
    border: none;
    border-bottom: 1px solid #d4d4d4; 
    margin-bottom: 10px; 
    outline: none; 
    
    &:focus {
        border-color: #142755; 
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 20px; 
`;

export const Message = styled.p`
    color: ${({ $isValid }) => ($isValid ? '#142755' : 'red')}; 
    margin-top: 8px; 
    font-size: 14px; 
`;

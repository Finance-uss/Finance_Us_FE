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
    margin: 125px 250px 40px 0px;
    letter-spacing: 0.2px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;


export const Input = styled.input`
    flex: 1; 
    padding: 5px;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    outline: none;
    &:focus {
        border-bottom: 1px solid #142755;
    }
    &::placeholder {
        color: #b4b4b4; 
    } 
`;

export const ButtonContainer = styled.div`
    margin-top: 35px; 
`;

export const Message = styled.p`
    color: ${({ $isValid }) => ($isValid ? '#142755' : '#F17357')}; 
    margin: 10px 0; 
    font-size: 12px; 
`;

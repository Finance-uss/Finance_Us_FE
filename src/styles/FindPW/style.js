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
    margin: 125px 0px 40px 0px;
    letter-spacing: 0.2px;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const Input = styled.input`
    flex: 1;
    padding: 5px;
    margin: 10px 0;
    border: none;
    border-bottom: 1px solid #d9d9d9; 
    box-sizing: border-box;

    &:focus {
        outline: none; 
    }
    &::placeholder {
        color: #b4b4b4; /* placeholder 색상 설정 */
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

import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    box-sizing: border-box; 
    padding: 26px;
`;

export const Title = styled.h1`
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    letter-spacing: 0.2px;
    margin-top: 125px;
    margin-bottom: 40px;
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
`;

export const ButtonWrapper = styled.div`
    margin-top: 40px; 
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100; 
`;

export const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 0px; 
    width: 310px;
    border-radius: 15px; 
    z-index: 100; 
    text-align: center; 
    display: flex;              
    flex-direction: column;     
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 41px; 
`;

export const StyledButton = styled.button`
    background-color: #b4b4b4; 
    color: white; 
    border: none;
    border-radius: 0 0 15px 15px; 
    width: 100%; 
    height: 46px;
    cursor: pointer;

    &:hover {
        background-color: #a0a0a0; 
    }

    &:disabled {
        background-color: #d9d9d9; 
        cursor: not-allowed;
    }
`;
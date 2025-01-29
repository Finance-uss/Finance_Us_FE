import styled from "styled-components";

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
`;

export const StyledInputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    border-radius: 4px;
    border: ${(props) => (props.isError ? '1px solid #F17357;' : 'none')}; 
    padding: 0;
`;

export const StyledInput = styled.input`
    flex: 1;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: none;
    background: var(--sub-color3, #F7F7F7);
    box-shadow: ${(props) => (props.isError ? 'none' : '0px 0px 2px 0px #00000040')};
    &:focus {
        outline: none;
    }
`;

export const StyledButton = styled.button`
    width: 70px;
    height: 26px;
    position: absolute;
    right: 10px;
    border: none;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    font-size: 16px;
    color: #fff;
    background-color: ${({ disabled }) => (disabled ? '#D9D9D9' : '#142755')};
    transition: background-color 0.2s ease-in-out;
`;

import styled from 'styled-components';

export const InputContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
`;

export const StyledInputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    border-radius: 4px;
    padding: 0;
`;

export const StyledInput = styled.input`
    flex: 1;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    background: var(--sub-color3, #F7F7F7);
    border: ${(props) => (props.isError ? '1px solid #F17357;' : 'none')}; 
    box-shadow: ${(props) => (props.isError ? 'none' : '0px 0px 2px 0px #00000040')};
    &:focus {
        outline: none;
    }
`;

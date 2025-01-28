import styled from 'styled-components';

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
`;

export const StyledInput = styled.input`
    flex: 1;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: var(--sub-color3, #F7F7F7);
    box-shadow: 0px 0px 2px 0px #00000040;
`;
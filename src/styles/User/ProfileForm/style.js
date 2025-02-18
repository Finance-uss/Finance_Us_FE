import styled from 'styled-components';

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

export const Row = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Label = styled.label`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    margin-bottom: 16px;
`;

export const Input = styled.input`
    width: 100%;
    height: 32px; 
    padding: 8px;
    font-family: Pretendard;
    font-size: 16px;
    border-radius: 4px;
    opacity: 1; 
    background: var(--sub-color3, #F7F7F7);
    box-shadow: 0px 0px 2px 0px #00000040;
    border: none;
    box-sizing: border-box;
`;

export const Select = styled.select`
    width: 100%;
    height: 32px;
    padding: 8px;
    font-size: 16px; 
    border-radius: 4px;
    border: none;
    background: var(--sub-color3, #F7F7F7);
    box-shadow: 0px 0px 2px 0px #00000040;
    appearance: none; /* 기본 화살표 숨김 */
    cursor: pointer;
    overflow-y: auto;
    max-height: 150px;
`;

export const NicknameMessage = styled.p`
    font-size: 14px;
    color: ${({ isValid }) => (isValid ? '#142755' : '#F17357')};
    margin-top: 10px;
    margin-bottom: 0;
`;
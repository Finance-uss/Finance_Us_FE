import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 20px;
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
    gap: 10px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0px; /* 버튼과 입력 필드 사이 간격 */
`;

export const Input = styled.input`
    flex: 1; /* 입력 필드가 가능한 한 넓게 차지 */
    padding: 5px;
    border: none;
    border-bottom: 1px solid #d9d9d9; /* 회색 줄 */
    outline: none; /* 포커스 시 노란색 제거 */
    &:focus {
        border-bottom: 1px solid #142755; /* 포커스 시 색상 강조 */
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
    margin-top: 50px; 
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

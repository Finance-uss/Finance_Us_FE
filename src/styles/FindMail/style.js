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
    font-style: normal;
    font-weight: 700;
    line-height: 16px; 
    letter-spacing: 0.2px;
    margin-top: 125px;
    margin-bottom: 40px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 14px;
    border: none;
    border-bottom: 1px solid #d9d9d9; 
    box-sizing: border-box;

    &:focus {
        outline: none; 
    }
    &::placeholder {
        color: #b4b4b4; 
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
    cursor: pointer;
`;

// 새로 추가된 Message 컴포넌트
export const Message = styled.p`
    margin-top: 0px;
    margin-bottom: 40px;
    color: ${props => (props.$error ? 'red' : '#142755')}; 
    font-size: 12px; 
`;

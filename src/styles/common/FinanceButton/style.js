import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: flex;
    gap: 16px; 
`;

export const Button = styled.button`
    background-color: ${({ $active }) => ($active ? '#142755' : '#f0f0f0')}; 
    color: ${({ $active }) => ($active ? '#ffffff' : '#000000')}; 
    border-radius: 5px;
    height: 35px;
    border: none;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer; 
    flex: 1;

    &:hover {
        background-color: #142755; /* 마우스 오버 시 조금 더 밝은 파란색 */
    }
`;

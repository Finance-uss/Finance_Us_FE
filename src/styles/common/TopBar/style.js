import styled from 'styled-components';
// 전체 컨테이너
export const TopContainer = styled.div`
    display: flex;
    width: 100%;
    height: 48px;
    background-color: transparent;
    border-radius: 8px;
    gap: 16px;
`;

export const TopButton = styled.div`
    flex: 1;
    height: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;
    position: relative;
    padding: 0;
`;

export const LeftTopButton = styled(TopButton)`
    padding-top: 13.5px;
`

export const RightTopButton = styled(TopButton)`
    padding-top: 13.5px;
`

export const TopText = styled.span`
    font-size: 16px;
    color: ${(props) => (props.$isSelected ? '#142755' : '#818C99')};
    text-align: center;
    margin: 0;
`;

export const TopUnderline = styled.img`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%; /* 부모의 너비 */
    height: 2px; /* 굵기 고정 */
    background-color: #142755; /* 밑줄 색상 */
`;
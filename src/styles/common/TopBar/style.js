import styled from 'styled-components';

// 전체 컨테이너
export const TopContainer = styled.div`
    display: flex;
    width: 353px;
    height: 48px;
    background-color: transparent;
    border-radius: 8px;
`;

export const TopButton = styled.div`
    flex: 0 0 176.5px;
    height: 48px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    cursor: pointer;
    background-color: transparent;
    position: relative;
    box-sizing: border-box;
`;

export const LeftTopButton = styled(TopButton)`
    padding-top: 13.5px;
    padding-left: 56px;
`;

export const RightTopButton = styled(TopButton)`
    padding-top: 13.5px;
    padding-left: 78.5px;
`;

export const TopText = styled.span`
    font-size: 16px;
    color: ${({ $isSelected }) => ($isSelected ? '#142755' : '#818C99')}; // isSelected를 $isSelected로 변경
    text-align: center;
    margin: 0;
`;

export const TopUnderline = styled.img`
    position: absolute;
    bottom: 4.5px;
    width: 169px;
    margin: 0;
    padding: 0;
`;

export const LeftTopUnderline = styled(TopUnderline)`
    left: 0px;
`;

export const RightTopUnderline = styled(TopUnderline)`
    left: 8.5px;
`;

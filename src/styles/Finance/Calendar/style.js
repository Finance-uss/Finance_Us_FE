import styled from 'styled-components';

export const CalendarContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 77%;
    height: auto;
    top: 176px;
    gap: 20px;
    border-radius: 8px;
    padding: 24px;
    background: var(--sub-color3, #F7F7F7);
    text-align: center;
    box-shadow: 0px 0px 3px 0px #00000040;
`;

export const SummaryWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
    justify-items: center; /* ✅ 내부 요소 가로 정렬 */
`;

export const Summary = styled.div`
    width: 30px;
    font-size: 16px;
    font-weight: 600;
    line-height: 14px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    white-space: nowrap; /* ✅ 줄바꿈 방지 */
`;

export const TableHeader = styled.div` 
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
    justify-items: center; /* ✅ 내부 요소 가로 정렬 */
`;

export const TableGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 7열 */
    width: 100%;
    justify-items: center; /* ✅ 내부 요소 가로 정렬 */
`;

export const DayHeader = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 1.5px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: #B4B4B4;
`;

export const DayCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    width: 30px;
    height: 30px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.2s;
    color: ${({ $isSelected }) => ($isSelected ? "white" : "#333")};
    
    ${({ $isSelected }) => $isSelected && `
        background-color: #5C5C5C;
    `}

    &:hover {
        background-color: #ddd;
    }
`;
import styled from 'styled-components';

export const HighlightContainer = styled.div`
    width: 353px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0px;
    border-radius: 5px;
    background: var(--sub-color3, #F7F7F7);
    box-shadow: 0px 0px 3px 0px #00000040;
    margin-bottom: 20px;
`;

export const Label = styled.span`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-bottom: 10px;
    padding-left: 16px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 16px;
`;

export const AmountInput = styled.input`
    width: 92px;
    height: 26px;
    border-radius: 5px;
    background: #FFFFFF;
    box-shadow: 0px 0px 2px 0px #00000040;
    border: none;
    font-family: Pretendard;
    font-size: 14px;
`;

export const IndicatorText = styled.span`
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
`;

export const ColorIndicatorWrapper = styled.div`
    position: relative; /* ColorPick 위치를 설정하기 위한 기준 */
`;

export const ColorIndicator = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #FFD700;
    cursor: pointer;
`;

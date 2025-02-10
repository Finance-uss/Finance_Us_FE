import styled from 'styled-components';

export const HighlightContainer = styled.div`
    width: 100%;
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
    position: relative;
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

export const ColorIndicator = styled.label`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ color }) => color};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const ColorPickerContainer = styled.div`
    position: absolute; 
    top: 100%;
    left: 50%;
    transform: translate(-50%, 20px);
    background: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 100;
    padding: 16px;
    width: 230px;
    max-height: 363px;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    * {
        font-family: Pretendard, sans-serif !important;
        color: #000 !important;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 24px;
        height: 24px;
        fill: #aaa;
        transition: fill 0.2s ease-in-out;
    }
`;
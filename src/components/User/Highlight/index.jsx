import React, { useState } from 'react';
import { HighlightContainer, Label, Content, AmountInput, IndicatorText, ColorIndicator, ColorIndicatorWrapper } from '../../../styles/User/Highlight/style';
import ColorPick from '../ColorPick';

const AmountHighlight = ({ label, onColorChange }) => {
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
    const [color, setColor] = useState('#FFD700'); // 기본 색상

    const handleIndicatorClick = () => {
        setIsColorPickerVisible(!isColorPickerVisible); // ColorPicker 표시/숨기기
    };

    const handleColorChange = (newColor) => {
        setColor(newColor); // Indicator 색상 변경
        setIsColorPickerVisible(false); // ColorPicker 숨기기
    };

    return (
        <HighlightContainer>
            <Label>{label}</Label>
            <Content>
                <AmountInput type="number" />
                <IndicatorText>원 이상일 때, </IndicatorText>
                <ColorIndicatorWrapper>
                    <ColorIndicator
                        style={{ backgroundColor: color }}
                        onClick={handleIndicatorClick}
                    />
                    {isColorPickerVisible && (
                        <ColorPick defaultColor={color} onColorChange={handleColorChange} />
                    )}
                </ColorIndicatorWrapper>
                <IndicatorText>표시</IndicatorText>
            </Content>
        </HighlightContainer>
    );
};

export default AmountHighlight;

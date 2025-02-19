import React, { useState, useRef } from 'react';
import { HighlightContainer, Label, Content, AmountInput, IndicatorText, ColorIndicator, ColorPickerContainer, CloseButton } from '../../../styles/User/Highlight/style';
import { ChromePicker } from 'react-color';
import CloseIcon from '../../../assets/icons/common/X.svg';

const AmountHighlight = ({ label, amount, selectedColor, onColorChange, onAmountChange }) => {
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const highlightRef = useRef(null);

    // 색상 원 클릭 시 컬러 피커 토글
    const handleColorIndicatorClick = () => {
        setIsPickerVisible((prev) => !prev);
    };

    // 색상 변경
    const handleColorChange = (color) => {
        onColorChange(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
    };

    return (
        <div ref={highlightRef}>
            <HighlightContainer>
                <Label>{label}</Label>
                <Content>
                    <AmountInput 
                        type="number"
                        value={amount}
                        onChange={(e) => onAmountChange(e.target.value)}
                    />
                    <IndicatorText>원 이상일 때,</IndicatorText>

                    {/* 색상 원을 클릭하면 컬러 피커가 뜨도록 설정 */}
                    <ColorIndicator color={selectedColor} onClick={handleColorIndicatorClick} />

                    <IndicatorText>표시</IndicatorText>
                </Content>
            </HighlightContainer>

            {/* 컬러 피커 UI */}
            {isPickerVisible && (
                <ColorPickerContainer>
                    <CloseButton onClick={() => setIsPickerVisible(false)}>
                        <img src={CloseIcon} alt="닫기" />
                    </CloseButton>
                    <ChromePicker color={selectedColor} onChange={handleColorChange} disableAlpha={false} />
                </ColorPickerContainer>
            )}
        </div>
    );
};

export default AmountHighlight;

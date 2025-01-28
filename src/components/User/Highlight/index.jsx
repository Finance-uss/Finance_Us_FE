import React, { useState } from 'react';
import { HighlightContainer, Label, Content, AmountInput, IndicatorText, ColorIndicator, ColorIndicatorWrapper, PopupContainer } from '../../../styles/User/Highlight/style';
import ColorPick from '../ColorPick';

const AmountHighlight = ({ label, isActive, onColorIndicatorClick, onColorChange }) => {
    return (
        <HighlightContainer>
            <Label>{label}</Label>
            <Content>
                <AmountInput type="number" />
                <IndicatorText>원 이상일 때, </IndicatorText>
                <ColorIndicatorWrapper>
                    <ColorIndicator onClick={onColorIndicatorClick} />
                </ColorIndicatorWrapper>
                <IndicatorText>표시</IndicatorText>
            </Content>
            {isActive && (
                <PopupContainer>
                    <ColorPick onColorChange={onColorChange} />
                </PopupContainer>
            )}
        </HighlightContainer>
    );
};

export default AmountHighlight;

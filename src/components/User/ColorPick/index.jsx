import React, { useState } from 'react';
import { PickerContainer, ColorInput, Slider } from '../../../styles/User/ColorPick/style';

const ColorPick = ({ defaultColor, onColorChange }) => {
    const [color, setColor] = useState(defaultColor || '#8396C3');
    const [opacity, setOpacity] = useState(100);

    const handleColorChange = (e) => {
        setColor(e.target.value);
        if (onColorChange) {
            onColorChange(e.target.value);
        }
    };

    const handleOpacityChange = (e) => {
        setOpacity(e.target.value);
    };

    return (
        <PickerContainer>
            <ColorInput type="color" value={color} onChange={handleColorChange} />
            <Slider
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={handleOpacityChange}
            />
            <div>{color}</div>
            <div>{opacity}%</div>
        </PickerContainer>
    );
};

export default ColorPick;

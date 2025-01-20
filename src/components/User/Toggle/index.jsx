import React from 'react';
import { ToggleLabel, StyledToggleInput, Slider } from '../../../styles/User/Toggle/style';

const Toggle = ({ id, onChange, checked }) => {
    return (
        <ToggleLabel htmlFor={id} className="switch">
            <StyledToggleInput 
                type="checkbox" 
                id={id} 
                onChange={onChange} 
                checked={checked} // 체크 상태 반영
            />
            <Slider className="slider" />
        </ToggleLabel>
    );
};

export default Toggle;

import styled from 'styled-components';

export const PickerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
`;

export const ColorInput = styled.input`
    width: 100%;
    height: 40px;
    margin-bottom: 16px;
    border: none;
    cursor: pointer;
`;

export const Slider = styled.input`
    width: 100%;
    margin: 8px 0;
`;

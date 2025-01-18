import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
`;

export const Title = styled.h1`
    margin-top: 125px;
    font-size: 22px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.2px; 
`;

export const Input = styled.input`
    width: 100%; /* 100%로 설정하여 부모 요소의 너비에 맞춤 */
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box; /* padding과 border를 포함하여 너비 계산 */
`;

export const Select = styled.select`
    width: 100%; /* 100%로 설정하여 부모 요소의 너비에 맞춤 */
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box; /* padding과 border를 포함하여 너비 계산 */
`;

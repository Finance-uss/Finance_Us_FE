import styled from "styled-components";

export const Container = styled.div`
    width: 353px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.div`
    font-size: 18px;
    font-weight: 700;
`;

export const EditableInput = styled.input`
    font-size: 18px;
    font-weight: 700;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    width: 100%;
    padding: 2px 4px;
`;

export const CloseIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-weight: bold; 
    outline: none; 
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px 10px; 
`;

export const ButtonBox = styled.div`
    width: calc((100% - 20px) / 3);
    flex-shrink: 0;
`;
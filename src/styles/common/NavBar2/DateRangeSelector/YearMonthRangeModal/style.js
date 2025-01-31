import styled, { css } from "styled-components";

export const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: calc(100% - 75px);
    top: ${(props) => props.$modalTop || "40px"};
    left: 0;
`;

export const ModalContent = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column; /* 수직 방향으로 정렬 */
    background: #F7F7F7;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    box-shadow: 0px 0px 3px 0px #00000040;

    &::before {
        content: "";
        position: absolute;
        top: 43%;
        width: 80%;
        height: 0.5px;
        background: #5C5C5C; 
    }

    &::after {
        content: "";
        position: absolute;
        top: 55%;
        width: 80%;
        height: 0.5px;
        background: #5C5C5C;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px; /* 버튼과 아래 요소 간격 */
`;

export const Button = styled.button.attrs(props => ({
    style: {
        fontWeight: props.isSelected ? 'bold' : 'normal'
    }
}))`
    margin-right: 10px;
    cursor: pointer;
    border: none; 
    background: none; 

    ${(props) =>
        props.isSelected &&
        css`
            font-weight: bold;
        `}

    &:last-child {
        margin-right: 0; 
    }

    &:focus {
        outline: none; 
    }
`;

export const ViewButton = styled.button`
    margin-top: 20px; 
    cursor: pointer;
    border: none; 
    background: none; 

    &:focus {
        outline: none; 
`;

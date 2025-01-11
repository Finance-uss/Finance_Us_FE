import styled from "styled-components";

export const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 206px;
    
`;

export const ModalContent = styled.div`
    display: flex;
    background: #F7F7F7;
    justify-content: center;
    align-items: center;
    width: 87%;
    height: 100%;
    border-radius: 8px;
    z-index: 1000;

    /* 상단 수평선 */
    &::before {
        content: "";
        position: absolute;
        top: 42%;
        width: 80%;
        height: 0.5px;
        background: #5C5C5C; /* 연한 회색 */ 
    }

    /* 하단 수평선 */
    &::after {
        content: "";
        position: absolute;
        top: 57%;
        width: 80%;
        height: 0.5px;
        background: #5C5C5C;
    }
`;
import styled from "styled-components";

export const ModalWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    top: 24px;
    left: 0;
`;

export const ModalContent = styled.div`
    position: relative;
    display: flex;
    background: #F7F7F7;
    justify-content: center;
    align-items: center;
    width: calc(100% - 40px);
    height: 207px;
    top: 10px;
    border-radius: 8px;
    box-shadow: 0px 0px 3px 0px #00000040;

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
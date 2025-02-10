import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    width: 310px;
    height: 147px;
    background: #FFFFFF;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Message = styled.p`
    font-size: 16px;
    color: #000;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    height: 46px;
    border-top: 1px solid #ddd;
    overflow: hidden;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

    ${({ singleButton }) =>
        singleButton &&
        `
        justify-content: center;
        button {
            width: 100%;
            border-radius: 0 0 15px 15px;
        }
    `}
`;

export const Button = styled.button`
    flex: 1;
    height: 100%;
    font-size: 14px;
    background: #B4B4B4;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #142755;
    }
`;

export const CancelButton = styled(Button)`
    border-right: 1px solid #ddd;
`;
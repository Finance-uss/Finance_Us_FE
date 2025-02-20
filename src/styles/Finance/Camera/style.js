import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
`;

export const Video = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; /* 크롭 방지 */
    background: black; /* 빈 공간을 검은색으로 */
`;

export const CaptureButton = styled.button`
    position: absolute;
    top: 85%;
    left: 50%;
    padding: 0px;
    transform: translateX(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const CloseButton = styled.button`
    position: absolute;
    width: 32px;
    height: 32px;
    padding: 0px;
    top: 0px;
    right: 5%;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const CloseImage = styled.img`
    width: 32px;
    height: 32px;
`;

export const CapturedImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: black;
    transition: opacity 0.5s ease-in-out; 
`;

export const ButtonContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 85%;
    width: 100%;
    height: 72px;
`;

export const Button1 = styled.button`
    position: relative;
    width: 50%;
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    line-height: 16px;
`;

export const Button2 = styled.button`
    position: relative;
    width: 50%;
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    line-height: 16px;
`;
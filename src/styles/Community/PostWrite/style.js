import styled from 'styled-components';

export const Container = styled.div`
    flex-direction: column;
    width: calc(100% - 40px);
    // height: auto;
    padding: 44px 20px 100px 20px; // top right bottom left
    gap: 20px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top:20px;
`;

export const Title = styled.input`
    width: 100%;
    font-size: 16px;
    border: 0px solid #b4b4b4;
    border-radius: 4px;
    outline: none;
    font-family: 'Pretendard', sans-serif; 

    ::placeholder {
        color: #b4b4b4;

        font-family: 'Pretendard', sans-serif; 
    }
`;

export const Content = styled.textarea`
    width: 100%;
    height:460px;
    font-size: 16px;
    border: 0px solid #b4b4b4;
    font-weight:500;
    border-radius: 4px;
    outline: none;
    resize: none;
    font-family: 'Pretendard', sans-serif; 
    
    ::placeholder {
        font-weight:500;
        font-family: 'Pretendard', sans-serif; 
        color: #b4b4b4;
    }
`;

export const Line = styled.div`
    width: 100%;
    height: 1px;
    margin-top:  16px;
    margin-bottom:16px;
    background-color: #b4b4b4;
`;

export const CameraButton = styled.img`
    width: 32px;
    height: 32px;
    top: 100%;
    margin-bottom:16px;
`;
export const ImagePreview = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
    margin-bottom:16px;
`;
export const Footer = styled.div`
    position: fixed;
    bottom: 0;
    width: calc(100% - 40px);
    margin-bottom:20px;
`;

export const DeleteButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #F17357;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 12px;

    &:hover {
        background-color: #F17357;
    }
`;

export const ImagePreviewWrapper = styled.div`
    position: relative;
    display: inline-block;
`;
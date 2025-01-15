import styled from 'styled-components';
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    font-family: 'Pretendard', sans-serif;  
    position: relative;
`;

export const Title = styled.input`
    width: 100%;
    margin-top: 10px;
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
    font-size: 16px;
    border: 0px solid #b4b4b4;
    font-weight:500;
    border-radius: 4px;
    outline: none;
    resize: none;
    height: 460px;
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
    background-color: #b4b4b4;
`;

export const CameraButton = styled.img`
    width: 32px;
    height: 32px;
    position: relative;
    top: 100%;
    left: 18px;
    transform: translateY(-20%);
`;

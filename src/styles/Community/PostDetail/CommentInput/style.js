import styled from 'styled-components';
export const CommentInputContainer = styled.div`
    display: flex;
    align-items: center;
    width:calc(100% - 40px);
    justify-content: space-between;
    background-color:#f7f7f7;
    padding:12px 20px;
    position:fixed;
    bottom:77px;
    left:0px;
    
`;

export const CommentInputBar = styled.input`
    font-size: 16px;
    border: none;
    background-color:#f7f7f7;
    width: 100%;
    height:16px;
    box-sizing: border-box;

    &:placeholder {
        color:#B4B4B4;
    }
`;

export const SubmitButton = styled.img`
    width:24px;
    height:16px;
    cursor: pointer;
    float:right;
`;
export const ReplyTo = styled.div`
    color:#5c5c5c;
`;
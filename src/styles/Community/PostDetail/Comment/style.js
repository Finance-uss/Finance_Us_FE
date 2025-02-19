import styled from 'styled-components';
export const CommentListContainer = styled.div`
    width: 100%;
    border-bottom: 0.5px solid #D7D8D9;
    margin-top: 16px;
    flex-direction: column;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between; 
    width: 100%;

`;

export const User = styled.div`
    align-items: center;
    display: flex;
`;

export const Active = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 6px;
`;

export const UserIcon = styled.img`
    width: 40px;
    height: 40px;
    border: none;
    margin-right: 7.1px;
    border-radius:50%;
`;

export const UserWrapper = styled.div`
    flex-direction: column;
`;

export const UserName = styled.div`
    font-size: 14px;
    font-weight: 500;
`;

export const CommentDate = styled.div`
    font-size: 12px;
    font-weight: 400;
    color: #b4b4b4;
`;

export const Recomment = styled.div`
    display: flex;
    align-items: center;
`;

export const RecommentIcon = styled.img`
    width: 14px;
    height: 14px;
    margin-right: 2px;
`;

export const RecommentText = styled.div`
    font-size: 14px;
    color: #5c5c5c;
`;

export const Likes = styled.div`
    display: flex;
    align-items: center;
`;

export const LikeIcon = styled.img`
    width: 14px;
    height: 14px;
    margin-right: 2px;
`;

export const LikeCount = styled.div`
    font-size: 14px;
    color: #5c5c5c;
`;

export const MoreIcon = styled.img`
    width: 2.7px;
    height: 13px;
`;

export const CommentText = styled.div`
    font-size: 16px;
    margin-top:12px;
    margin-bottom: 12px;
    width: 100%;
`;

export const Replies = styled.div`
  padding-left: 46px;
`;

export const Reply = styled.div`
  margin-bottom: 12px;
`;

export const CheckIcon = styled.img`
    width:20px;
    height:20px;
`;

export const UserContainer = styled.div`    
    display:flex;
    align-items:center;
`;
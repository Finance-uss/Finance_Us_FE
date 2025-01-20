import styled from 'styled-components';

export const ProfileContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 20px auto;
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 16px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-start;  
  flex-grow: 1;
//   height: 46px;
`;

export const ProfileName = styled.div`
    position:relative;
    font-size: 16px;
    line-height:16px;
    font-weight: 500;
    margin-top:5px;
`;

export const StateMessage = styled.div`
    font-size: 14px;
    line-height:14px;
    font-weight: 400;
    margin-top:7px;
    margin-bottom:4px;
`;

export const FollowButton = styled.button`
    width: 61px;
    height: 26px;
    background-color: ${(props) => (props.followed ? "#d9d9d9" : "#142755")};
    color: #ffffff;
    border: none;
    cursor:pointer;
    margin-left: auto; 
`;

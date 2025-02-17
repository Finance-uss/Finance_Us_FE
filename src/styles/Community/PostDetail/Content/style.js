import styled from "styled-components";


export const PageContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
`;
export const CheckIcon = styled.img`
  width:24px;
  height:24px;
`;
export const PostConatiner = styled.div`
  padding:16px;
  border-radius:10px;
  box-shadow: 0px 0px 2px 0px #00000040;
  box-sizing: border-box;
  position:relative;
`;
export const Header = styled.div`
  margin-bottom:16px;

`;

export const TitleContainer = styled.div`
  widht:100%;
  margin-bottom:6px;
`;

export const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: #000000;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items:center;
`;

export const UserIcon = styled.img`
  border-radius:50%;
  width:24px;
  height:24px;
`;

export const User = styled.div`
    font-size: 16px;
    margin-left:7.1px;
`;

export const Date = styled.div`
    font-size: 12px;
    color:#b4b4b4;
`;

export const Profile = styled.div`
  display:flex;
  align-items:center;
`;

export const PostContent = styled.div`
  
`;

export const PostText = styled.div`
  font-size: 16px;
  font-weight:500;
  color: #000000;
  line-height: 20px;
  margin-bottom:16px;
`;

export const PostImage = styled.img`
  width: 100%;
  // height:213px;
  object-fit: cover;
  height: auto;
  margin-bottom:16px;
`;

export const Stats = styled.div`
  display: flex;
  width:100%;
    justify-content:space-between;

  // justify-content: flex-start;
  align-items: center;
`;
export const StateContainer = styled.div`
  display:flex;
  justify-content:space-between;
`;
export const Stat = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15.6px;
`;
export const MoreIcon = styled.img`
  width: 2.7px;
  height: 13px;
  float:right;
`;
export const StatIcon = styled.img`
  width: 13px;
  height: 13px;
`;
export const BookMark = styled.img`
  width:23px;
  height:23px;
  position:absolute;
  bottom: 16px; 
  right: 16px;
`;
export const StatText = styled.span`
  font-size: 14px;
  color: #b4b4b4;
`;



export const Menu = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 100;
`;

export const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color:#5C5C5C;
`;
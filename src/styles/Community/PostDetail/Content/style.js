import styled from "styled-components";


export const PageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  padding-bottom: 6 0px;
`;

export const PostConatiner = styled.div`
  border-radius:10px;
  box-shadow: 0px 0px 2px 0px #00000040;
  box-sizing: border-box;
`;
export const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #000000;
`;

export const AuthorInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #757575;
`;

export const PostContent = styled.div`
  padding: 16px;
`;

export const PostText = styled.p`
  font-size: 16px;
  color: #000000;
  line-height: 1.5;
  margin-bottom: 16px;
`;

export const PostImage = styled.img`
  width: 100%;
  height:213px;
  object-fit: cover;
//   height: auto;
  border-radius: 8px;
  margin-top: 8px;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const StatIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

export const StatText = styled.span`
  font-size: 14px;
  color: #b4b4b4;
`;

export const UserIcon = styled.img`
  border-radius:50%;
  width:24px;
  height:24px;
`;
export const User = styled.div`
    font-size: 14px;
`;
export const Date = styled.div`
    font-size: 12px;
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
  &:hover {
    background-color: #f2f2f2;
  }
`;
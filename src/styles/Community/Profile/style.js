import styled from 'styled-components';

export const ProfileContainer = styled.div`
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin-right: 31px;
`;

export const ProfileImage = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%; 
  object-fit: cover;
`;

export const ProfileName = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: #000000;
  text-align:center;
`;

import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

export const ProfileImage = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%; 
//   border: 1px solid #000000;
  object-fit: cover;
`;

export const ProfileName = styled.span`
  margin-top: 8px;
  font-size: 16px;
  color: #000000;
`;

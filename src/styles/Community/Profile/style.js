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
  margin-top: 3px;
  font-size: 16px;
  color: ${(props) => (props.isAdd ? '#b4b4b4' : '#000000')};
  text-align:center;
  font-weight: 400;
  line-height: 150%;
`;

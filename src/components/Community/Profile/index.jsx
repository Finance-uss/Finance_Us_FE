import React from 'react';
import { ProfileContainer, ProfileImage, ProfileName } from '../../../styles/Community/Profile/style';
import { useNavigate } from 'react-router-dom';

const Profile = ({ image, name }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/community/followfinance/${name}`);
};
  return (
    <ProfileContainer onClick={handleClick} style={{ cursor: 'pointer' }}>
      <ProfileImage src={image} alt={`${name}`} />
      <ProfileName>{name}</ProfileName>
    </ProfileContainer>
  );
};

export default Profile;

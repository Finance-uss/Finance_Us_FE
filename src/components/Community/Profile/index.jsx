import React from 'react';
import { ProfileContainer, ProfileImage, ProfileName } from '../../../styles/Community/Profile/style';

const Profile = ({ image, name }) => {
  return (
    <ProfileContainer>
      <ProfileImage src={image} alt={`${name}`} />
      <ProfileName>{name}</ProfileName>
    </ProfileContainer>
  );
};

export default Profile;

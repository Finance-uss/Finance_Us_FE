import React from 'react';
import { ProfileContainer, ProfileImage, ProfileName } from '../../../styles/Community/Profile/style';
import { useNavigate } from 'react-router-dom';

const Profile = ({ image, name, followingId }) => {  
  const navigate = useNavigate();
  const handleClick = () => {
    if (name === "친구 추가") {
      navigate(`/search`);
    } else {
      if (!followingId) {
        console.error("followingId가 없습니다.", { name, followingId });
        return;
      }
      navigate(`/community/followfinance/${followingId}`); 
    }
  };
  return (
    <ProfileContainer onClick={handleClick} style={{ cursor: 'pointer' }}>
      <ProfileImage src={image} alt={`${name}`} />
      <ProfileName isAdd={name === "친구 추가"}>{name}</ProfileName>
    </ProfileContainer>
  );
};

export default Profile;

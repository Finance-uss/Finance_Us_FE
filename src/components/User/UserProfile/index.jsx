import React from 'react';
import {
  ProfileContainer,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileAgeJob,
  ProfileIntro,
} from '../../../styles/User/UserProfile/style';
import profileImage from '../../../assets/icons/common/User/profile.svg';

const UserProfile = () => {
  const profileData = {
    image: profileImage,
    name: "김우원",
    age: "20대",
    job: "대학생",
    intro: "멍청소비 그만!",
  };

  return (
    <ProfileContainer>
      <ProfileImage src={profileData.image} alt="Profile" />
      <ProfileInfo>
        <ProfileName>{profileData.name}</ProfileName>
        <ProfileAgeJob>
          <span>{profileData.age}</span>
          <span>{profileData.job}</span>
        </ProfileAgeJob>
        <ProfileIntro>{profileData.intro}</ProfileIntro>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default UserProfile;

import React, { useState, useEffect } from "react";
import { ProfileContainer, ProfileText } from "../../../styles/User/ChangeProfile/style";
import ProfileImageUploader from "../../../components/User/UserProfile/ProfileImageUploader";

const ChangeProfile = ({ imgUrl, imageName, onImageSelect }) => {
  const [profileImage, setProfileImage] = useState(imgUrl);
  const [profileImageName, setProfileImageName] = useState(imageName);

  useEffect(() => {
    setProfileImage(imgUrl);
    setProfileImageName(imageName);
  }, [imgUrl, imageName]);

  const handleImageUpdate = (newImageUrl, newImageName) => {
    setProfileImage(newImageUrl);
    setProfileImageName(newImageName);
    if (onImageSelect) {
      onImageSelect(newImageUrl, newImageName); // 🔥 부모에 전달
    }
  };

  return (
    <ProfileContainer>
      <ProfileText>프로필 사진</ProfileText>
      <ProfileImageUploader imgUrl={profileImage} imageName={profileImageName} onUpdateImage={handleImageUpdate} />
    </ProfileContainer>
  );
};

export default ChangeProfile;

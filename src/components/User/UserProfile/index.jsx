import React, { useEffect, useState }from 'react';
import axiosInstance from "../../../api/axiosInstance";
import {
  ProfileContainer,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileAgeJob,
  ProfileIntro,
} from '../../../styles/User/UserProfile/style';
import ProfileImageUploader from "./ProfileImageUploader"

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    ageGroup: '',
    jobCategory: '',
    one_liner: '',
    imgUrl: ''
  });

  useEffect(() => {
    const fetchProfileData = async () => {
        try {
            const token = localStorage.getItem("token"); // Bearer 토큰 가져오기
            if (!token) {
                throw new Error("토큰이 없습니다.");
            }

            const response = await axiosInstance.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("회원 정보 조회: ", response);

            if (response.data.isSuccess) {
                setProfileData(response.data.result);
            }
        } catch (error) {
            console.error('회원 정보 조회 실패:', error);
        }
    };

    fetchProfileData();
  }, []);

  const handleImageUpdate = (newImageUrl) => {
    setProfileData((prev) => ({
      ...prev,
      imgUrl: newImageUrl,
    }));
  };

  return (
    <ProfileContainer>
     <ProfileImageUploader imgUrl={profileData.imgUrl} onUpdateImage={handleImageUpdate} />
      <ProfileInfo>
        <ProfileName>{profileData.name}</ProfileName>
        <ProfileAgeJob>
          <span>{profileData.age}</span>
          <span>{profileData.job}</span>
        </ProfileAgeJob>
        <ProfileIntro>{profileData.one_liner || "한 줄 소개 없음"}</ProfileIntro>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default UserProfile;

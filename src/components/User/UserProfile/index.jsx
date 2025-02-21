import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import axiosInstance from "../../../api/axiosInstance";
import {
  ProfileContainer,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileAgeJob,
  ProfileIntro,
  VerifiedBadge,
  ProfileNameWrapper
} from '../../../styles/User/UserProfile/style';
import profileImage from '../../../assets/icons/common/User/profile.svg';
import verifiedBadgeIcon from '../../../assets/icons/common/User/CheckCircle.svg';
import defaultImage from "../../../assets/icons/common/Community/commentProfile.svg";


const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    ageGroup: '',
    jobCategory: '',
    one_liner: '',
    imgUrl: ''
  });


  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const updatedProfile = location.state?.updatedProfile || null;

  const fetchProfileData = async () => {
      try {
          const token = localStorage.getItem("token"); 
          if (!token) throw new Error("토큰이 없습니다.");

          const response = await axiosInstance.get('/api/user', {
              headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.isSuccess) {
              setProfileData(response.data.result);
          }

          const authResponse = await axiosInstance.get('/api/auth/user', {
              headers: { Authorization: `Bearer ${token}` },
          });

          if (authResponse.data.isSuccess && authResponse.data.result === "인증된 사용자입니다.") {
              setIsVerified(true);
          }
      } catch (error) {
          console.error('회원 정보 조회 실패:', error);
      }
  };

  useEffect(() => {
    fetchProfileData();
  }, [updatedProfile]);

  return (
    <ProfileContainer>
     <ProfileImage src={profileData.imgUrl || defaultImage} alt="Profile" />
      <ProfileInfo>
        <ProfileNameWrapper>
          <ProfileName>{profileData.name}</ProfileName>
          {isVerified && <VerifiedBadge src={verifiedBadgeIcon} alt="인증된 사용자" />}
        </ProfileNameWrapper>
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

import React, { useState } from "react";
import * as S from '../../../../styles/Community/SearchProfile/style';
import defaultImage from '../../../../assets/icons/common/Community/defaultProfile.svg';
import { followUser, unfollowUser } from "../../../../api/apiFollow";
import { useAuth } from "../../../../contexts/AuthContext";

const SearchProfile = ({ profiles = [] }) => {
  const { formData } = useAuth();
  const accessToken = formData.token;

   const [followStates, setFollowStates] = useState(
    profiles.map(profile => profile.isFollowing) 
  );

  const toggleFollow = async (index, userId) => {
    try {
      if (!accessToken) {
        console.error("로그인이 필요합니다.");
        return;
      }

      if (followStates[index]) {
        await unfollowUser(accessToken, userId);
      } else {
        await followUser(accessToken, userId);
      }

      setFollowStates(prev =>
        prev.map((state, idx) => (idx === index ? !state : state))
      );
    } catch (error) {
      console.error("팔로우/언팔로우 요청 실패:", error);
    }
  };
  return (
    <>
      {profiles.map((profile, index) => (
          <S.ProfileContainer key={profile.id}>
            <S.ProfileImage
              src={profile.image || defaultImage}
              alt={`${profile.name}`}
            />
            <S.TextContainer>
              <S.ProfileName>{profile.name}</S.ProfileName>
              <S.StateMessage>{profile.message}</S.StateMessage>
            </S.TextContainer>
            <S.FollowButton
              followed={followStates[index]}
              onClick={() => toggleFollow(index,profile.id)}
            >
              {followStates[index] ? "팔로잉" : "팔로우"}
            </S.FollowButton>
          </S.ProfileContainer>
        ))}
    </>
  );
};

export default SearchProfile;

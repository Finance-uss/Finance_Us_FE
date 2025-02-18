import React, { useState } from "react";
import * as S from '../../../../styles/Community/SearchProfile/style';
import defaultImage from '../../../../assets/icons/common/Community/defaultProfile.svg';
import { followUser, unfollowUser } from "../../../../api/followAPI";


const SearchProfile = ({ profiles = [] }) => {
   const [followStates, setFollowStates] = useState(
    profiles.map(profile => profile.isFollowing) 
  );

  const toggleFollow = async (index, userId) => {
    try {
      
      if (followStates[index]) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
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
          <S.ProfileContainer key={profile.userId}>
            <S.ProfileImage
              src={profile.profileImageUrl || defaultImage}
              alt={`${profile.username}`}
            />
            <S.TextContainer>
              <S.ProfileName>{profile.username}</S.ProfileName>
              <S.StateMessage>{profile.one_liner}</S.StateMessage>
            </S.TextContainer>
            <S.FollowButton
              followed={followStates[index]}
              onClick={() => toggleFollow(index,profile.userId)}
            >
              {followStates[index] ? "팔로잉" : "팔로우"}
            </S.FollowButton>
          </S.ProfileContainer>
        ))}
    </>
  );
};

export default SearchProfile;

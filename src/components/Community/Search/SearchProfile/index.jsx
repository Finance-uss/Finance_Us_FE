import React, { useState } from "react";
import * as S from '../../../../styles/Community/SearchProfile/style';
import defaultImage from '../../../../assets/icons/common/Community/defaultProfile.svg';

const SearchProfile = ({ profiles = [] }) => {
  const [followStates, setFollowStates] = useState(
    profiles.map(() => false)
  );

  const toggleFollow = (index) => {
    setFollowStates((prev) =>
      prev.map((state, idx) => (idx === index ? !state : state))
    );
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
              onClick={() => toggleFollow(index)}
            >
              {followStates[index] ? "팔로잉" : "팔로우"}
            </S.FollowButton>
          </S.ProfileContainer>
        ))}
    </>
  );
};

export default SearchProfile;

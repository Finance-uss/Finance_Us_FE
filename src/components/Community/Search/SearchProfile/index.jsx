import React, { useState } from "react";
import * as S from '../../../../styles/Community/SearchProfile/style';
import defaultImage from '../../../../assets/icons/common/Community/defaultProfile.svg';


const SearchProfile = ({ image, name, message }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const toggleFollow = () => {
    setIsFollowed((prev) => !prev);
  };

  return (
    <S.ProfileContainer>
      <S.ProfileImage src={image||defaultImage} alt={`${name}`} />
      <S.TextContainer>
        <S.ProfileName>{name}</S.ProfileName>
        <S.StateMessage>{message}</S.StateMessage>
      </S.TextContainer>
      <S.FollowButton followed={isFollowed} onClick={toggleFollow}>
        {isFollowed ? "팔로잉" : "팔로우"}
      </S.FollowButton>
    </S.ProfileContainer>
  );
};

export default SearchProfile;

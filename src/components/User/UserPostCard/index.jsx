import React from "react";
import * as S from "../../../styles/User/UserPostCard/style";
import likeIcon from "../../../assets/icons/common/Community/heart.svg";
import commentIcon from "../../../assets/icons/common/Community/comment.svg";
import scrapIcon from "../../../assets/icons/common/User/Scrapped.svg";

const UserPostCard = ({ category, title, preview, postImage, likes = 0, comments = 0, like = likeIcon, comment = commentIcon, isScrapped = false, onScrapClick }) => {
  return (
    <S.CardContainer>
      {isScrapped && ( // isScrapped가 true일 때만 아이콘 표시
        <S.ScrapIcon src={scrapIcon} alt="스크랩 아이콘" onClick={onScrapClick} />
      )}
      <S.Content>
        <S.Category>{category}</S.Category>
        <S.Title>{title}</S.Title>
        <S.Preview>{preview}</S.Preview>
        <S.Footer>
          <S.Stat>
            <S.StatIcon src={like} alt="좋아요 아이콘" />
            <S.StatText>{likes ?? 0}</S.StatText>
          </S.Stat>
          <S.Stat>
            <S.StatIcon src={comment} alt="댓글 아이콘" />
            <S.StatText>{comments ?? 0}</S.StatText>
          </S.Stat>
        </S.Footer>
      </S.Content>
      <S.Thumbnail src={postImage} alt={title} />
    </S.CardContainer>
  );
};

export default UserPostCard;

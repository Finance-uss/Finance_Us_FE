import React from "react";
import { useNavigate } from "react-router-dom";
import likeIcon from "../../../../assets/icons/common/Community/heart.svg";
import commentIcon from "../../../../assets/icons/common/Community/comment.svg";
import * as S from "../../../../styles/Community/PostCard/style";

const PostCard = ({ id , category, postName, preview, image, likes = 0, comments = 0 }) => {
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/community/postdetail/${id}`);
  };
  return (
    <S.CardContainer onClick={handlePostClick}>
      <S.Content>
        <S.TextWrapper>
          <S.Category>{category}</S.Category>
          <S.Title>{postName}</S.Title>
          <S.Preview>{preview}</S.Preview>
          <S.Footer>
            <S.Stat>
              <S.StatIcon src={likeIcon} alt="좋아요 아이콘" />
              <S.StatText>{likes}</S.StatText>
            </S.Stat>
            <S.Stat>
              <S.StatIcon src={commentIcon} alt="댓글 아이콘" />
              <S.StatText>{comments}</S.StatText>
            </S.Stat>
          </S.Footer>
        </S.TextWrapper>
       
      </S.Content>
      {image && <S.Thumbnail src={image} alt={postName}/>}
      </S.CardContainer>
  );
};

export default PostCard;

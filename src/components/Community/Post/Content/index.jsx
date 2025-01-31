import React, { useState } from "react";
import * as S from "../../../../styles/Community/PostDetail/Content/style";
import likeIcon from "../../../../assets/icons/common/Community/heart.svg";
import likeFill from "../../../../assets/icons/common/Community/heartFill.svg";
import commentIcon from "../../../../assets/icons/common/Community/comment.svg";
import moreIcon from "../../../../assets/icons/common/Community/more.svg";
import examIcon from "../../../../assets/icons/common/Community/exam.png";
import bookmarkIcon from "../../../../assets/icons/common/bookmark.svg";
import authIcon from "../../../../assets/icons/common/Community/CheckCircle.svg"
import CustomDate from "../CustomDate";
import MenuBar from "../MenuBar";
import { useNavigate } from "react-router-dom";

const Content = ({ title, userName, createdAt, image, content, likeCount, commentCount, currentUser,category, postId, onLikeCount,onCommentCount,isAuth }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const handleEdit = (postData) => {
    navigate(`/update/${postData.postId}`, { state: postData });
  };

  const handleDelete = () => alert("게시글 삭제");
  const handleReport = () => alert("게시글 신고");
  const handleBookmark = () => alert("게시글 스크랩");

  const [isLiked, setIsLiked] = useState(false); 

  const handleLike = () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;  
    setIsLiked(!isLiked);  
    onLikeCount(newLikeCount);
  };

  return (
    <S.PageContainer>
      <S.PostConatiner>
        <S.Header>
          <S.TitleContainer>
            <S.Title>{title}</S.Title>
            <S.MoreIcon src={moreIcon} alt="더보기 아이콘" onClick={openMenu} />
          </S.TitleContainer>
          <S.Info>
            <S.Profile>
              <S.UserIcon src={examIcon} alt="유저 아이콘" />
              <S.User>{userName}</S.User>
              {isAuth && <S.CheckIcon src={authIcon} alt="인증된 사용자" />}
            </S.Profile>
            <S.Date>{createdAt}</S.Date>
          </S.Info>
        </S.Header>

        <S.PostContent>
          <S.PostImage src={image} alt="게시글 이미지" />
          <S.PostText>{content}</S.PostText>
        </S.PostContent>

        <S.Stats>
          <S.StateContainer>
            <S.Stat>
              <S.StatIcon src={isLiked ? likeFill : likeIcon}                 alt="좋아요 아이콘"
                onClick={handleLike} />
              <S.StatText>{likeCount}</S.StatText>
            </S.Stat>
            <S.Stat>
              <S.StatIcon src={commentIcon} alt="댓글 아이콘" />
              <S.StatText>{commentCount}</S.StatText>
            </S.Stat>
          </S.StateContainer>
        </S.Stats>
        <S.BookMark src={bookmarkIcon} alt="북마크 아이콘" onClick={handleBookmark} />
      </S.PostConatiner>

      {isMenuOpen && (
        <MenuBar
    isOpen={isMenuOpen}
    closeModal={closeMenu}
    isOwner={currentUser}
    onEdit={() => handleEdit({ title, content, category, image, postId })}
    onDelete={handleDelete}
    onReport={handleReport}
    postId={postId} 
  />
      )}
    </S.PageContainer>
  );
};

export default Content;

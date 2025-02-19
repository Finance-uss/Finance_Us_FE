import React, { useState, useEffect } from "react";
import * as S from "../../../../styles/Community/PostDetail/Content/style";
import likeIcon from "../../../../assets/icons/common/Community/heart.svg";
import likeFill from "../../../../assets/icons/common/Community/heartFill.svg";
import commentIcon from "../../../../assets/icons/common/Community/comment.svg";
import moreIcon from "../../../../assets/icons/common/Community/more.svg";
import bookmarkIcon from "../../../../assets/icons/common/bookmark.svg";
import authIcon from "../../../../assets/icons/common/Community/CheckCircle.svg"
import PostMenuBar from "../MenuBar/PostMenubar";
import { useNavigate } from "react-router-dom";
import useComment from "../../../../hooks/useComment";
import {scrapPost, postLike} from "../../../../api/postAPI";
import bookmarkFillIcon from "../../../../assets/icons/common/Community/Scrap.svg";
import { formatDate } from "../../../../utils/dateUtils";

const Content = ({ title, userImg, userName, createdAt, updatedAt, image, content, isOwner,category, postId, isLike, updatedCount, isAuth }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { commentCount } = useComment(postId);
  const [isScrapped, setIsScrapped] = useState(false); 

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const handleEdit = (postData) => {
    navigate(`/update/${postData.postId}`, { state: postData });
  };

  const handleDelete = () => alert("게시글 삭제");
  const handleReport = () => alert("게시글 신고");


  const handleBookmark = async () => {
    try {
      const response = await scrapPost(postId); 
      if (response.isSuccess) {
        setIsScrapped(response.result.isScraped);
      }
    } catch (error) {
      console.error("스크랩 오류:", error);
    }
  };
  const [isLiked, setIsLike] = useState(isLike);
  const [likesCount, setLikesCount] = useState(updatedCount||0); 

  const handleLike = async () => {
    try {
      const updatedCount = await postLike(postId);
      if (updatedCount !== null) {
        setIsLike(prev => !prev); 
        setLikesCount(updatedCount); 
      }
    } catch (error) {
      console.error("좋아요 처리 오류:", error);
    }
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
              <S.UserIcon src={userImg} alt="유저 아이콘" />
              <S.User>{userName}</S.User>
              {isAuth && <S.CheckIcon src={authIcon} alt="인증된 사용자" />}
            </S.Profile>
            <S.Date>{formatDate(updatedAt || createdAt)}</S.Date>
          </S.Info>
        </S.Header>

        <S.PostContent>
          {image && <S.PostImage src={image} alt="게시글 이미지" />}
          {content &&<S.PostText>{content}</S.PostText>}
        </S.PostContent>

        <S.Stats>
          <S.StateContainer>
            <S.Stat>
              <S.StatIcon src={isLiked ? likeFill : likeIcon} alt="좋아요 아이콘"
                onClick={handleLike} />
              <S.StatText>{likesCount}</S.StatText>
            </S.Stat>
            <S.Stat>
              <S.StatIcon src={commentIcon} alt="댓글 아이콘" />
              <S.StatText>{commentCount}</S.StatText>
            </S.Stat>
          </S.StateContainer>
        </S.Stats>
        <S.BookMark src={isScrapped ? bookmarkFillIcon : bookmarkIcon} alt="북마크 아이콘" 
         onClick= {handleBookmark}/>
      </S.PostConatiner>

      {isMenuOpen && (
        <PostMenuBar
    isOpen={isMenuOpen}
    closeModal={closeMenu}
    isOwner={isOwner}
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

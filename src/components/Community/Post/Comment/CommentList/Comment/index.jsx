import React, { useState } from 'react';
import * as S from '../../../../../../styles/Community/PostDetail/Comment/style';
import commentIcon from '../../../../../../assets/icons/common/Community/comment.svg';
import likeIcon from '../../../../../../assets/icons/common/Community/heart.svg';
import likeFill from '../../../../../../assets/icons/common/Community/heartFill.svg';
import moreIcon from '../../../../../../assets/icons/common/Community/more.svg';
import authIcon from '../../../../../../assets/icons/common/Community/CheckCircle.svg';
import userDefaultImg from '../../../../../../assets/icons/common/Community/commentProfile.svg';
import CommentMenuBar from '../../../MenuBar/CommentMenubar';
import { formatDate } from '../../../../../../utils/dateUtils';

const Comment = ({ comment, onReplyClick, onLike, index, likesCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const isDeleted = comment.content === "삭제된 댓글입니다.";
  const handleEdit = () => alert(`댓글 수정: ${comment.commentId}`);
  const handleDelete = () => alert(`댓글 삭제: ${comment.commentId}`);
  const handleReport = () => alert(`댓글 신고: ${comment.commentId}`);

  return (
    <S.CommentListContainer>
      <S.Header>
        <S.User>
          <S.UserIcon
            src={comment.userImageUrl || userDefaultImg}
            alt="유저 프로필 사진"
          />
          <S.UserWrapper>
            <S.UserContainer>
              <S.UserName style={{ color: isDeleted ? '#B4B4B4' : '#000'}}>{isDeleted ? "(삭제)" : comment.name}</S.UserName>
              {comment.isAuthenticated && <S.CheckIcon src={authIcon} alt="인증된 사용자" />}
            </S.UserContainer>
            <S.CommentDate>{formatDate(comment.updatedAt || comment.createdAt)}</S.CommentDate>
          </S.UserWrapper>
        </S.User>
        <S.Active>
          <S.Recomment onClick={() => onReplyClick(comment.commentId, comment.name)}>
            <S.RecommentIcon src={commentIcon} alt="답글 아이콘" />
            <S.RecommentText>답글쓰기</S.RecommentText>
          </S.Recomment>
          <S.Likes>
            <S.LikeIcon
              src={comment.isLiked ? likeFill : likeIcon}
              alt="좋아요 아이콘"
              onClick={() => onLike(comment.commentId)}
            />
            <S.LikeCount>{comment.likesCount}</S.LikeCount>
          </S.Likes>
          <S.MoreIcon src={moreIcon} alt="더보기 아이콘" onClick={openMenu} />
        </S.Active>
      </S.Header>
      {isMenuOpen && (
        <CommentMenuBar
          isOpen={isMenuOpen}
          closeModal={closeMenu}
          isOwner={comment.isMine}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReport={handleReport}
          commentId={comment.commentId}
          index={index}
        />
      )}
      <S.CommentText style={{
        color: isDeleted ? '#B4B4B4' : '#000',
      }}>{comment.content}</S.CommentText>
    </S.CommentListContainer>
  );
};

export default Comment;

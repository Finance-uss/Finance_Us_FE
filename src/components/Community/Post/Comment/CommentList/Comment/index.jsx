import React, { useState } from 'react';
import * as S from '../../../../../../styles/Community/PostDetail/Comment/style';
import commentIcon from '../../../../../../assets/icons/common/Community/comment.svg';
import likeIcon from '../../../../../../assets/icons/common/Community/heart.svg';
import likeFill from '../../../../../../assets/icons/common/Community/heartFill.svg';
import moreIcon from '../../../../../../assets/icons/common/Community/more.svg';
import userDefaultImg from '../../../../../../assets/icons/common/Community/commentProfile.svg';
import CommentMenuBar from '../../../MenuBar/CommentMenubar';
import { formatDate } from '../../../../../../utils/dateUtils';

const Comment = ({ comment, onReplyClick, onLike, index }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const handleEdit = () => alert(`댓글 수정: ${comment.id}`);
  const handleDelete = () => alert(`댓글 삭제: ${comment.id}`);
  const handleReport = () => alert(`댓글 신고: ${comment.id}`);

  return (
    <S.CommentListContainer>
      <S.Header>
        <S.User>
          <S.UserIcon
            src={comment.userImage || userDefaultImg}
            alt="유저 프로필 사진"
          />
          <S.UserWrapper>
            <S.UserName>{comment.commentId}</S.UserName>  {/*임시로 유저 ID불러옴..*/}
            <S.CommentDate>{formatDate(comment.updatedAt || comment.createdAt)}</S.CommentDate>
          </S.UserWrapper>
        </S.User>
        <S.Active>
          <S.Recomment onClick={() => onReplyClick(comment.id, comment.userName)}>
            <S.RecommentIcon src={commentIcon} alt="답글 아이콘" />
            <S.RecommentText>답글쓰기</S.RecommentText>
          </S.Recomment>
          <S.Likes>
            <S.LikeIcon
              src={comment.isLiked ? likeFill : likeIcon}
              alt="좋아요 아이콘"
              onClick={() => onLike(comment.id)}
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
          isOwner={comment.isOwner}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReport={handleReport}
          commentId={comment.id}
          index={index}
        />
      )}
      <S.CommentText>{comment.content}</S.CommentText>
    </S.CommentListContainer>
  );
};

export default Comment;

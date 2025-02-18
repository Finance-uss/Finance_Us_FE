import React, { useState } from 'react';
import * as S from '../../../../../../styles/Community/PostDetail/Comment/style';
import commentIcon from '../../../../../../assets/icons/common/Community/comment.svg';
import likeIcon from '../../../../../../assets/icons/common/Community/heart.svg';
import authIcon from '../../../../../../assets/icons/common/Community/CheckCircle.svg';
import likeFill from '../../../../../../assets/icons/common/Community/heartFill.svg';
import moreIcon from '../../../../../../assets/icons/common/Community/more.svg';
import userDefaultImg from '../../../../../../assets/icons/common/Community/commentProfile.svg';
import CommentMenuBar from '../../../MenuBar/CommentMenubar';
import { formatDate } from '../../../../../../utils/dateUtils';

const Reply = ({ reply, onReplyClick, onLike, onDelete, onEditClick, likesCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const isDeleted = reply.content === "삭제된 댓글입니다.";
  const handleReport = () => alert(`답글 신고: ${reply.id}`);

  return (
    <S.CommentListContainer>
      <S.Header>
        <S.User>
          <S.UserIcon
            src={reply.userImageUrl || userDefaultImg}
            alt="유저 프로필 사진"
          />
          <S.UserWrapper>
            <S.UserContainer>
                          <S.UserName style={{ color: isDeleted ? '#B4B4B4' : '#000'}}>{isDeleted ? "(삭제)" : reply.name}</S.UserName>
                          {reply.isAuthenticated && <S.CheckIcon src={authIcon} alt="인증된 사용자" />}
                        </S.UserContainer>
            <S.CommentDate>{formatDate(reply.updatedAt || reply.createdAt)}</S.CommentDate>
          </S.UserWrapper>
        </S.User>
        <S.Active>
          <S.Recomment onClick={() => onReplyClick(reply.commentId, reply.name)}>
            <S.RecommentIcon src={commentIcon} alt="답글 아이콘" />
            <S.RecommentText>답글쓰기</S.RecommentText>
          </S.Recomment>
          <S.Likes>
            <S.LikeIcon
              src={reply.isLiked ? likeFill : likeIcon}
              alt="좋아요 아이콘"
              onClick={() => onLike(reply.id)}
            />
            <S.LikeCount>{reply.likesCount}</S.LikeCount>
          </S.Likes>
          <S.MoreIcon src={moreIcon} alt="더보기 아이콘" onClick={openMenu} />
        </S.Active>
      </S.Header>
      {isMenuOpen && (
        <CommentMenuBar
          isOpen={isMenuOpen}
          closeModal={closeMenu}
          isOwner={reply.isMine}
          onEditClick={() => onEditClick(reply.commentId, reply.content)} 
          onDelete={onDelete}
          onReport={handleReport}
          commentId={reply.commentId}
        />
      )}
      <S.CommentText style={{
              color: isDeleted ? '#B4B4B4' : '#000',
            }}>{reply.content}</S.CommentText>
    </S.CommentListContainer>
  );
};

export default Reply;

import React, { useState } from 'react';
import * as S from '../../../../../../styles/Community/PostDetail/Comment/style';
import commentIcon from '../../../../../../assets/icons/common/Community/comment.svg';
import likeIcon from '../../../../../../assets/icons/common/Community/heart.svg';
import likeFill from '../../../../../../assets/icons/common/Community/heartFill.svg';
import moreIcon from '../../../../../../assets/icons/common/Community/more.svg';
import userDefaultImg from '../../../../../../assets/icons/common/Community/commentProfile.svg';
import MenuBar from '../../../MenuBar';

const Reply = ({ reply, onReplyClick, onLike }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const handleEdit = () => alert(`답글 수정: ${reply.id}`);
  const handleDelete = () => alert(`답글 삭제: ${reply.id}`);
  const handleReport = () => alert(`답글 신고: ${reply.id}`);

  return (
    <S.CommentListContainer>
      <S.Header>
        <S.User>
          <S.UserIcon
            src={reply.userImage || userDefaultImg}
            alt="유저 프로필 사진"
          />
          <S.UserWrapper>
            <S.UserName>{reply.userName}</S.UserName>
            <S.CommentDate>{reply.commentDate}</S.CommentDate>
          </S.UserWrapper>
        </S.User>
        <S.Active>
          <S.Recomment onClick={() => onReplyClick(reply.id, reply.userName)}>
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
        <MenuBar
          isOpen={isMenuOpen}
          closeModal={closeMenu}
          isOwner={reply.isOwner}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReport={handleReport}
          commentId={reply.id}
        />
      )}
      <S.CommentText>{reply.comment}</S.CommentText>
    </S.CommentListContainer>
  );
};

export default Reply;

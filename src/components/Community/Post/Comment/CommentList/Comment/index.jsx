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
import { addLikeComment, getLikeComment } from '../../../../../../api/Comment/commentAPI';

const Comment = ({ data, onReplyClick, onEditClick, onDelete, isReply, depth=0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(data.isLiked); 
  const [likesCount,setLikesCount]=useState(data.likesCount||0);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const isDeleted = data.content === "삭제된 댓글입니다.";

  const handleLike = async (commentId) => {
      const result = await addLikeComment(commentId); 
      if (result) {setIsLiked(!isLiked); setLikesCount(result.likesCount);}
  };
  
  const sortedReplies = (replies) => {
    return replies?.slice().sort((a, b) => a.commentId - b.commentId).map(reply => ({
      ...reply,
      replies: sortedReplies(reply.replies)
    })) || [];
  };

  return (
    <S.CommentListContainer>
      <S.Header>
        <S.User>
          <S.UserIcon
            src={data.userImageUrl || userDefaultImg}
            alt="유저 프로필 사진"
          />
          <S.UserWrapper>
            <S.UserContainer>
              <S.UserName style={{ color: isDeleted ? '#B4B4B4' : '#000'}}>{isDeleted ? "(삭제)" : data.name}</S.UserName>
              {data.isAuthenticated && <S.CheckIcon src={authIcon} alt="인증된 사용자" />}
            </S.UserContainer>
            <S.CommentDate>{formatDate(data.updatedAt || data.createdAt)}</S.CommentDate>
          </S.UserWrapper>
        </S.User>
        <S.Active>
          {!isReply && (
            <S.Recomment onClick={() => onReplyClick(data.commentId, data.name)}>
              <S.RecommentIcon src={commentIcon} alt="답글 아이콘" />
              <S.RecommentText>답글쓰기</S.RecommentText>
            </S.Recomment>
          )}
          <S.Likes>
            <S.LikeIcon
              src={isLiked ? likeFill : likeIcon}  
              alt="좋아요 아이콘"
              onClick={() => handleLike(data.commentId)}  
            />
            <S.LikeCount>{likesCount}</S.LikeCount>
          </S.Likes>
          <S.MoreIcon src={moreIcon} alt="더보기 아이콘" onClick={openMenu} />
        </S.Active>
      </S.Header>
      {isMenuOpen && (
        <CommentMenuBar
          isOpen={isMenuOpen}
          closeModal={closeMenu}
          isOwner={data.isMine}
          onEditClick={() => onEditClick(data.commentId, data.content)}
          onDelete={onDelete}
          onReport={() => alert('댓글 신고')}
          commentId={data.commentId}
        />
      )}
      <S.CommentText style={{ color: isDeleted ? '#B4B4B4' : '#000' }}>
        {data.content}
      </S.CommentText>
      {data.replies?.length > 0 && (
        <S.Replies>
          {sortedReplies(data.replies).map((reply) => (
            <Comment
              key={reply.commentId}
              data={reply}
              onReplyClick={onReplyClick}
              onLike={handleLike} 
              onEditClick={onEditClick}
              onDelete={onDelete}
              depth={depth + 1} 
            />
          ))}
        </S.Replies>
      )}
    </S.CommentListContainer>
  );
};

export default Comment;

import React, { useState } from 'react';
import CommentInput from '../CommentInput';
import * as S from "../../../../../styles/Community/PostDetail/Comment/style";
import CustomDate from '../../CustomDate';
import Comment from './Comment';
import Reply from './Reply';
import userDefaultImg from '../../../../../assets/icons/common/Community/commentProfile.svg'; 

const CommentList = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      userName: '원데이식스밀',
      commentDate: <CustomDate />,
      comment: '너도? 나도 ㅋㅋㅋㅋㅋㅋㅋㅋ 내 힘들다 ',
      likesCount: 5,
      isLiked: false, 
      userImage: '',
      replies: [],
    },
    {
      id: 2,
      userName: '김동글',
      commentDate: <CustomDate />,
      comment: '댓글쓰기!!',
      likesCount: 3,
      isLiked: false,
      userImage: '',
      replies: [],
    },
  ]);

  const [replyTo, setReplyTo] = useState(null); 

  const handleAddComment = (newComment) => {
    if (replyTo) {
      const commentId = replyTo.commentId;

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id:`${commentId}.${comment.replies.length + 1}` ,
                    userName: '답글동글동글',
                    commentDate: <CustomDate />,
                    comment: newComment,
                    likesCount: 0,
                    isLiked: false, 
                  },
                ],
              }
            : comment
        )
      );
    } else {
      setComments((comment, commentId, prevComments) => [
        ...prevComments,
        {
          id:`${commentId}.${comment.replies.length + 1}` 
          ,
          userName: '새로운동글동글',
          commentDate: <CustomDate />,
          comment: newComment,
          likesCount: 0,
          isLiked: false,
          userImage: '',
          replies: [],
        },
      ]);
    }

    setReplyTo(null);
  };

  const handleReplyClick = (commentId, userName) => {
    setReplyTo({ commentId, userName });
  };

  const handleLike = (commentId, isReply, replyId) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (isReply) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      isLiked: !reply.isLiked,
                      likesCount: reply.isLiked ? reply.likesCount - 1 : reply.likesCount + 1,
                    }
                  : reply
              ),
            };
          } else {
            return {
              ...comment,
              isLiked: !comment.isLiked,
              likesCount: comment.isLiked ? comment.likesCount - 1 : comment.likesCount + 1,
            };
          }
        }
        return comment;
      })
    );
  };

  return (
    <>
      {comments.map((comment) => (
        <S.CommentListContainer key={comment.id}>
          <Comment
            comment={comment}
            onReplyClick={handleReplyClick} 
            onLike={() => handleLike(comment.id, false)} 
          />

          {comment.replies.length > 0 && (
            <S.Replies>
              {comment.replies.map((reply) => (
                <Reply
                  key={reply.id}
                  reply={reply}
                  onReplyClick={handleReplyClick} 
                  onLike={() => handleLike(comment.id, true, reply.id)} 
                />
              ))}
            </S.Replies>
          )}
        </S.CommentListContainer>
      ))}
      <S.CommentListContainer>
        <CommentInput
          onSubmit={handleAddComment}
          replyTo={replyTo?.userName || null}
        />
      </S.CommentListContainer>
    </>
  );
};

export default CommentList;

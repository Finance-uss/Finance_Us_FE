import React, { useState, useEffect } from 'react';
import CommentInput from '../CommentInput';
import * as S from "../../../../../styles/Community/PostDetail/Comment/style";
import Comment from './Comment';
import Reply from './Reply';
import axiosInstance from '../../../../../api/axiosInstance';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  const [replyTo, setReplyTo] = useState(null); 
  const postId = 1;

  const handleAddComment = async (newComment) => {
    try {
      const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/comment/${postId}`, { content: newComment });
  
      if (response.data.isSuccess) {
        const { commentId, createdAt, updatedAt } = response.data.result;
  
        setComments((prevComments) => [
          ...prevComments,
          {
            id: commentId,
            userName: '김동글',
            createdAt, 
            updatedAt, 
            comment: newComment,
            likesCount: 0,
            isLiked: false,
            userImage: '',
            replies: [],
          },
        ]);
      } else {
        console.error('댓글 추가 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 생성 실패:', error);
    }
    setReplyTo(null);
  };


  const handleReplyClick = (commentId, userName) => {
    setReplyTo({ commentId, userName });
  };

  const handleAddReply = async (newReply) => {
    try {
      // 답글 등록
      const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/comment/${replyTo.commentId}`, { content: newReply });

      if (response.data.isSuccess) {
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment.id === replyTo.commentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: response.data.result.commentId, 
                    userName: '김동글',
                    commentDate: <CustomDate />,
                    comment: newReply,
                    likesCount: 0,
                    isLiked: false,
                    userImage: '',
                  },
                ],
              };
            }
            return comment;
          })
        );
      } else {
        console.error('답글 추가 실패:', response.data.message);
      }
    } catch (error) {
      console.error('답글 생성 실패:', error);
    }
    setReplyTo(null); 
  };

  const handleLike = async (commentId, isReply, replyId) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/comment/like/${commentId}`; 

      const response = await axiosInstance.post(url); 

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
                        isLiked: response.data.isLiked,
                        likesCount: response.data.likesCount,
                      }
                    : reply
                ),
              };
            } else {
              return {
                ...comment,
                isLiked: response.data.isLiked,
                likesCount: response.data.likesCount,
              };
            }
          }
          return comment;
        })
      );
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
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
        <CommentInput
          onSubmit={replyTo ? handleAddReply : handleAddComment}
          replyTo={replyTo?.userName || null}
        />
    </>
  );
};

export default CommentList;

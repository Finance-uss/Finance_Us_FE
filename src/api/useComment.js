import { useState } from 'react';
import axios from 'axios';

const useComment = (postId) => {
    const [comments, setComments] = useState([]);
    const [replyTo, setReplyTo] = useState(null); 
    const API_URL = import.meta.env.VITE_API_URL;
  
    // 댓글 추가
    const addComment = async (newComment) => {
      try {
        const response = await axios.post(`${API_URL}/api/comment/${postId}`, { content: newComment });
        console.log(response); 
        if (response.data.isSuccess) {
          setComments((prevComments) => [
            ...prevComments,
            {
              id: response.data.result.commentId, 
              userName: '김동글',
              commentDate: new Date().toLocaleString(), 
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
    };
    // 댓글 수정
  const updateComment = async (commentId, updatedContent) => {
    try {
      const response = await axios.patch(`${API_URL}/api/comment/${commentId}`, { content: updatedContent });
      if (response.data.isSuccess) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, comment: updatedContent }
              : comment
          )
        );
      } else {
        console.error('댓글 수정 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/comment/${commentId}`);
      console.log(response); 
      if (response.data.isSuccess) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } else {
        console.error('댓글 삭제 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      console.log(error.response?.data); 
    }
  };

    // 답글 추가
    const addReply = async (newReply) => {
      if (!replyTo) return;
  
      try {
        const response = await axios.post(`${API_URL}/api/comment/${replyTo.commentId}`, { content: newReply });
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
                      commentDate: new Date().toLocaleString(),
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
    };
  
    // 좋아요 처리
    const handleLike = async (commentId, isReply, replyId) => {
      try {
        const url = `${API_URL}/api/like/comment/${commentId}`;
        const response = await axios.post(url);
  
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
  
    // 좋아요 개수 반환
    const getLikes = async (commentId, isReply, replyId) => {
      try {
        const url = `${API_URL}/api/like/count/${commentId}`;
        const response = await axios.get(url);
        const likesCount = response.data.likesCount;
  
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment.id === commentId) {
              if (isReply) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.id === replyId ? { ...reply, likesCount } : reply
                  ),
                };
              } else {
                return { ...comment, likesCount };
              }
            }
            return comment;
          })
        );
      } catch (error) {
        console.error('좋아요 개수 반환 실패:', error);
      }
    };
  
    return {
      comments,
      replyTo,
      setReplyTo,
      addComment,
      deleteComment,
      updateComment,
      addReply,
      handleLike,
      getLikes, 
    };
  };
  
  export default useComment;
  
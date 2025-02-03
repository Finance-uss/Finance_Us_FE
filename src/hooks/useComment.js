import { useState } from "react";
import { getComment, addComment, getLikeComment, addLikeComment, editComment, deleteComment } from "../api/apiComment";

const useComment = (postId) => {
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  const handleGetComment = async () => {
    try {
      const data = await getComment(postId);
      if (data.isSuccess) {
        setComments(data.result);
      }
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  const handleAddComment = async (newComment) => {
    try {
      const data = await addComment(postId, newComment);
      if (data.isSuccess) {
        setComments((prev) => [
          ...prev,
          {
            id: data.result.commentId,
            userName: "김동글",
            isOwner: true,
            createdAt: data.result.createdAt,
            updatedAt: data.result.updatedAt,
            comment: newComment,
            likesCount: 0,
            userImage: "",
            replies: [],
          },
        ]);
      }
    } catch (error) {
      console.error("댓글 생성 실패:", error);
    }
  };

  const handleEditComment = async (commentId, content) => {
    try {
      const data = await editComment(commentId, content);
      if (data.isSuccess) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId ? { ...comment, comment: content } : comment
          )
        );
      }
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const data = await deleteComment(commentId);
      if (data.isSuccess) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId) 
        );
      }
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const handleGetLike = async (commentId) => {
    try {
      const data = await getLikeComment(commentId);
      if (data.isSuccess) {
        console.log(`댓글 ${commentId} 좋아요 수:`, data.result.likesCount);
      }
    } catch (error) {
      console.error("댓글 좋아요 반환 실패:", error);
    }
  };
  
  const handleAddLike = async (commentId) => {
    try {
      const data = await addLikeComment(commentId);
      if (data.isSuccess) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? { ...comment, likesCount: comment.likesCount + 1 }
              : comment
          )
        );
      }
    } catch (error) {
      console.error("댓글 좋아요 추가 실패:", error);
    }
  };

  return {
    comments,
    setComments,
    replyTo,
    handleGetComment,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    handleGetLike,
    handleAddLike,
  };
};

export default useComment;

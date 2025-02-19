import axiosInstance from "../axiosInstance";

export const getComment = async (postId) => {
  const response = await axiosInstance.get(`/api/comment/${postId}`);
  return response.data; 
};

export const addComment = async (postId, content, parentCommentId) => {
  const response = await axiosInstance.post(
    `/api/comment/${postId}`,
    { content, parentCommentId }
  );
  return response.data.result;  
};

export const editComment = async (commentId, content) => {
  const response = await axiosInstance.patch(
    `/api/comment/${commentId}`,
    { content }
  );
  return response.data.result; 
};

export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(
    `/api/comment/${commentId}`
  );
  return response.data.result;  
};

export const addLikeComment = async (commentId) => {
  try {
    const response = await axiosInstance.post(
      `/api/like/comment/${commentId}`
    );
    return response.data.result;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.result;
      if (errorMessage === "Cannot like a deleted comment.") {
        alert("삭제된 댓글에 좋아요를 누를 수 없습니다.");
      } else if (errorMessage === "You already liked this comment") {
        alert("이미 좋아요한 댓글입니다.");
      } else {
        alert("좋아요 요청 중 오류가 발생했습니다.");
      }
    }
  return response.data.result; 
  };
};

export const getLikeComment = async (commentId) => {
  const response = await axiosInstance.get(
    `/api/like/comment/${commentId}`
  );
  return response.data.likesCount;  
};


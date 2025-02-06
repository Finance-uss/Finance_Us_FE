import axiosInstance from "./axiosInstance";

export const getComment = async (postId) => {
  const response = await axiosInstance.get(
    `/api/comment/${postId}`);
  return response.data;
};

export const addComment = async (postId, content) => {
  const response = await axiosInstance.post(
    `/api/comment/${postId}`,
    { content });
  return response.data;
};

export const editComment = async (commentId, content) => {
  const response = await axiosInstance.patch(
    `/api/comment/${commentId}`,
    { content });
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(
    `/api/comment/${commentId}`);
  return response.data;
};

export const addReply = async (commentId, content) => {
  const response = await axiosInstance.post(
    `/api/comment/${commentId}`,
    { content }
  );
  return response.data;
};

export const getLikeComment = async (commentId) => {
  const response = await axiosInstance.get(
    `/api/like/comment/${commentId}`
  );
  return response.data;
};

export const addLikeComment = async (commentId) => {
  const response = await axiosInstance.post(
    `/api/like/comment/${commentId}`
  );
  return response.data;
};


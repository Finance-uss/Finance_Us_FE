import axiosInstance from "./axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const getComment = async (postId) => {
  const response = await axiosInstance.get(
    `${API_URL}/api/comment/${postId}`);
  return response.data;
};

export const addComment = async (postId, content) => {
  const response = await axiosInstance.post(
    `${API_URL}/api/comment/${postId}`,
    { content });
  return response.data;
};

export const editComment = async (commentId, content) => {
  const response = await axiosInstance.patch(
    `${API_URL}/api/comment/${commentId}`,
    { content });
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(
    `${API_URL}/api/comment/${commentId}`);
  return response.data;
};

export const addReply = async (commentId, content) => {
  const response = await axiosInstance.post(
    `${API_URL}/api/comment/${commentId}`,
    { content }
  );
  return response.data;
};

export const getLikeComment = async (commentId) => {
  const response = await axiosInstance.get(
    `${API_URL}/api/like/comment/${commentId}`
  );
  return response.data;
};

export const addLikeComment = async (commentId) => {
  const response = await axiosInstance.post(
    `${API_URL}/api/like/comment/${commentId}`
  );
  return response.data;
};

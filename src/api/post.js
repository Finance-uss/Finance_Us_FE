import axiosInstance from './axiosInstance';

export const getPost = async (postId) => {
    try {
        const response = await axiosInstance.get(`/api/post/${postId}`);
        return response.data;
    } catch (error) {
        console.error('게시글 조회 실패:', error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
      const response = await axiosInstance.post(`/api/post`, postData );
  
      if (response.data.isSuccess) {
        alert('게시글이 작성되었습니다!');
      } else {
        alert('게시글 작성에 실패했습니다.');
      }
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
      alert('게시글 작성 중 오류가 발생했습니다.');
      return { isSuccess: false, message: error.message };
    }
  };

export const updatePost = async (postId, updatedData) => {
  try {
    const response = await axiosInstance.patch(`/api/post/${postId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.isSuccess) {
      alert('게시글이 수정되었습니다!');
    } else {
      alert('게시글 수정에 실패했습니다.');
    }
    return response.data; 
  } catch (error) {
    console.error('Error updating post:', error);
    alert('게시글 수정 중 오류가 발생했습니다.');

  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/api/post/${postId}`);

    if (response.data.isSuccess) {
      alert('게시글이 삭제되었습니다!');
    } else {
      alert('게시글 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('게시글 삭제 중 오류가 발생했습니다.');
  }
};

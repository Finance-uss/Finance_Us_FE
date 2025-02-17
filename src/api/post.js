import axiosInstance from './axiosInstance';

export const getPost = async (postId) => {
    try {
        const response = await axiosInstance.get(`/api/post/detail/${postId}`);
        return response.data;
    } catch (error) {
        console.error('게시글 조회 실패:', error);
        throw error;
    }
};

export const createPost = async (postData, token) => {
    try {
      const response = await axiosInstance.post(`/api/post`, postData,{
        headers: {Authorization: `Bearer ${token}`}} );
  
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

export const updatePost = async (postId, updatedData, token) => {
  try {
    const response = await axiosInstance.patch(`/api/post/${postId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
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

export const deletePost = async (postId, token) => {
  try {
    const response = await axiosInstance.delete(`/api/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

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


export const scrapPost = async (postId,token) => {
  try {
    const response = await axiosInstance.post(
      `/api/scrap/${postId}`,{
        headers: { Authorization: `Bearer ${token}`, },
      }
    );

    if (response.data.isSuccess) {
      return response.data; 
    } else {
      alert('게시글 스크랩에 실패했습니다.');
      return response.data; 
    }
  } catch (error) {
    console.error('Error scrapping post:', error);
    alert('게시글 스크랩 중 오류가 발생했습니다.');
    return { isSuccess: false, result: { isScraped: false } }; 
  }
};

export const getLike = async (postId, token) => {
  try {
    const response = await axiosInstance.get(`/api/like/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.result.likesCount;  
  } catch (error) {
    console.error("좋아요 조회 실패:", error);
    return null;
  }
};

export const postLike = async (postId, token) => {
  try {
    const response = await axiosInstance.post(`/api/like/post/${postId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.result.likesCount; 
  } catch (error) {
    console.error("좋아요 실패:", error);
    throw alert ("이미 좋아요를 눌렀습니다.");
  }
};



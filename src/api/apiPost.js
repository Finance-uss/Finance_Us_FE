import axiosInstance from "./axiosInstance";

// 전체 게시글 목록 조회
export const getPostList = async (postType, cursor, size) => {
    try {
        const response = await axiosInstance.get(`/api/post/${postType}?cursor=${cursor||''}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("특정 게시글 목록 조회 실패:", error);
        throw error;
    }
};

// 특정 카테고리 게시글 목록 조회
export const getPostCategoryList = async (postType, category, cursor, size) => {
    try {
        let engCategory = category;
        switch (category) {
            case '칼럼':
                engCategory = 'COLUMN';
                break;
            case '강연':
                engCategory = 'LECTURE';
                break;
            case '홍보':
                engCategory = 'PROMOTION';
                break;
            case '자유':
                engCategory = 'FREE';
                break;
            case '정보':
                engCategory = 'INFO';
                break;
            case '낭비했어요':
                engCategory = 'WASTE';
                break;
            case '절약했어요': engCategory = 'SAVE';
                break;
            default:
                break;
        }
        const response = await axiosInstance.get(`/api/post/${postType}/${engCategory}?cursor=${cursor||''}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("특정 카테고리 게시글 목록 조회 실패:", error);
        throw error;
    }
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axiosInstance from '../../../../api/axiosInstance';
import BackHeader from '../../../../components/User/BackHeader';
import UserPostCard from '../../../../components/User/UserPostCard';

const CommentedPosts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [userId, setUserId] = useState(null);

    const handleBackClick = () => {
        navigate('/user');
    };

    useEffect(() => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) {
                setErrorMessage("로그인이 필요합니다.");
                navigate('/login'); // 로그인 페이지로 이동
                return;
            }
    
            try {
                const payload = JSON.parse(atob(storedToken.split('.')[1])); // JWT 디코딩
                setUserId(payload.userId);
            } catch (error) {
                console.error("토큰 파싱 실패:", error);
                setErrorMessage("로그인 정보가 올바르지 않습니다.");
                navigate('/login');
            }
    }, [navigate]);

    // 댓글 단 글 목록 불러오기
    const fetchCommentedPosts = async () => {
        try {
            if (!userId) return;
            const response = await axiosInstance.get(`/api/post/commented-post/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            
            if (response.data.isSuccess) {
                setPosts(response.data.result);
                setErrorMessage("");
            } else {
                setErrorMessage("댓글 단 글을 불러올 수 없습니다.");
            }
        } catch (error) {
            setErrorMessage("서버 에러가 발생했습니다. 다시 시도해 주세요.");
            console.error("댓글 단 글 조회 실패:", error);
        }
    };

    // 페이지 진입 시 API 호출
    useEffect(() => {
        fetchCommentedPosts();
    }, [userId]);

    return (
        <CommentedPostsContainer>
            <BackHeaderWrapper>
                <BackHeader title="댓글 단 글" onBackClick={handleBackClick} />
            </BackHeaderWrapper>
            <ContentWrapper>
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <UserPostCard
                            key={index} // id가 없으므로 index 사용
                            category={post.category}
                            title={post.title}
                            preview={post.content} 
                            postImage={post.imgUrl} 
                            likes={post.likeCnt} // 좋아요 수 추가
                            comments={post.commentCnt} // 댓글 수 추가
                        />
                    ))
                ) : (
                    <NoPostsText>댓글을 단 글이 없습니다.</NoPostsText>
                )}
                </ContentWrapper>
        </CommentedPostsContainer>
    );

};

export default CommentedPosts;

const CommentedPostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

const ContentWrapper = styled.div`
    margin-top: 0;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    overflow-y: auto;
    padding-bottom: 80px; 
`;

const BackHeaderWrapper = styled.div`
    padding: 0 20px;
`;

const ErrorText = styled.p`
    color: red;
    text-align: center;
    font-size: 14px;
    margin-bottom: 20px;
`;

const NoPostsText = styled.p`
    text-align: center;
    font-size: 16px;
    color: gray;
    margin-top: 20px;
`;

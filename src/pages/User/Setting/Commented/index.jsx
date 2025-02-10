import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import BackHeader from '../../../../components/User/BackHeader';
import UserPostCard from '../../../../components/User/UserPostCard';
import PostImage2 from '../../../../assets/icons/common/User/PostImage2.svg';
import PostImage3 from '../../../../assets/icons/common/User/PostImage3.svg';

// 더미 데이터
const posts = [
    {
      id: 1,
      category: "자유",
      title: "단기알바 너무 힘들다",
      preview: "단기알바가 너무 힘들어 하지만 나는 일을 해야 해..",
      postImage: PostImage2, 
      likes: 13,
      comments: 6,
    },
    {
      id: 2,
      category: "자유",
      title: "님들 동아리 뭐 함?",
      preview: "교내 하나 하고 있는데 대외 추천함? 응응 스펙을 위해서라면 해야지",
      postImage: PostImage3,
      likes: 13,
      comments: 6,
    },
];

const CommentedPosts = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/user');
    };

    return (
        <CommentedPostsContainer>
            <BackHeaderWrapper>
                <BackHeader title="댓글 단 글" onBackClick={handleBackClick} />
            </BackHeaderWrapper>
            <ContentWrapper>
                {posts.map((post) => (
                    <UserPostCard
                        key={post.id}
                        category={post.category}
                        title={post.title}
                        preview={post.preview}
                        postImage={post.postImage}
                        likes={post.likes}
                        comments={post.comments}
                    />
                ))}
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

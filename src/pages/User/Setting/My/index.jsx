import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import BackHeader from '../../../../components/User/BackHeader';
import UserPostCard from '../../../../components/User/UserPostCard';
import PostImage1 from '../../../../assets/icons/common/User/PostImage1.svg';

// 더미 데이터
const posts = [
    {
      id: 1,
      category: "자유",
      title: "멍청비용 또 생겼다",
      preview: "멍청비용 때문에 미치겠음. 이거 진짜 고쳐야 되는데",
      postImage: PostImage1, 
      likes: 10,
      comments: 2,
    },
    {
      id: 2,
      category: "자유",
      title: "멍청비용 또 생겼다",
      preview: "멍청비용 때문에 미치겠음. 이거 진짜 고쳐야 되는데",
      postImage: PostImage1,
      likes: 10,
      comments: 2,
    },
    {
        id: 3,
        category: "자유",
        title: "멍청비용 또 생겼다",
        preview: "멍청비용 때문에 미치겠음. 이거 진짜 고쳐야 되는데",
        postImage: PostImage1,
        likes: 10,
        comments: 2,
      },
];

const MyPosts = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/user');
    };

    return (
        <MyPostsContainer>
            <BackHeader title="작성 글" onBackClick={handleBackClick} />
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
        </MyPostsContainer>
    );

};

export default MyPosts;

const MyPostsContainer = styled.div`
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

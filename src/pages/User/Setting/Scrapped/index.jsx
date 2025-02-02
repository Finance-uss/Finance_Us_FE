import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import BackHeader from '../../../../components/User/BackHeader';
import UserPostCard from '../../../../components/User/UserPostCard';
import PostImage2 from '../../../../assets/icons/common/User/PostImage2.svg';
import PostImage3 from '../../../../assets/icons/common/User/PostImage3.svg';
import PostImage4 from '../../../../assets/icons/common/User/PostImage4.svg';

// 더미 데이터
const initialPosts = [
    {
        id: 1,
        category: "자유",
        title: "단기알바 너무 힘들다",
        preview: "단기알바가 너무 힘들어 하지만 나는 일을 해야 해. 정말 힘들어서 참을 수 없을 만큼 피곤하다.",
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
    {
        id: 3,
        category: "자유",
        title: "다들 멍청비용 얼마나 줄임?",
        preview: "난 일본 가서 60만원 나온 거 보고 진짜 충격받아서 그 이후로 돈 아끼려고..",
        postImage: PostImage4,
        likes: 13,
        comments: 6,
    },
];

const ScrappedPosts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(initialPosts); // 스크랩한 글 상태

    const handleBackClick = () => {
        navigate('/user');
    };

    const handleUnscrap = (id) => {
        setPosts(posts.filter((post) => post.id !== id)); // 해당 포스트 삭제
    };
    
    return (
        <ScrappedPostsContainer>
            <BackHeaderWrapper>
                <BackHeader title="스크랩 한 글" onBackClick={handleBackClick} />
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
                        isScrapped={true} 
                        onScrapClick={() => handleUnscrap(post.id)} 
                    />
                ))}
            </ContentWrapper>
        </ScrappedPostsContainer>
    );

};

export default ScrappedPosts;

const ScrappedPostsContainer = styled.div`
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
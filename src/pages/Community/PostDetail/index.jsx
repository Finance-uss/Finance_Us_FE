import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BeforeHeader from "../../../components/common/BeforeHeader";
import BottomBar from "../../../components/common/BottomBar";
import Content from "../../../components/Community/Post/Content";
import CommentList from "../../../components/Community/Post/Comment/CommentList";
import * as S from '../../../styles/Community/PostDetail/style';
import { getPost, getLike } from "../../../api/postAPI";
import defaultUserImg from "../../../assets/icons/common/Community/commentProfile.svg";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams(); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(postId);
        if (response.isSuccess) {
          const postData = response.result;
          setPost(postData);
        } else {
          alert("게시글을 불러올 수 없습니다.");
        }
      } catch (error) {
        alert("오류 발생: " + error.message);
      }
    };
    fetchPost();
  }, [postId]);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const count = await getLike(postId);
      if (count !== null) {
        setLikesCount(count);
      }
    };
    fetchLikes();
  }, [postId]);
  if (!post) return <div>로딩 중...</div>;

  return (
    <>
      <S.Container>
        <BeforeHeader />
        <S.Wrapper>
          <Content 
            title={post.title}
            userName={post.name}
            userImg={post.userImageUrl||defaultUserImg} 
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            image={post.imageUrl} 
            content={post.content} 
            isLike={post.isLiked}
            isAuth={post.isAuthenticated}
            isOwner={post.isMine} 
            category={post.category} 
            postType={post.postType}
            postId={post.postId}
            userId={post.userId}
            updatedCount={likesCount}
          />
          <CommentList/> 
        </S.Wrapper>
      </S.Container>
      <BottomBar />
    </>
  );
};

export default PostDetail;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BeforeHeader from "../../../components/common/BeforeHeader";
import BottomBar from "../../../components/common/BottomBar";
import Content from "../../../components/Community/Post/Content";
import CommentList from "../../../components/Community/Post/Comment/CommentList";
import * as S from '../../../styles/Community/PostDetail/style';
import { getPost } from "../../../api/post";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const { postId } = useParams(); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(postId);
        if (response.isSuccess) {
          const postData = response.result;
          setPost(postData);
          setLikeCount(postData.likeCount || 0);
          setCommentCount(postData.commentCount || 0);
        } else {
          alert("게시글을 불러올 수 없습니다.");
        }
      } catch (error) {
        alert("오류 발생: " + error.message);
      }
    };

    fetchPost();
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
            // userImg={post.userImgUrl} 
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            image={post.imageUrl} 
            content={post.content} 
            currentUser={post.isAuth} 
            category={post.category} 
            postType={post.postType}
            postId={post.postId}
            userId={post.userId}
            onLikeCount={setLikeCount} 
          />
          <CommentList onCommentCount={setCommentCount} /> 
        </S.Wrapper>
      </S.Container>
      <BottomBar />
    </>
  );
};

export default PostDetail;

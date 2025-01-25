import React, { useState } from "react";
import BeforeHeader from "../../../components/common/BeforeHeader";
import BottomBar from "../../../components/common/BottomBar";
import Content from "../../../components/Community/Post/Content";
import CommentList from "../../../components/Community/Post/Comment/CommentList";
import CustomDate from "../../../components/Community/Post/CustomDate";
import examImg from "../../../assets/icons/common/Community/exam.png";
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  margin-bottom: 200px;
`;

const PostDetail = () => {
  const [likeCount, setLikeCount] = useState(10);
  const [commentCount, setCommentCount] = useState(5);

  const post = {
    title: "멍청비용 또 늘었다",
    userName: "김동글",
    createdAt: CustomDate(),
    image: examImg,
    content: "나 진짜 미쳐버리겠다!!",
    likeCount: likeCount,
    commentCount: commentCount,
    currentUser: true,
    category: "자유",
    postId: 1,
  };

  const handleLikeCount = (newLikeCount) => {
    setLikeCount(newLikeCount);
  };

  const handleCommentCount = (newCount) => {
    setCommentCount(newCount); 
  };

  return (
    <>
      <Container>
        <BeforeHeader />
        <Content {...post} onLikeCount={handleLikeCount} />
        <CommentList onCommentCount={handleCommentCount} /> 
      </Container>
      <BottomBar />
    </>
  );
};

export default PostDetail;

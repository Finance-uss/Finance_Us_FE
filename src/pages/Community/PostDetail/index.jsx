import React, { useState } from "react";
import BeforeHeader from "../../../components/common/BeforeHeader";
import BottomBar from "../../../components/common/BottomBar";
import Content from "../../../components/Community/Post/Content";
import CommentList from "../../../components/Community/Post/Comment/CommentList";
import CustomDate from "../../../components/Community/Post/CustomDate";
import examImg from "../../../assets/icons/common/Community/exam.png";
import * as S from '../../../styles/Community/PostDetail/style';

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
    currentUser: false,
    category: "자유",
    postId: 1,
    isAuth: true
  };

  const handleLikeCount = (newLikeCount) => {
    setLikeCount(newLikeCount);
  };

  const handleCommentCount = (newCount) => {
    setCommentCount(newCount); 
  };

  return (
    <>
      <S.Container>
        <BeforeHeader />
        <S.Wrapper>
          <Content {...post} onLikeCount={handleLikeCount} />
          <CommentList onCommentCount={handleCommentCount} /> 
        </S.Wrapper>
      </S.Container>
      <BottomBar />
    </>
  );
};

export default PostDetail;

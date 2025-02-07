import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BeforeHeader from "../../../components/common/BeforeHeader";
import BottomBar from "../../../components/common/BottomBar";
import Content from "../../../components/Community/Post/Content";
import CommentList from "../../../components/Community/Post/Comment/CommentList";
import CustomDate from "../../../components/Community/Post/CustomDate";
import examImg from "../../../assets/icons/common/Community/exam.png";
import * as S from '../../../styles/Community/PostDetail/style';
import { getPost } from "../../../api/post";

const PostDetail = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const { postId } = useParams(); 
  // const [post, setPost] = useState(null);

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

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const response = await getPost(postId);
  //       if (response.isSuccess) {
  //         const postData = response.result;
  //         setPost(postData);
  //         setLikeCount(postData.likeCount || 0);
  //         setCommentCount(postData.commentCount || 0);
  //       } else {
  //         alert("게시글을 불러올 수 없습니다.");
  //       }
  //     } catch (error) {
  //       alert("오류 발생: " + error.message);
  //     }
  //   };

  //   fetchPost();
  // }, [postId]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <>
      <S.Container>
        <BeforeHeader />
        <S.Wrapper>
          <Content {...post} onLikeCount={setLikeCount} />
          <CommentList onCommentCount={setCommentCount} /> 
        </S.Wrapper>
      </S.Container>
      <BottomBar />
    </>
  );
};

export default PostDetail;

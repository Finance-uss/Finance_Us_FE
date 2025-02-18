import React from "react";
import * as S from "../../../../styles/Community/SearchPreview/style";
const Preview = ({ posts, onPostClick }) => {
  const categorymap={
    "FREE": "자유",
    "INFO":"정보",
  };
  return (
    <S.Container>
      {posts.length === 0 ? (
        <S.EmptyMessage>검색 결과가 없습니다.</S.EmptyMessage>
      ) : (
        posts.map((item) => (
          <S.Wrapper key={item.postId} onClick={() => onPostClick(item.postId)}>
            <S.Category>{categorymap[item.boardType]}</S.Category>
            <S.Title>{item.title}</S.Title>
            <S.Preview>{item.content}</S.Preview>
            <S.Line />
          </S.Wrapper>
        ))
      )}
    </S.Container>
  );
};

export default Preview;
